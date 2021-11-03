import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { useDispatch, useSelector } from 'react-redux';
import { ResizableBox } from 'react-resizable';
import { handleWallboardGridLayoutChangeAC, syncWidgetsSizeForNewScreenAC } from 'src/store/actions/wallboards.action';
import useWindowSize from '../../common/hooks/useWindowSize';
import GridAgentList from './grid.agent-list';

const GridResizeContainer = ({ isEditMode = true, wallboardSize, widgets = [], ...props }) => {
  const dispatch = useDispatch();
  const containerRef = useRef();
  const { shrinkHeight, shrinkWidth } = useSelector((state) => state.wallboards.present.activeWallboard.wallboard.settings.display);

  const [gridComponents, setGridComponents] = useState([]);
  const screenSize = useWindowSize();
  useEffect(() => {
    if (widgets.length === 0 && gridComponents.length === 0) return;

    if (widgets.length > gridComponents.length) {
      const newWidget = widgets.find((widget) => widget.size === null);
      if (!newWidget) return;
      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = containerRef.current.offsetHeight;
      const totalHeight = gridComponents.reduce((height, gridItem) => (height < gridItem.endY ? gridItem.endY : height), 0);
      //trebuie aici ca cand adaug un element sa le sincronizez si pe celelalte cu nou marime de 100%
      setGridComponents([
        ...gridComponents,
        {
          id: newWidget.id,

          width: containerWidth,
          widthProcent: 100,

          startX: 0,
          startXProcent: 0,

          endX: containerWidth,
          endXProcent: 100,

          height: 400,
          heightProcent: (400 * 100) / (totalHeight + 400), //nu sunt sigur la container height

          startY: totalHeight + 10,
          startYProcent: ((totalHeight + 10) * 100) / totalHeight,

          endY: totalHeight + 10 + 400,
          endYProcent: ((totalHeight + 410) * 100) / totalHeight,
        },
      ]);
    }
  }, [widgets.length]);
  useEffect(() => {
    if (screenSize.width) {
      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = containerRef.current.offsetHeight;

      setGridComponents(
        widgets.map(({ size, id }) => {
          return {
            id,

            width: shrinkWidth ? (size.widthProcent / 100) * containerWidth : size.width,
            widthProcent: shrinkWidth ? size.widthProcent : (size.width * 100) / containerWidth,

            startX: shrinkWidth ? (size.startXProcent / 100) * containerWidth : size.startX,
            startXProcent: shrinkWidth ? size.startXProcent : (size.startX * 100) / containerWidth,

            endX: shrinkWidth ? (size.endXProcent / 100) * containerWidth : size.endX,
            endXProcent: shrinkWidth ? (size.endXProcent / 100) * containerWidth : size.endXProcent,

            height: shrinkHeight ? (size.heightProcent / 100) * containerHeight : size.height,
            heightProcent: shrinkHeight ? size.heightProcent : (size.height * 100) / containerHeight,

            startY: shrinkHeight ? (size.startYProcent / 100) * containerHeight : size.startY,
            startYProcent: shrinkHeight ? size.startYProcent : (size.startY * 100) / containerHeight,

            endY: shrinkHeight ? (size.endYProcent / 100) * containerHeight : size.endY,
            endYProcent: shrinkHeight ? size.endYProcent : (size.endY * 100) / containerHeight,
          };
        })
      );
    }
  }, [screenSize]);

  const syncDataWithRedux = (gridData = gridComponents) => {
    dispatch(
      handleWallboardGridLayoutChangeAC(
        widgets.map((widget) => {
          const { id, ...widgetGrid } = gridData.find((gridItem) => gridItem.id === widget.id);
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

    const gridItemsToTop = identifyElementsThatNeedToTranslateToTop(gridItems);

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
      const containerWidth = containerRef.current.offsetWidth;
      const totalHeight = gridComponents.reduce((height, gridItem) => (height < gridItem.endY ? gridItem.endY : height), 0);

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

    const elementsThatNeedToChangeYPosition = identifyElementsThatNeedToTranslateToBottom(gridItems, activeGridItem);
    const gridItemsWithChangedYPosition = changeGridElementsYPosition(gridItems, elementsThatNeedToChangeYPosition, activeGridItem);
    const gridItemsToTop = identifyElementsThatNeedToTranslateToTop(gridItemsWithChangedYPosition, activeGridItem);

    setGridComponents(gridItemsToTop);
  };

  const identifyElementsThatNeedToTranslateToTop = (grid, activeGridItem) => {
    let isChanges = false;
    const totalHeight = gridComponents.reduce((height, gridItem) => (height < gridItem.endY ? gridItem.endY : height), 0);

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
            return {
              ...gridItem,
              startY: minYPosition,
              startYProcent: (minYPosition * 100) / totalHeight,
              endY: minYPosition + gridItem.height,
              endYProcent: ((minYPosition + gridItem.height) * 100) / totalHeight,
            };
          }
          return gridItem;
        });
    } while (isChanges);
    return gridCopy;
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
    const totalHeight = gridComponents.reduce((height, gridItem) => (height < gridItem.endY ? gridItem.endY : height), 0);
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
            startYProcent: ((gridItem.startY + pxToBottom + 10) * 100) / containerWidth,
            endY: ((gridItem.endY + pxToBottom + 10) * 100) / containerWidth,
          };
        }
        return gridItem;
      });
  };
  const onGridItemResize = (e, data, gridItemId) => {
    let activeGridItem;
    const totalHeight = gridComponents.reduce((height, gridItem) => (height < gridItem.endY ? gridItem.endY : height), 0);

    const gridItemsWithChangedSize = gridComponents.map((gridItem) => {
      if (gridItem.id !== gridItemId) {
        return {
          ...gridItem,
          heightProcent: (gridItem.height * 100) / totalHeight,
          endYProcent: (gridItem.endY * 100) / totalHeight,
          startYProcent: (gridItem.startY * 100) / totalHeight,
        };
      }

      const containerWidth = containerRef.current.offsetWidth;
      activeGridItem = {
        ...gridItem,
        width: data.size.width,
        widthProcent: (data.size.width * 100) / containerWidth,

        endX: gridItem.startX + data.size.width,
        endXProcent: ((gridItem.startX + data.size.width) * 100) / containerWidth,

        height: data.size.height,
        heightProcent: (data.size.height * 100) / totalHeight,

        endY: gridItem.startY + data.size.height,
        endYProcent: ((gridItem.startY + data.size.height) * 100) / totalHeight,
      };
      return activeGridItem;
    });
    const elementsThatNeedToChangeYPosition = identifyElementsThatNeedToTranslateToBottom(gridItemsWithChangedSize, activeGridItem);
    const gridItemsWithChangedYPosition = changeGridElementsYPosition(
      gridItemsWithChangedSize,
      elementsThatNeedToChangeYPosition,
      activeGridItem
    );
    const gridItemsToTop = identifyElementsThatNeedToTranslateToTop(gridItemsWithChangedYPosition, activeGridItem);

    setGridComponents(gridItemsToTop);
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
