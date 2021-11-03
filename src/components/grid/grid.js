import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createArrayFromTo } from '../../common/utils/generateArray';
import { useSelector } from 'react-redux';
import { CELLS_NUMBER_ADD, INITIAL_CELLS_NUMBER } from './grid.defaults';
import GridResizeContainer from './grid.resize-container';
const GridPage = ({ ...props }) => {
  const [gridCells, setGridCells] = useState(INITIAL_CELLS_NUMBER);
  const activeWallboard = useSelector((state) => state.wallboards.present.activeWallboard.wallboard);

  const sortableListRef = useRef();
  const gridRef = useRef();

  useEffect(() => {
    if (gridRef.current.scrollHeight === gridRef.current.offsetHeight) {
      setGridCells((gridCellsLocal) => gridCellsLocal + CELLS_NUMBER_ADD);
    }
    gridRef.current.addEventListener('scroll', () => {
      if (gridRef.current.scrollHeight <= gridRef.current.offsetHeight + gridRef.current.scrollTop) {
        setGridCells((gridCellsLocal) => gridCellsLocal + CELLS_NUMBER_ADD);
      }
    });
  }, []);

  const handleGridComponents = () => {
    return (
      <div className="c-grid__components" ref={sortableListRef}>
        <GridResizeContainer widgets={activeWallboard.widgets} />
      </div>
    );
  };

  const handleGrid = useCallback(() => {
    return (
      <div className="c-grid__cells">
        {createArrayFromTo(1, gridCells).map((number) => (
          <div className="c-grid__cell" key={number} />
        ))}
      </div>
    );
  }, [gridCells]);
  return (
    <div ref={gridRef} className="c-grid">
      {handleGrid()}
      {handleGridComponents()}
    </div>
  );
};
export default GridPage;
