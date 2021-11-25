import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WallboardComponents from './wallboard-components';
import Toolbar from '../toolbar/toolbar';
import GridPage from '../grid/grid';
import { fetchWallboardByIdThunk } from 'src/store/thunk/wallboards.thunk';
import { useParams } from 'react-router';
import { FetchStatus } from 'src/store/reducers/wallboards.reducer';
import { resetWallboardEditPageDataAC } from 'src/store/actions/wallboards.action';
import { fetchAllSkillsThunk } from 'src/store/thunk/skills.thunk';
import { fetchAllCallsQueuesThunk } from 'src/store/thunk/callsQueues.thunk';
import { fetchAvailabilityProfilesThunk, fetchAvailabilityStatesThunk } from 'src/store/thunk/agents.thunk';
import { DEFAULTS } from '../../common/defaults/defaults';

const WallboardEdit = () => {
  const activeModalName = useSelector((state) => state.modal.activeModalName);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { fetchStatus, fetchMessage, statusCode } = useSelector((state) => state.wallboards.present.activeWallboard);
  const activeWallboard = useSelector((state) => state.wallboards.present.activeWallboard.wallboard);
  const { availabilityProfiles } = useSelector((state) => state.agents);

  const { userInfo } = useSelector((state) => state.login);
  const adminPermissions = userInfo.isAdmin;
  const teamleaderPermissions = userInfo.isTeamLeader;
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
    if (!activeWallboard.isNewWallboard) dispatch(fetchWallboardByIdThunk({ id }));
    // eslint-disable-next-line
  }, [id]);

  const handleErrors = () => {
    if (!activeWallboard.isNewWallboard && fetchStatus !== FetchStatus.SUCCESS) {
      return (
        <div className="error-message-container">
          {fetchStatus === FetchStatus.FAIL && <h3 className="error-message--headline">Error {statusCode}:</h3>}
          <p className="error-message">{fetchMessage}</p>
        </div>
      );
    }

    if (!adminPermissions && !teamleaderPermissions) {
      // check if it's basic user
      return (
        <div className="error-message-container">
          <h3 className="error-message--headline">Error {statusCode}:</h3>
          <p className="error-message">{DEFAULTS.WALLBOARDS.MESSAGE.NOT_ALLOWED_EDIT}</p>
        </div>
      );
    }

    if (!adminPermissions && teamleaderPermissions && !activeWallboard.isNewWallboard) {
      // editing a wallboard with team leader permissions
      if (userInfo.id !== activeWallboard.createdByUserId) {
        // edit the wallboard only if the team leader has access on it
        return (
          <div className="error-message-container">
            <h3 className="error-message--headline">Error {statusCode}:</h3>
            <p className="error-message">{DEFAULTS.WALLBOARDS.MESSAGE.NOT_ALLOWED_EDIT}</p>
          </div>
        );
      }
    }
  };

  return (
    <div className="c-wallboard--new">
      {adminPermissions && (fetchStatus === FetchStatus.SUCCESS || activeWallboard.isNewWallboard) ? (
        <>
          <Toolbar template="new-wallboard" />
          {activeModalName === DEFAULTS.MODAL.MODAL_NAMES.SELECT_COMPONENT ||
          activeModalName === DEFAULTS.MODAL.MODAL_NAMES.ADD_COMPONENT ||
          activeModalName === DEFAULTS.MODAL.MODAL_NAMES.CALL_STATUS ||
          activeModalName === DEFAULTS.MODAL.MODAL_NAMES.QUEUE_TRACKING ||
          activeModalName === DEFAULTS.MODAL.MODAL_NAMES.QUEUE_STATUS ||
          activeWallboard.widgets?.length ? (
            <GridPage />
          ) : (
            <WallboardComponents />
          )}
        </>
      ) : (
        <Toolbar template="error">{handleErrors()}</Toolbar>
      )}
    </div>
  );
};

export default WallboardEdit;
