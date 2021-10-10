import React, { useEffect, useState } from 'react';
import { createArrayFromTo } from 'src/common/utils/generateArray';
import GridAgentList from './grid.agent-list';
import { SortableItem, SortableList } from '../sortable/sortable';
const GridPage = ({ ...props }) => {
  const [gridCells, setGridCells] = useState(480);
  const [list, slist] = useState([<GridAgentList k={'1'} />, <GridAgentList k={'2'} />, <GridAgentList k={''} />]);

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
    const onSortEnd = ({ oldIndex, newIndex }) => {
      if (oldIndex !== newIndex) {
        const listCopy = [...list];
        listCopy.splice(newIndex, 0, listCopy.splice(oldIndex, 1)[0]);
        slist(listCopy);
      }
    };
    return (
      <div className="c-grid">
        {createArrayFromTo(1, gridCells).map((number) => (
          <div className="c-grid__cell" key={number} />
        ))}
        <SortableList axis="xy" className="c-grid__components" useDragHandle onSortEnd={onSortEnd}>
          {list.map((e, index) => (
            <SortableItem key={e.props.k} index={index}>
              {e}
            </SortableItem>
          ))}
        </SortableList>
      </div>
    );
  };
  return <div>{handleGrid()}</div>;
};
export default GridPage;
