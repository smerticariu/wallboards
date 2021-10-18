import React, { useEffect, useRef, useState } from 'react';
import { createArrayFromTo } from '../../common/utils/generateArray';
import GridAgentList from './grid.agent-list';
import { SortableItem, SortableList } from '../sortable/sortable';
import { useDispatch, useSelector } from 'react-redux';
import { changeWallboardComponentsOrderAC } from 'src/store/actions/wallboards.action';
import { CELLS_NUMBER_ADD, CELLS_NUMBER_REMOVE, CELLS_ON_ROW, CELL_HEIGHT, INITIAL_CELLS_NUMBER } from './grid.defaults';
const GridPage = ({ ...props }) => {
  const [gridCells, setGridCells] = useState(INITIAL_CELLS_NUMBER);
  const activeWallboard = useSelector((state) => state.wallboards.present.activeWallboard.wallboard);
  const dispatch = useDispatch();
  const sortableListRef = useRef();
  const gridRef = useRef();

  useEffect(() => {
    if (sortableListRef.current?.scrollContainer?.offsetHeight && gridRef.current?.offsetHeight) {
      if (gridRef.current?.offsetHeight - 200 < sortableListRef.current?.scrollContainer?.offsetHeight)
        setGridCells((cells) => cells + CELLS_NUMBER_ADD);
      if (
        gridRef.current?.offsetHeight > sortableListRef.current?.scrollContainer?.offsetHeight + CELL_HEIGHT * (480 / CELLS_ON_ROW) &&
        gridCells - CELLS_NUMBER_REMOVE > INITIAL_CELLS_NUMBER
      ) {
        setGridCells((cells) => cells - CELLS_NUMBER_REMOVE);
      }
    }
  }, [sortableListRef.current?.scrollContainer?.offsetHeight, gridRef.current?.offsetHeight, gridCells]);
  const handleGridComponents = () => {
    const onSortEnd = ({ oldIndex, newIndex }) => {
      if (oldIndex !== newIndex) {
        const widgets = [...activeWallboard.widgets];
        widgets.splice(newIndex, 0, widgets.splice(oldIndex, 1)[0]);
        dispatch(changeWallboardComponentsOrderAC(widgets));
      }
    };
    return (
      <SortableList axis="xy" className="c-grid__components" ref={sortableListRef} useDragHandle onSortEnd={onSortEnd}>
        {activeWallboard.widgets.map((widget, index) => (
          <React.Fragment key={widget.id}>
            <SortableItem index={index}>
              <GridAgentList widget={widget} index={index} />
            </SortableItem>
          </React.Fragment>
        ))}
      </SortableList>
    );
  };

  const handleGrid = () => {
    return (
      <div ref={gridRef} className="c-grid__cells">
        {createArrayFromTo(1, gridCells).map((number) => (
          <div className="c-grid__cell" key={number} />
        ))}
      </div>
    );
  };
  return (
    <div>
      <div className="c-grid">
        {handleGrid()}
        {handleGridComponents()}
      </div>
    </div>
  );
};
export default GridPage;
