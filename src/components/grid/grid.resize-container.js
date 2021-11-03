import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { useDispatch, useSelector } from 'react-redux';
import { ResizableBox } from 'react-resizable';
import { handleWallboardGridLayoutChangeAC } from 'src/store/actions/wallboards.action';
import useWindowSize from '../../common/hooks/useWindowSize';
import GridAgentList from './grid.agent-list';

const GridResizeContainer = ({ isEditMode = true, wallboardSize, widgets = [], ...props }) => {
  const dispatch = useDispatch();
  const containerRef = useRef();
  const { shrinkHeight, shrinkWidth } = useSelector((state) => state.wallboards.present.activeWallboard.wallboard.settings.display);

  const [gridComponents, setGridComponents] = useState([]);
  const screenWidth = useWindowSize();

  useEffect(() => {
    if (containerRef.current?.offsetWidth) {
      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = containerRef.current.offsetHeight;
      const totalHeight = widgets.reduce(
        (height, widget) => (widget.size ? (height < widget.size.endY ? widget.size.endY : height) : height),
        0
      );
      setGridComponents(
        widgets.map((widget) => {
          if (!widget.size) {
            return {
              id: widget.id,

              startX: 0,
              endX: containerWidth,

              startY: totalHeight ? totalHeight + 10 : 0,
              endY: totalHeight + 410,

              width: containerWidth,
              height: 400,

              widthProcent: 100,
              heightProcent: (400 * 100) / containerHeight,

              startXProcent: 0,
              startYProcent: totalHeight ? ((totalHeight + 10) * 100) / containerHeight : 0,
            };
          }

          const widthProcent = (widget.size.width * 100) / containerWidth;
          const heightProcent = (widget.size.height * 100) / totalHeight;

          const startXProcent = (widget.size.startX * 100) / containerWidth;
          const startYProcent = (widget.size.startY * 100) / totalHeight;
          const endXProcent = (widget.size.endX * 100) / containerWidth;
          const endYProcent = (widget.size.endY * 100) / totalHeight;
          return {
            id: widget.id,
            ...widget.size,
            widthProcent: shrinkWidth ? widget.size.widthProcent : widthProcent > 100 ? 100 : widthProcent,
            heightProcent: heightProcent,
            startXProcent: shrinkWidth ? widget.size.startXProcent : startXProcent,
            startYProcent,
            endXProcent,
            endYProcent,
          };
        })
      );
    }
  }, [screenWidth]);

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
        endX: activeGridItem.startX + g.width,
        endY: activeGridItem.startY + g.height,
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

      activeGridItem = {
        ...g,
        ...activeGridItem,
        endX: activeGridItem.startX + g.width,
        endY: activeGridItem.startY + g.height,
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
            return { ...gridItem, startY: minYPosition, endY: minYPosition + gridItem.height };
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
            endY: gridItem.endY + pxToBottom + 10,
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
