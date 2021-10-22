import React from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import { useDispatch } from 'react-redux';
import { handleWallboardGridLayoutChangeAC } from 'src/store/actions/wallboards.action';
import GridAgentList from './grid.agent-list';
import { RESIZE_GRID_COLUMNS } from './grid.defaults';

const ReactGridLayout = WidthProvider(RGL);

const GridResizeContainer = ({ isEditMode = true, widgets = [], ...props }) => {
  const dispatch = useDispatch();

  const onLayoutChange = (layout) => {
    // check for changes
    let isLayoutChanged = layout.some((layoutElement) => {
      const widget = widgets.find((widget) => widget.id === layoutElement.i);
      return widget.size.x !== layoutElement.x || widget.size.w !== layoutElement.w || widget.size.h !== layoutElement.h;
    });

    // check if there has been a change on the y axis
    const widgetsWithChangedY = layout.filter((layoutElement) => {
      const widget = widgets.find((widget) => widget.id === layoutElement.i);
      return widget.size.y !== layoutElement.y;
    });

    if (widgetsWithChangedY.length > 1) {
      isLayoutChanged = true;
    }

    if (isLayoutChanged) {
      dispatch(handleWallboardGridLayoutChangeAC(layout));
    }
  };

  const handleLayout = () =>
    widgets.map((widget) => {
      return {
        x: widget.size.x, // position on the x-axis
        y: widget.size.y, // position on the y-axis
        w: widget.size.w, // width (grid units)
        h: widget.size.h, // height (grid units)
        minW: 5, // min width (grid units)
        minH: 20, // min height (grid units)
        i: widget.id, // custom key
        resizeHandles: ['s', 'e', 'se'], // south , east, south-east
      };
    });

  return (
    <ReactGridLayout
      cols={RESIZE_GRID_COLUMNS}
      rowHeight={1}
      className={'layout'}
      draggableHandle=".agent-list__title"
      layout={handleLayout()}
      onLayoutChange={onLayoutChange}
      isDraggable={isEditMode}
      isResizable={isEditMode}
    >
      {widgets.map((widget) => {
        return (
          <div key={widget.id}>
            <GridAgentList isEditMode={isEditMode} widget={widget} />
          </div>
        );
      })}
    </ReactGridLayout>
  );
};

export default GridResizeContainer;
