import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { useDispatch, useSelector } from 'react-redux';
import { ResizableBox } from 'react-resizable';
import { handleWallboardGridLayoutChangeAC, syncWidgetsSizeForNewScreenAC } from 'src/store/actions/wallboards.action';
import useWindowSize from '../../common/hooks/useWindowSize';
import GridAgentList from './grid.agent-list';

const GridResizeContainer = ({ isEditMode = true, widgets = [], ...props }) => {
  const dispatch = useDispatch();
  const containerRef = useRef();
  const { shrinkHeight, shrinkWidth } = useSelector((state) => state.wallboards.present.activeWallboard.wallboard.settings.display);
  const [gridComponents, setGridComponents] = useState([]);
  const screenSize = useWindowSize();
  useEffect(() => {
    const needToAddNewComponent = widgets.some((widget) => !widget.size);
    const containerWidth = containerRef.current.offsetWidth;
    console.log(containerRef.current.getBoundingClientRect());
    if (needToAddNewComponent) {
      const totalHeight = widgets.reduce(
        (height, widget) => (widget.size ? (height < widget.size.endY ? widget.size.endY : height) : height),
        0
      );

      const gridItemsWithHeight = setGridItemsHeight(
        widgets.map((widget) => {
          if (widget.size) {
            return {
              id: widget.id,
              ...widget.size,
            };
          } else {
            return {
              id: widget.id,

              width: containerWidth,

              startX: 0,

              endX: containerWidth,

              height: 400,

              startY: totalHeight === 0 ? 0 : totalHeight + 10,

              endY: totalHeight === 0 ? 400 : totalHeight + 10 + 400,
            };
          }
        })
      );
      dispatch(
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
        syncDataWithRedux(translatedItemsToTop);
      }
    }
  }, [widgets]);

  useEffect(() => {
    if (screenSize.width) {
      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = containerRef.current.offsetHeight;
      //adaptarea la noul ecran
      dispatch(
        syncWidgetsSizeForNewScreenAC(
          setGridItemsHeight(
            widgets
              .map((widget) => {
                return {
                  ...widget,
                  size: {
                    width: shrinkWidth ? (widget.size.widthProcent / 100) * containerWidth : widget.size.width,
                    widthProcent: shrinkWidth ? widget.size.widthProcent : (widget.size.width * 100) / containerWidth,

                    startX: shrinkWidth ? (widget.size.startXProcent / 100) * containerWidth : widget.size.startX,
                    startXProcent: shrinkWidth ? widget.size.startXProcent : (widget.size.startX * 100) / containerWidth,

                    endX: shrinkWidth ? (widget.size.endXProcent / 100) * containerWidth : widget.size.endX,
                    endXProcent: shrinkWidth ? (widget.size.endXProcent / 100) * containerWidth : widget.size.endXProcent,

                    height: shrinkHeight ? (widget.size.heightProcent / 100) * containerHeight : widget.size.height,
                    heightProcent: shrinkHeight ? widget.size.heightProcent : (widget.size.height * 100) / containerHeight,

                    startY: shrinkHeight ? (widget.size.startYProcent / 100) * containerHeight : widget.size.startY,
                    startYProcent: shrinkHeight ? widget.size.startYProcent : (widget.size.startY * 100) / containerHeight,

                    endY: shrinkHeight ? (widget.size.endYProcent / 100) * containerHeight : widget.size.endY,
                    endYProcent: shrinkHeight ? widget.size.endYProcent : (widget.size.endY * 100) / containerHeight,
                  },
                };
              })
              .map((widget) => ({ id: widget.id, ...widget.size }))
          ).map((gridItem, index) => ({ ...widgets[index], size: { ...gridItem } }))
        )
      );
    }
  }, [screenSize]);

  const setGridItemsHeight = (grid) => {
    const totalHeight = grid.reduce((height, gridItem) => (height < gridItem.endY ? gridItem.endY : height), 0);
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
  const onStop = (e, position, id) => {
    const containerWidth = containerRef.current.offsetWidth;
    const totalHeight = gridComponents.reduce((height, gridItem) => (height < gridItem.endY ? gridItem.endY : height), 0);
    const { x, y } = position;
    let activeGridItem = {
      id,
      startX: x,
      startY: y,
    };
    const gridItems = gridComponents.map((g) => {
      if (g.id !== id) return g;
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

    const [gridItemsToTop] = translateItemsToTopOnTheGrid(gridItems);

    setGridComponents(gridItemsToTop);

    syncDataWithRedux(JSON.parse(JSON.stringify(gridItemsToTop)));
  };

  const onControlledDrag = (e, position, id) => {
    const { x, y } = position;

    let activeGridItem = {
      id,
      startX: x,
      startY: y,
    };
    const gridItems = gridComponents.map((g) => {
      if (g.id !== id) return g;

      activeGridItem = {
        ...g,
        ...activeGridItem,

        startX: activeGridItem.startX,

        endX: activeGridItem.startX + g.width,

        startY: activeGridItem.startY,

        endY: activeGridItem.startY + g.height,
      };
      return { ...activeGridItem };
    });

    const elementsThatNeedToChangeYPosition = identifyElementsThatNeedToTranslateToBottom(gridItems, activeGridItem);
    const gridItemsWithChangedYPosition = changeGridElementsYPosition(gridItems, elementsThatNeedToChangeYPosition, activeGridItem);
    const [gridItemsToTop] = translateItemsToTopOnTheGrid(gridItemsWithChangedYPosition, activeGridItem);

    setGridComponents(setGridItemsHeight(gridItemsToTop));
  };

  const translateItemsToTopOnTheGrid = (grid, activeGridItem) => {
    let isChanges = false;
    let isGlobalChanges = false;
    let gridCopy = JSON.parse(JSON.stringify(grid));
    do {
      isChanges = false;
      gridCopy = JSON.parse(JSON.stringify(gridCopy))
        .sort((a, b) => a.startY - b.startY)
        //eslint-disable-next-line
        .map((gridItem) => {
          if (gridItem.id === activeGridItem?.id) return gridItem;
          if (gridItem.startY === 0) return gridItem;
          if (isChanges) return gridItem;
          let minYPosition = 0;
          gridCopy
            .sort((a, b) => a.endY - b.endY)
            .forEach((gridElement, index) => {
              if (gridElement.id === gridItem.id) return;
              if (gridElement.endX < gridItem.startX || gridElement.startX > gridItem.endX) return;

              if (gridItem.startY < gridElement.startY) return;

              if (gridElement.id === activeGridItem?.id) {
                if (index > 0 && gridElement.startY - gridCopy[index - 1].endY > gridItem.height + 10) {
                  minYPosition = gridCopy[index - 1].endY + 10;
                  return;
                }
                if (index === 0 && gridElement.startY > gridItem.height + 10) {
                  minYPosition = 0;
                  return;
                }
              }

              minYPosition = gridElement.endY + 10;
            });

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

  const identifyElementsThatNeedToTranslateToBottom = (grid, activeGridItem) => {
    let elementsId = [];
    let isTouchBetweenElements = false;
    let startX = activeGridItem.startX;
    let endX = activeGridItem.endX;
    JSON.parse(JSON.stringify(grid))
      .sort((a, b) => a.startY - b.startY)
      .forEach((gridItem) => {
        if (gridItem.id === activeGridItem.id) return;
        if (gridItem.endY < activeGridItem.startY) return;
        if (gridItem.endX < startX || gridItem.startX > endX) return;
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

  const changeGridElementsYPosition = (grid, gridItemsToChange, activeGridItem) => {
    const containerWidth = containerRef.current.offsetWidth;

    let pxToBottom = activeGridItem.height;
    return JSON.parse(JSON.stringify(grid))
      .sort((a, b) => a.startY - b.startY)
      .map((gridItem, index, gridArray) => {
        if (gridItemsToChange.includes(gridItem.id)) {
          if (gridArray[0].startY + pxToBottom + 10 < activeGridItem.endY) {
            pxToBottom = activeGridItem.endY + 10 - gridArray[0].startY;
          }
          return {
            ...gridItem,
            startY: gridItem.startY + pxToBottom + 10,
            endY: ((gridItem.endY + pxToBottom + 10) * 100) / containerWidth,
          };
        }
        return gridItem;
      });
  };
  const onGridItemResize = (e, data, gridItemId) => {
    let activeGridItem;

    const gridItemsWithChangedSize = gridComponents.map((gridItem) => {
      if (gridItem.id !== gridItemId) return gridItem;

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
