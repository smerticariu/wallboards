import React, { useCallback } from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import { useDispatch } from 'react-redux';
import { handleWallboardGridLayoutChangeAC } from 'src/store/actions/wallboards.action';
import GridAgentList from './grid.agent-list';
const ReactGridLayout = WidthProvider(RGL);

const GridResizeComponents = ({ widgets = [], ...props }) => {
  const defaultProps = {
    className: 'layout',
    rowHeight: 1,
    cols: 192,
  };
  const dispatch = useDispatch();

  const onLayoutChange = (layout) => {
    const isChanges = layout.some((layoutElement) => {
      const widget = widgets.find((widget) => widget.id === layoutElement.i);
      if (
        (widget.size.x !== layoutElement.x && widget.size.x !== Infinity) ||
        (widget.size.y !== layoutElement.y && widget.size.y !== Infinity) ||
        widget.size.w !== layoutElement.w ||
        widget.size.h !== layoutElement.h
      ) {
        return true;
      }
      return false;
    });
    if (isChanges) dispatch(handleWallboardGridLayoutChangeAC(layout));
  };
  const layout = () =>
    widgets.map((widget, index) => {
      return {
        x: widget.size.x, // numarul pozitiei pe axa x
        y: widget.size.y, //numarul pozitiei pe y
        w: widget.size.w,
        h: widget.size.h, // inaltimea
        minW: 50,
        minH: 20,
        i: widget.id,
        resizeHandles: ['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne'],
      };
    });
  const layoutElements = () =>
    widgets.map((widget, index) => {
      return (
        <div key={widget.id}>
          <GridAgentList widget={widget} />
        </div>
      );
    });
  return (
    <ReactGridLayout draggableHandle=".agent-list__header" layout={layout()} onLayoutChange={onLayoutChange} {...defaultProps}>
      {layoutElements()}
    </ReactGridLayout>
  );
};

export default GridResizeComponents;
