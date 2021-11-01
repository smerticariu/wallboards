import React, { useEffect, useRef, useState } from 'react';
import { createArrayFromTo } from '../../common/utils/generateArray';
import { useDispatch, useSelector } from 'react-redux';
import { CELLS_NUMBER_ADD, INITIAL_CELLS_NUMBER } from './grid.defaults';
import GridResizeContainer from './grid.resize-container';
import { handleSyncWallboardSizeAC, syncWallboardSizeAC } from 'src/store/actions/wallboards.action';
const GridPage = ({ ...props }) => {
  const [gridCells, setGridCells] = useState(INITIAL_CELLS_NUMBER);
  const activeWallboard = useSelector((state) => state.wallboards.present.activeWallboard.wallboard);
  const syncDataWithRedux = useSelector((state) => state.wallboards.present.activeWallboard.syncDataWithRedux);

  const sortableListRef = useRef();
  const gridRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    window.onscroll = function () {
      if (document.documentElement.scrollHeight <= document.documentElement.offsetHeight + window.scrollY) {
        setGridCells((gridCellsLocal) => gridCellsLocal + CELLS_NUMBER_ADD);
      }
    };
  }, []);

  useEffect(() => {
    if (syncDataWithRedux) {
      const height = activeWallboard.widgets.reduce(
        (maxHeight, widget) => (maxHeight > widget.size.endY ? maxHeight : widget.size.endY),
        0
      );
      dispatch(syncWallboardSizeAC({ width: sortableListRef.current.offsetWidth, height: parseFloat(height).toFixed(2) }));
      dispatch(handleSyncWallboardSizeAC(false));
    }
  }, [syncDataWithRedux]);
  const handleGridComponents = () => {
    return (
      <div className="c-grid__components" ref={sortableListRef}>
        <GridResizeContainer wallboardSize={activeWallboard.size} widgets={activeWallboard.widgets} />
      </div>
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
    <div className="c-grid">
      {handleGrid()}
      {handleGridComponents()}
    </div>
  );
};
export default GridPage;
