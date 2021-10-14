import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WallboardComponents from './wallboard-components';
import Toolbar from '../toolbar/toolbar';
import ModalNewWallboard from '../modal/new-wallboard/modal.new-wallboard';
import { WALLBOARD_MODAL_NAMES } from '../modal/new-wallboard/modal.new-wallboard.defaults';
import ModalAddComponent from '../modal/add-component/modal.add-component';
import GridPage from '../grid/grid';
import { fetchWallboardByIdThunk } from 'src/store/thunk/wallboards.thunk';
import { useParams } from 'react-router';
import { FetchStatus } from 'src/store/reducers/wallboards.reducer';
import ModalSaveWallboard from '../modal/save-wallboard/modal.save-wallboard';
import { resetWallboardEditPageDataAC } from 'src/store/actions/wallboards.action';

const WallboardEdit = () => {
  const activeModalName = useSelector((state) => state.wallboards.activeModalName);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { fetchStatus, fetchMessage } = useSelector((state) => state.wallboards.activeWallboard);
  const activeWallboard = useSelector((state) => state.wallboards.activeWallboard.wallboard);

  useEffect(() => {
    return () => dispatch(resetWallboardEditPageDataAC());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(fetchWallboardByIdThunk({ wbId: id }));
    // eslint-disable-next-line
  }, [id]);

  if (fetchStatus !== FetchStatus.SUCCESS) {
    return <div>{fetchMessage}</div>;
  }
  return (
    <div className="c-wallboard--new">
      <Toolbar template="new-wallboard" />

      {activeModalName === WALLBOARD_MODAL_NAMES.SELECT_COMPONENT ||
      activeModalName === WALLBOARD_MODAL_NAMES.ADD_COMPONENT ||
      activeWallboard.widgets?.length ? (
        <GridPage />
      ) : (
        <WallboardComponents />
      )}
    </div>
  );
};

export default WallboardEdit;
