import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createArrayFromTo } from '../../common/utils/generateArray';
import { useSelector } from 'react-redux';
import GridResizeContainer from './grid.resize-container';
const GridPage = ({ ...props }) => {
  const [gridCells, setGridCells] = useState(120);
  const activeWallboard = useSelector((state) => state.wallboards.present.activeWallboard.wallboard);

  const sortableListRef = useRef();
  const gridRef = useRef();
  const gridCellsRef = useRef();

  useEffect(() => {
    if (Math.abs(document.body.scrollHeight - window.innerHeight) < 30) {
      setGridCells((gridCellsLocal) => gridCellsLocal + 24);
    }
    if (gridCellsRef.current.offsetHeight < window.innerHeight) {
      setGridCells((gridCellsLocal) => gridCellsLocal + 12);
    }
    document.addEventListener('scroll', function (e) {
      let documentHeight = document.body.scrollHeight;
      let currentScroll = window.scrollY + window.innerHeight;
      let modifier = 200;
      if (currentScroll + modifier > documentHeight) {
        setGridCells((gridCells) => gridCells + 12);
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
