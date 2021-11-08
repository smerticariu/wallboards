import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createArrayFromTo } from '../../common/utils/generateArray';
import { useSelector } from 'react-redux';
import GridResizeContainer from './grid.resize-container';
import { CELLS_NUMBER_ADD, GRID_MODIFIER, INITIAL_CELLS_NUMBER } from './grid.defaults';
const GridPage = ({ ...props }) => {
  const [gridCells, setGridCells] = useState(INITIAL_CELLS_NUMBER);
  const activeWallboard = useSelector((state) => state.wallboards.present.activeWallboard.wallboard);

  const sortableListRef = useRef();
  const gridRef = useRef();
  const gridCellsRef = useRef();

  useEffect(() => {
    if (Math.abs(document.body.scrollHeight - window.innerHeight) < 30) {
      setGridCells((gridCellsLocal) => gridCellsLocal + CELLS_NUMBER_ADD);
    }
    if (gridCellsRef.current.offsetHeight < window.innerHeight) {
      setGridCells((gridCellsLocal) => gridCellsLocal + CELLS_NUMBER_ADD);
    }
    document.addEventListener('scroll', function (e) {
      let documentHeight = document.body.scrollHeight;
      let currentScroll = window.scrollY + window.innerHeight;
      if (currentScroll + GRID_MODIFIER > documentHeight) {
        setGridCells((gridCells) => gridCells + CELLS_NUMBER_ADD);
      }
    });
  }, [gridCells, activeWallboard.settings.display.shrinkHeight]);

  const handleGridComponents = () => {
    return (
      <div className="c-grid__components" ref={sortableListRef}>
        <GridResizeContainer widgets={activeWallboard.widgets} />
      </div>
    );
  };

  const handleGrid = useCallback(() => {
    return (
      <div className="c-grid__cells" ref={gridCellsRef}>
        {createArrayFromTo(1, gridCells).map((number) => (
          <div className={`c-grid__cell`} key={number} style={{ height: activeWallboard.settings.display.shrinkHeight ? '3vh' : '25px' }} />
        ))}
      </div>
    );
  }, [gridCells, activeWallboard.settings.display.shrinkHeight]);
  return (
    <div ref={gridRef} className="c-grid">
      {handleGrid()}
      {handleGridComponents()}
    </div>
  );
};
export default GridPage;
