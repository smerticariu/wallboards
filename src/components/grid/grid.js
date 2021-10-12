import React, { useEffect, useState } from 'react';
import { createArrayFromTo } from 'src/common/utils/generateArray';
import GridAgentList from './grid.agent-list';
import { SortableItem, SortableList } from '../sortable/sortable';
import { useDispatch, useSelector } from 'react-redux';
import { changeWallboardComponentsOrderAC } from 'src/store/actions/wallboards.action';
const GridPage = ({ ...props }) => {
  const [gridCells, setGridCells] = useState(480);
  const activeWallboard = useSelector((state) => state.wallboards.activeWallboard.wallboard);
  const dispatch = useDispatch();

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

  const handleGridComponents = () => {
    const onSortEnd = ({ oldIndex, newIndex }) => {
      if (oldIndex !== newIndex) {
        const widgets = [...activeWallboard.widgets];
        widgets.splice(newIndex, 0, widgets.splice(oldIndex, 1)[0]);
        dispatch(changeWallboardComponentsOrderAC(widgets));
      }
    };
    return (
      <SortableList axis="xy" className="c-grid__components" useDragHandle onSortEnd={onSortEnd}>
        {activeWallboard.widgets.map((widget, index) => (
          <React.Fragment key={widget.id}>
            <SortableItem index={index}>
              <GridAgentList index={index} />
            </SortableItem>
          </React.Fragment>
        ))}
      </SortableList>
    );
  };

  const handleGrid = () => {
    return createArrayFromTo(1, gridCells).map((number) => <div className="c-grid__cell" key={number} />);
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
