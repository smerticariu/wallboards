import React, { useEffect, useRef, useState } from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import { useDispatch, useSelector } from 'react-redux';
import { handleWallboardGridLayoutChangeAC } from 'src/store/actions/wallboards.action';
import GridAgentList from './grid.agent-list';
import { RESIZE_GRID_COLUMNS } from './grid.defaults';

const ReactGridLayout = WidthProvider(RGL);

const GridResizeContainer = ({ isEditMode = true, widgets = [], ...props }) => {
  const dispatch = useDispatch();
  const itemsRef = useRef([]);
  const containerRef = useRef();
  const { shrinkHeight, shrinkWidth } = useSelector((state) => state.wallboards.present.activeWallboard.wallboard.settings.display);

  const [layoutState, setLayoutState] = useState([]);
  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, widgets.length);
  }, [widgets]);

  const onLayoutChange = (layout) => {
    const layoutWithPxSize = layout.map((lay) => {
      const ref = itemsRef.current.find((ref) => ref.id === lay.i);
      const { offsetWidth, offsetHeight } = ref;
      return { ...lay, offsetHeight, offsetWidth };
    });
    // check for changes
    let isLayoutChanged = layoutWithPxSize.some((layoutElement) => {
      const widget = widgets.find((widget) => widget.id === layoutElement.i);
      return widget.size.x !== layoutElement.x || widget.size.w !== layoutElement.w || widget.size.h !== layoutElement.h;
    });

    // check if there has been a change on the y axis
    const widgetsWithChangedY = layoutWithPxSize.filter((layoutElement) => {
      const widget = widgets.find((widget) => widget.id === layoutElement.i);
      return widget.size.y !== layoutElement.y;
    });

    if (widgetsWithChangedY.length > 1) {
      isLayoutChanged = true;
    }
    if (!layoutState.length || layoutState.length !== widgets.length) return;
    if (isLayoutChanged) {
      dispatch(handleWallboardGridLayoutChangeAC(layoutWithPxSize));
    }
  };
  useEffect(() => {
    setLayoutState(
      widgets.map((widget) => {
        const widgetWidth =
          widget.size.offsetWidth === '100%' ? containerRef.current.elementRef.current.offsetWidth : widget.size.offsetWidth;
        const wi = (RESIZE_GRID_COLUMNS * widgetWidth) / containerRef.current.elementRef.current.offsetWidth;
        return {
          x: widget.size.x, // position on the x-axis
          y: widget.size.y, // position on the y-axis
          w: !shrinkWidth ? (wi > RESIZE_GRID_COLUMNS ? RESIZE_GRID_COLUMNS : Math.round(wi)) : widget.size.w, // width (grid units)
          h: widget.size.h, // height (grid units)
          minW: 5, // min width (grid units)
          minH: 20, // min height (grid units)
          i: widget.id, // custom key
          maxW: RESIZE_GRID_COLUMNS,
          resizeHandles: ['s', 'e', 'se'], // south , east, south-east
        };
      })
    );
  }, [widgets, shrinkWidth]);
  return (
    <ReactGridLayout
      cols={RESIZE_GRID_COLUMNS}
      rowHeight={2}
      className={'layout'}
      draggableHandle=".agent-list__title"
      layout={layoutState}
      onLayoutChange={onLayoutChange}
      isDraggable={isEditMode}
      isResizable={isEditMode}
      ref={containerRef}
      margin={[0, 10]}
    >
      {widgets.map((widget, index) => {
        return (
          <div key={widget.id}>
            <GridAgentList ref={(el) => (itemsRef.current[index] = el)} isEditMode={isEditMode} widget={widget} />
          </div>
        );
      })}
    </ReactGridLayout>
  );
};

export default GridResizeContainer;
