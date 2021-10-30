import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WallboardComponents from './wallboard-components';
import Toolbar from '../toolbar/toolbar';
import { WALLBOARD_MODAL_NAMES } from '../modal/new-wallboard/modal.new-wallboard.defaults';
import GridPage from '../grid/grid';
import { fetchWallboardByIdThunk } from 'src/store/thunk/wallboards.thunk';
import { useParams } from 'react-router';
import { FetchStatus } from 'src/store/reducers/wallboards.reducer';
import { resetWallboardEditPageDataAC } from 'src/store/actions/wallboards.action';
import { fetchAllSkillsThunk } from 'src/store/thunk/skills.thunk';
import { fetchAllCallsQueuesThunk } from 'src/store/thunk/callsQueues.thunk';
import { fetchAvailabilityProfilesThunk, fetchAvailabilityStatesThunk } from 'src/store/thunk/agents.thunk';

const WallboardEdit = () => {
  const activeModalName = useSelector((state) => state.modal.activeModalName);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { fetchStatus, fetchMessage } = useSelector((state) => state.wallboards.present.activeWallboard);
  const activeWallboard = useSelector((state) => state.wallboards.present.activeWallboard.wallboard);
  const { availabilityProfiles } = useSelector((state) => state.agents);

  useEffect(() => {
    dispatch(fetchAllSkillsThunk());
    dispatch(fetchAllCallsQueuesThunk());
    dispatch(fetchAvailabilityProfilesThunk());

    return () => dispatch(resetWallboardEditPageDataAC());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (availabilityProfiles.length) {
      availabilityProfiles.forEach((avProfile) => {
        dispatch(fetchAvailabilityStatesThunk(avProfile.id));
      });
    }
    // eslint-disable-next-line
  }, [availabilityProfiles]);

  useEffect(() => {
    if (!activeWallboard.isNewWallboard) dispatch(fetchWallboardByIdThunk(id));
    // eslint-disable-next-line
  }, [id]);

  if (!activeWallboard.isNewWallboard && fetchStatus !== FetchStatus.SUCCESS) {
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
