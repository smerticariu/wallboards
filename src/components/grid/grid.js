import React, { useEffect, useState } from 'react';
import { createArrayFromTo } from 'src/common/utils/generateArray';
import GridAgentList from './grid.agent-list';

const GridPage = ({ ...props }) => {
  const [gridCells, setGridCells] = useState(480);
  useEffect(() => {
    const onScroll = () => {
      if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
        setGridCells((cells) => cells + 480);
      }
    };
    window.addEventListener('scroll', onScroll);

    if (!(window.innerWidth > document.documentElement.clientWidth)) {
      setGridCells((cells) => cells + 480);
    }

    return () => window.removeEventListener('scroll', onScroll);
  }, [gridCells]);

  const handleGrid = () => {
    return (
      <div className="c-grid">
        {createArrayFromTo(1, gridCells).map((number) => (
          <div className="c-grid__cell" key={number} />
        ))}
        <div className="c-grid__components">
          <GridAgentList />
          <GridAgentList />
          <GridAgentList />
        </div>
      </div>
    );
  };
  return <div>{handleGrid()}</div>;
};
export default GridPage;
