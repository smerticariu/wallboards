import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { useDispatch, useSelector } from 'react-redux';
import { ResizableBox } from 'react-resizable';
import { handleWallboardGridLayoutChangeAC, syncWidgetsSizeForNewScreenAC } from 'src/store/actions/wallboards.action';
import useWindowSize from '../../common/hooks/useWindowSize';
import GridAgentList from './grid.agent-list';
import { WIDGET_INITIAL_HEIGHT, WIDGET_MARGIN_TOP } from './grid.defaults';

const GridResizeContainer = ({ isEditMode = true, widgets = [], ...props }) => {
  const dispatch = useDispatch();
  const containerRef = useRef();
  const { shrinkHeight, shrinkWidth } = useSelector((state) => state.wallboards.present.activeWallboard.wallboard.settings.display);
  const [gridComponents, setGridComponents] = useState([]);
  const screenSize = useWindowSize();
  useEffect(() => {
    //check if there are widget without size
    const needToAddNewComponent = widgets.some((widget) => !widget.size);
    const containerWidth = containerRef.current.offsetWidth;

    if (needToAddNewComponent) {
      //calculate the height of all widgets
      const totalHeight = widgets.reduce(
        (height, widget) => (widget.size ? (height < widget.size.endY ? widget.size.endY : height) : height),
        0
      );

      //set the new widgets and calculate their height in percent
      const gridItemsWithHeight = setGridItemsHeight(
        widgets.map((widget) => {
          if (widget.size) {
            return {
              id: widget.id,
              ...widget.size,
            };
          } else {
            //if the size is null we set the size
            return {
              id: widget.id,

              width: containerWidth,

              startX: 0,

              endX: containerWidth,

              height: WIDGET_INITIAL_HEIGHT,

              startY: totalHeight === 0 ? 0 : totalHeight + WIDGET_MARGIN_TOP,

              endY: totalHeight === 0 ? WIDGET_INITIAL_HEIGHT : totalHeight + WIDGET_MARGIN_TOP + WIDGET_INITIAL_HEIGHT,
            };
          }
        })
      );
      dispatch(
        //sync widgets size with redux
        syncWidgetsSizeForNewScreenAC(
          widgets.map((widget) => {
            const { id, ...widgetGrid } = gridItemsWithHeight.find((gridItem) => gridItem.id === widget.id);
            return {
              ...widget,
              size: {
                ...widgetGrid,
              },
            };
          })
        )
      );
    } else {
      //check if we can translate the elements upwards
      const [translatedItemsToTop, isChanges] = translateItemsToTopOnTheGrid(
        widgets.map((widget) => {
          return {
            id: widget.id,
            ...widget.size,
          };
        })
      );
      setGridComponents(translatedItemsToTop);
      if (isChanges) {
        //if there are elements that have been translated, we sync with redux
        syncDataWithRedux(translatedItemsToTop);
      }
    }
    // eslint-disable-next-line
  }, [widgets]);

  useEffect(() => {
    //check if width !==undefined
    if (screenSize.width) {
      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = containerRef.current.offsetHeight;
      //calculate the height of all widgets
      const totalHeight = gridComponents.reduce((height, gridItem) => (height < gridItem.endY ? gridItem.endY : height), 0);

      //adapt the size of the widgets for the new screen size
      dispatch(
        syncWidgetsSizeForNewScreenAC(
          setGridItemsHeight(
            widgets
              .map((widget) => {
                return {
                  ...widget,
                  size: {
                    //id shrinkWidth/shrinkHeight, set the size according to the percentages of the widget
                    width: shrinkWidth ? (widget.size.widthProcent / 100) * containerWidth : widget.size.width,
                    widthProcent: shrinkWidth ? widget.size.widthProcent : (widget.size.width * 100) / containerWidth,

                    startX: shrinkWidth ? (widget.size.startXProcent / 100) * containerWidth : widget.size.startX,
                    startXProcent: shrinkWidth ? widget.size.startXProcent : (widget.size.startX * 100) / containerWidth,

                    endX: shrinkWidth ? (widget.size.endXProcent / 100) * containerWidth : widget.size.endX,
                    endXProcent: shrinkWidth ? (widget.size.endXProcent / 100) * containerWidth : widget.size.endXProcent,

                    //if containerHeight > totalHeight, widget size will not be changed and will be in px
                    height: shrinkHeight
                      ? containerHeight < totalHeight
                        ? (widget.size.heightProcent / 100) * containerHeight
                        : widget.size.height
                      : widget.size.height,
                    heightProcent: shrinkHeight
                      ? containerHeight < totalHeight
                        ? widget.size.heightProcent
                        : (widget.size.height * 100) / containerHeight
                      : (widget.size.height * 100) / totalHeight,

                    startY: shrinkHeight
                      ? containerHeight < totalHeight
                        ? (widget.size.startYProcent / 100) * containerHeight
                        : widget.size.startY
                      : widget.size.startY,
                    startYProcent: shrinkHeight
                      ? containerHeight < totalHeight
                        ? widget.size.startYProcent
                        : (widget.size.startY * 100) / containerHeight
                      : (widget.size.startY * 100) / totalHeight,

                    endY: shrinkHeight
                      ? containerHeight < totalHeight
                        ? (widget.size.endYProcent / 100) * containerHeight
                        : widget.size.endY
                      : widget.size.endY,
                    endYProcent: shrinkHeight
                      ? containerHeight < totalHeight
                        ? widget.size.endYProcent
                        : (widget.size.endY * 100) / containerHeight
                      : (widget.size.endY * 100) / totalHeight,
                  },
                };
              })
              .map((widget) => ({ id: widget.id, ...widget.size }))
          ).map((gridItem, index) => ({ ...widgets[index], size: { ...gridItem } }))
        )
      );
    }
    // eslint-disable-next-line
  }, [screenSize]);

  const setGridItemsHeight = (grid) => {
    const totalHeight = grid.reduce((height, gridItem) => (height < gridItem.endY ? gridItem.endY : height), 0);

    //when the size of a widget has been changed, we also synchronize the size in percent
    return grid.map((gridItem) => ({
      ...gridItem,
      widthProcent: (gridItem.width * 100) / containerRef.current.offsetWidth,
      startXProcent: (gridItem.startX * 100) / containerRef.current.offsetWidth,
      endXProcent: (gridItem.endX * 100) / containerRef.current.offsetWidth,
      heightProcent: (gridItem.height * 100) / totalHeight,
      startYProcent: (gridItem.startY * 100) / totalHeight,
      endYProcent: (gridItem.endY * 100) / totalHeight,
    }));
  };

  const syncDataWithRedux = (gridData = gridComponents) => {
    const gridDataWithSizeInProcent = setGridItemsHeight(gridData);
    //synchronize the data with redux to be able to do undo and redo
    dispatch(
      handleWallboardGridLayoutChangeAC(
        widgets.map((widget) => {
          const { id, ...widgetGrid } = gridDataWithSizeInProcent.find((gridItem) => gridItem.id === widget.id);
          return {
            ...widget,
            size: {
              ...widgetGrid,
            },
          };
        })
      )
    );
  };

  //on drag stop
  const onStop = (e, position, id) => {
    const containerWidth = containerRef.current.offsetWidth;
    //calculate the height of all widgets
    const totalHeight = gridComponents.reduce((height, gridItem) => (height < gridItem.endY ? gridItem.endY : height), 0);
    const { x, y } = position;
    let activeGridItem = {
      id,
      startX: x,
      startY: y,
    };
    const gridItems = gridComponents.map((g) => {
      if (g.id !== id) return g;
      // set the new position of the modified widget
      activeGridItem = {
        ...g,
        ...activeGridItem,

        startX: activeGridItem.startX,
        startXProcent: (activeGridItem.startX * 100) / containerWidth,

        endX: activeGridItem.startX + g.width,
        endXProcent: ((activeGridItem.startX + g.width) * 100) / containerWidth,

        startY: activeGridItem.startY,
        startYProcent: (activeGridItem.startY * 100) / totalHeight,

        endY: activeGridItem.startY + g.height,
        endYProcent: ((activeGridItem.startY + g.height) * 100) / totalHeight,
      };
      return { ...activeGridItem };
    });

    //we translate the elements as high as possible
    const [gridItemsToTop] = translateItemsToTopOnTheGrid(gridItems);

    setGridComponents(gridItemsToTop);

    syncDataWithRedux(JSON.parse(JSON.stringify(gridItemsToTop)));
  };

  //setting new positions
  const onControlledDrag = (e, position, activeItemId) => {
    const { x, y } = position;

    let activeGridItem = {
      id: activeItemId,
      startX: x,
      startY: y,
    };
    const gridItems = gridComponents.map((gridItem) => {
      if (gridItem.id !== activeItemId) return gridItem;

      //set the position of the element we are translating
      activeGridItem = {
        ...gridItem,
        ...activeGridItem,

        startX: activeGridItem.startX,

        endX: activeGridItem.startX + gridItem.width,

        startY: activeGridItem.startY,

        endY: activeGridItem.startY + gridItem.height,
      };
      return { ...activeGridItem };
    });

    const elementsThatNeedToChangeYPosition = identifyElementsThatNeedToTranslateToBottom(gridItems, activeGridItem);
    const gridItemsWithChangedYPosition = changeGridElementsYPosition(gridItems, elementsThatNeedToChangeYPosition, activeGridItem);
    const [gridItemsToTop] = translateItemsToTopOnTheGrid(gridItemsWithChangedYPosition, activeGridItem);

    setGridComponents(setGridItemsHeight(gridItemsToTop));
  };

  // translate the elements as high as possible
  const translateItemsToTopOnTheGrid = (grid, activeGridItem) => {
    let isChanges = false;
    let isGlobalChanges = false;
    let gridCopy = JSON.parse(JSON.stringify(grid));
    do {
      isChanges = false;
      gridCopy = JSON.parse(JSON.stringify(gridCopy))
        .sort((a, b) => a.startY - b.startY)
        // eslint-disable-next-line
        .map((gridItem) => {
          if (gridItem.id === activeGridItem?.id) return gridItem;
          if (gridItem.startY === 0) return gridItem;
          if (isChanges) return gridItem;
          let minYPosition = 0;
          gridCopy
            .sort((a, b) => a.endY - b.endY)
            .forEach((gridElement, index) => {
              //ignore the widgets that do not correspond to the following conditions
              if (
                gridElement.id === gridItem.id ||
                gridElement.endX < gridItem.startX ||
                gridElement.startX > gridItem.endX ||
                gridItem.startY < gridElement.startY
              )
                return;

              if (gridElement.id === activeGridItem?.id) {
                if (index > 0 && gridElement.startY - gridCopy[index - 1].endY > gridItem.height + WIDGET_MARGIN_TOP) {
                  minYPosition = gridCopy[index - 1].endY + WIDGET_MARGIN_TOP;
                  return;
                }
                if (index === 0 && gridElement.startY > gridItem.height + WIDGET_MARGIN_TOP) {
                  minYPosition = 0;
                  return;
                }
              }

              minYPosition = gridElement.endY + WIDGET_MARGIN_TOP;
            });
          //check if a new position has been found on the y axis
          if (minYPosition < gridItem.startY) {
            isChanges = true;
            isGlobalChanges = true;
            return {
              ...gridItem,
              startY: minYPosition,
              endY: minYPosition + gridItem.height,
            };
          }
          return gridItem;
        });
    } while (isChanges);
    return [gridCopy, isGlobalChanges];
  };

  // we are looking for the id of the elements to be translated down
  const identifyElementsThatNeedToTranslateToBottom = (grid, activeGridItem) => {
    //elements to be translated down
    let elementsId = [];
    //check if the active card touches another card
    let isTouchBetweenElements = false;
    //active card coordinates
    let startX = activeGridItem.startX;
    let endX = activeGridItem.endX;
    JSON.parse(JSON.stringify(grid))
      .sort((a, b) => a.startY - b.startY)
      .forEach((gridItem) => {
        if (gridItem.id === activeGridItem.id || gridItem.endY < activeGridItem.startY || gridItem.endX < startX || gridItem.startX > endX)
          return;
        if (
          (activeGridItem.startY >= gridItem.startY && activeGridItem.startY <= gridItem.endY) ||
          (activeGridItem.endY >= gridItem.startY && activeGridItem.endY <= gridItem.endY)
        ) {
          isTouchBetweenElements = true;
        }
        elementsId.push(gridItem.id);
        startX = startX > gridItem.startX ? gridItem.startX : startX;
        endX = endX < gridItem.endX ? gridItem.endX : endX;
      });
    return isTouchBetweenElements ? elementsId : [];
  };

  //we modify the coordinates of the elements that have been identified for translation
  const changeGridElementsYPosition = (grid, gridItemsToChange, activeGridItem) => {
    let pxToBottom = activeGridItem.height;
    return JSON.parse(JSON.stringify(grid))
      .sort((a, b) => a.startY - b.startY)
      .map((gridItem, _, gridArray) => {
        if (gridItemsToChange.includes(gridItem.id)) {
          if (gridArray[0].startY + pxToBottom + WIDGET_MARGIN_TOP < activeGridItem.endY) {
            pxToBottom = activeGridItem.endY + WIDGET_MARGIN_TOP - gridArray[0].startY;
          }
          return {
            ...gridItem,
            startY: gridItem.startY + pxToBottom + WIDGET_MARGIN_TOP,
            endY: gridItem.endY + pxToBottom + WIDGET_MARGIN_TOP,
          };
        }
        return gridItem;
      });
  };

  //on widget resize
  const onGridItemResize = (e, data, gridItemId) => {
    let activeGridItem;

    const gridItemsWithChangedSize = gridComponents.map((gridItem) => {
      if (gridItem.id !== gridItemId) return gridItem;
      //set new size for active widget
      activeGridItem = {
        ...gridItem,
        width: data.size.width,

        endX: gridItem.startX + data.size.width,

        height: data.size.height,

        endY: gridItem.startY + data.size.height,
      };
      return activeGridItem;
    });

    const elementsThatNeedToChangeYPosition = identifyElementsThatNeedToTranslateToBottom(gridItemsWithChangedSize, activeGridItem);
    const gridItemsWithChangedYPosition = changeGridElementsYPosition(
      gridItemsWithChangedSize,
      elementsThatNeedToChangeYPosition,
      activeGridItem
    );
    const [gridItemsToTop] = translateItemsToTopOnTheGrid(gridItemsWithChangedYPosition, activeGridItem);

    setGridComponents(setGridItemsHeight(gridItemsToTop));
  };
  return (
    <div ref={containerRef} className="c-grid__components-container">
      {containerRef.current &&
        gridComponents
          .filter((gridComponent) => widgets.some((widget) => widget.id === gridComponent.id))
          .map((gridComponent) => {
            return (
              <Draggable
                key={gridComponent.id}
                bounds="parent"
                position={{
                  x: gridComponent.startX,
                  y: gridComponent.startY,
                }}
                onStop={(e, position) => onStop(e, position, gridComponent.id)}
                onDrag={(e, position) => onControlledDrag(e, position, gridComponent.id)}
                handle=".agent-list__title"
                disabled={!isEditMode}
              >
                <ResizableBox
                  width={gridComponent.width}
                  height={gridComponent.height}
                  onResize={(e, data) => onGridItemResize(e, data, gridComponent.id)}
                  onResizeStop={() => syncDataWithRedux()}
                  maxConstraints={[containerRef.current.offsetWidth - gridComponent.startX - 5, Infinity]}
                  resizeHandles={isEditMode ? ['se', 'e', 's'] : []}
                >
                  <GridAgentList isEditMode={isEditMode} widget={widgets.find((widget) => widget.id === gridComponent.id)} />
                </ResizableBox>
              </Draggable>
            );
          })}
    </div>
  );
};

export default GridResizeContainer;
