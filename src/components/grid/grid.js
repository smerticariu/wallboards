import React, { useEffect, useRef, useState } from 'react';
import { createArrayFromTo } from '../../common/utils/generateArray';
import { useSelector } from 'react-redux';
import { CELLS_NUMBER_ADD, CELLS_NUMBER_REMOVE, CELLS_ON_ROW, CELL_HEIGHT, INITIAL_CELLS_NUMBER } from './grid.defaults';
import GridResizeContainer from './grid.resize-container';
const GridPage = ({ ...props }) => {
  const [gridCells, setGridCells] = useState(INITIAL_CELLS_NUMBER);
  const activeWallboard = useSelector((state) => state.wallboards.present.activeWallboard.wallboard);
  const sortableListRef = useRef();
  const gridRef = useRef();

  useEffect(() => {
    if (sortableListRef.current.offsetHeight && gridRef.current?.offsetHeight) {
      if (gridRef.current?.offsetHeight - 200 < sortableListRef.current.offsetHeight) setGridCells((cells) => cells + CELLS_NUMBER_ADD);
      if (
        gridRef.current?.offsetHeight > sortableListRef.current.offsetHeight + CELL_HEIGHT * (480 / CELLS_ON_ROW) &&
        gridCells - CELLS_NUMBER_REMOVE > INITIAL_CELLS_NUMBER
      ) {
        setGridCells((cells) => cells - CELLS_NUMBER_REMOVE);
      }
    }
  }, [sortableListRef.current?.offsetHeight, gridRef.current?.offsetHeight, gridCells, activeWallboard.widgets]);

  const handleGridComponents = () => {
    return (
      <div className="c-grid__components" ref={sortableListRef}>
        <GridResizeContainer widgets={activeWallboard.widgets} />
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
    <div>
      <div className="c-grid">
        {handleGrid()}
        {handleGridComponents()}
      </div>
    </div>
  );
};
export default GridPage;
