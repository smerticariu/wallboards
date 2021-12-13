import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Toolbar from '../toolbar/toolbar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWallboardByIdThunk, fetchWallboardGroupByIdThunk } from 'src/store/thunk/wallboards.thunk';
import { FetchStatus } from 'src/store/reducers/wallboards.reducer';
import GridResizeContainer from '../grid/grid.resize-container';
import { DEFAULTS } from '../../common/defaults/defaults';

const WallboardGroupReadOnly = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.login);
  const wallboard = useSelector((state) => state.wallboards.present.activeWallboard.wallboard);
  const wallboardFetchStatus = useSelector((state) => state.wallboards.present.activeWallboard.fetchStatus);
  const wallboardFetchMessage = useSelector((state) => state.wallboards.present.activeWallboard.fetchMessage);
  const wallboardStatusCode = useSelector((state) => state.wallboards.present.activeWallboard.statusCode);
  const { wallboardGroup, fetchStatus, fetchMessage, statusCode } = useSelector((state) => state.wallboards.present.wallboardGroup);
  const adminPermissions = userInfo.isAdmin;
  const teamleaderPermissions = userInfo.isTeamLeader;
  const [nextStepIndex, handleNextStepIndex] = useState(0);
  const stepsWithWallboard = wallboardGroup.steps.filter((step) => step.wallboardId !== null);
  const noOfStepsWithWallboard = stepsWithWallboard.length;
  useEffect(() => {
    dispatch(fetchWallboardGroupByIdThunk({ id }));
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    let timeout = null;
    if (noOfStepsWithWallboard) {
      const currentStep = stepsWithWallboard[nextStepIndex];
      dispatch(fetchWallboardByIdThunk({ id: currentStep.wallboardId }));
      timeout = setTimeout(() => {
        handleNextStepIndex(nextStepIndex + 1 === noOfStepsWithWallboard ? 0 : nextStepIndex + 1);
      }, currentStep.stepTime * 1000);
    }
    return () => clearTimeout(timeout);
    // eslint-disable-next-line
  }, [wallboardGroup.steps, nextStepIndex]);

  const handleErrors = () => {
    if (fetchStatus !== FetchStatus.SUCCESS) {
      return (
        <div className="error-message-container">
          {fetchStatus === FetchStatus.FAIL && <h3 className="error-message--headline">Error {statusCode}:</h3>}
          <p className="error-message">{fetchMessage}</p>
        </div>
      );
    }
    if (wallboardFetchStatus !== FetchStatus.SUCCESS) {
      return (
        <div className="error-message-container">
          {wallboardFetchStatus === FetchStatus.FAIL && <h3 className="error-message--headline">Error {wallboardStatusCode}:</h3>}
          <p className="error-message">{wallboardFetchMessage}</p>
        </div>
      );
    }

    return (
      <div className="error-message-container">
        <h3 className="error-message--headline">Error 401:</h3>
        <p className="error-message">{DEFAULTS.WALLBOARDS.MESSAGE.NOT_ALLOWED_VIEW}</p>
      </div>
    );
  };

  const isUserAllowedToViewWallboard = wallboard.settings.link.isReadOnlyEnabled
    ? true
    : adminPermissions || (teamleaderPermissions && wallboard.createdByUserId === userInfo.id);

  return (
    <div className="c-wallboard--read-only">
      {fetchStatus === FetchStatus.SUCCESS && wallboardFetchStatus !== FetchStatus.FAIL && isUserAllowedToViewWallboard ? (
        <>
          <Toolbar template={DEFAULTS.TOOLBAR.NAME.WALLBOARD_READ_ONLY} wbName={wallboard.id ? wallboard.name : ''} />
          <div className="c-wallboard--read-only__component">
            <div className="c-wallboard--read-only__cards">
              <GridResizeContainer isEditMode={false} widgets={wallboard.widgets} />
            </div>
          </div>
        </>
      ) : (
        <Toolbar template={DEFAULTS.TOOLBAR.NAME.ERROR}>{handleErrors()}</Toolbar>
      )}
    </div>
  );
};

export default WallboardGroupReadOnly;
