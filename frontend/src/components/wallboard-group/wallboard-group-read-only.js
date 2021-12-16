import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Toolbar from '../toolbar/toolbar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWallboardGroupByIdThunk } from 'src/store/thunk/wallboards.thunk';
import { FetchStatus } from 'src/store/reducers/wallboards.reducer';
import { DEFAULTS } from '../../common/defaults/defaults';
import { fetchAvailabilityProfilesThunk, fetchAvailabilityStatesThunk } from '../../store/thunk/agents.thunk';
import Slider from '../slider/slider';

const WallboardGroupReadOnly = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.login);
  const { wallboardGroup, fetchStatus, fetchMessage, statusCode } = useSelector((state) => state.wallboards.present.wallboardGroup);
  const availabilityProfiles = useSelector((state) => state.agents.availabilityProfiles);
  const adminPermissions = userInfo.isAdmin;
  const teamleaderPermissions = userInfo.isTeamLeader;
  const stepsWithWallboard = useMemo(() => wallboardGroup.steps.filter((step) => step.wallboardId !== null), [wallboardGroup]);
  const noOfStepsWithWallboard = stepsWithWallboard.length;
  const isUserAllowedToViewWallboard = wallboardGroup.settings.link.isReadOnlyEnabled
    ? true
    : adminPermissions || (teamleaderPermissions && wallboardGroup.createdByUserId === userInfo.id);

  useEffect(() => {
    dispatch(fetchWallboardGroupByIdThunk({ id }));
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    dispatch(fetchAvailabilityProfilesThunk());
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

  const handleErrors = () => {
    if (!isUserAllowedToViewWallboard) {
      return (
        <div className="error-message-container">
          <h3 className="error-message--headline">Error 401:</h3>
          <p className="error-message">{DEFAULTS.WALLBOARDS.MESSAGE.NOT_ALLOWED_VIEW}</p>
        </div>
      );
    }
    if (fetchStatus !== FetchStatus.SUCCESS) {
      return (
        <div className="error-message-container">
          {fetchStatus === FetchStatus.FAIL && <h3 className="error-message--headline">Error {statusCode}:</h3>}
          <p className="error-message">{fetchMessage}</p>
        </div>
      );
    }
    if (!noOfStepsWithWallboard) {
      return (
        <div className="error-message-container">
          <p className="error-message">{DEFAULTS.WALLBOARDS.MESSAGE.WALLBOARD_GROUP_NO_COMPONENTS}</p>
        </div>
      );
    }
  };
  if (fetchStatus !== FetchStatus.SUCCESS || !isUserAllowedToViewWallboard || !noOfStepsWithWallboard) {
    return <Toolbar template={DEFAULTS.TOOLBAR.NAME.ERROR}>{handleErrors()}</Toolbar>;
  }
  return <Slider slides={stepsWithWallboard} />;
};

export default WallboardGroupReadOnly;
