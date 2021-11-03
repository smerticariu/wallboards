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
    if (document.body.scrollHeight === window.innerHeight) {
      setGridCells((gridCellsLocal) => gridCellsLocal + 12);
    }
    document.addEventListener('scroll', function (e) {
      let documentHeight = document.body.scrollHeight;
      let currentScroll = window.scrollY + window.innerHeight;
      // When the user is [modifier]px from the bottom, fire the event.
      let modifier = 200;
      if (currentScroll + modifier > documentHeight) {
        setGridCells((gridCells) => gridCells + 12);
      }
    });
  }, [gridCells]);

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
