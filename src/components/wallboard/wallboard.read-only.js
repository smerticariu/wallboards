import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router-dom';
import Toolbar from '../toolbar/toolbar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWallboardByIdThunk } from 'src/store/thunk/wallboards.thunk';
import { FetchStatus } from 'src/store/reducers/wallboards.reducer';
import GridResizeContainer from '../grid/grid.resize-container';
import { fetchAvailabilityProfilesThunk, fetchAvailabilityStatesThunk } from '../../store/thunk/agents.thunk';
import { DEFAULTS } from '../../common/defaults/defaults';

const WallboardReadOnly = () => {
  const { id } = useParams();
  const { logout } = useAuth0();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.login);
  const { wallboard, fetchStatus, fetchMessage } = useSelector((state) => state.wallboards.present.activeWallboard);
  const { availabilityProfiles } = useSelector((state) => state.agents);
  const adminPermissions = userInfo.isAdmin;
  const teamleaderPermissions = userInfo.isTeamLeader;
  useEffect(() => {
    dispatch(fetchWallboardByIdThunk({ id }));
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
    if (fetchStatus !== FetchStatus.SUCCESS) {
      return (
        <div>
          {fetchStatus === FetchStatus.FAIL && <h3 className="error-message--headline">Error:</h3>}
          <p className="error-message">{fetchMessage}</p>
        </div>
      );
    }

    return (
      <div>
        <h3 className="error-message--headline">Error:</h3>
        <p className="error-message">{DEFAULTS.WALLBOARDS.MESSAGE.NOT_ALLOWED_VIEW}</p>
      </div>
    );
  };

  return (
    <div className="c-wallboard--read-only">
      {fetchStatus === FetchStatus.SUCCESS &&
      (wallboard.settings.link.isReadOnlyEnabled
        ? true
        : adminPermissions || (teamleaderPermissions && wallboard.createdByUserId === userInfo.id)) ? (
        <>
          <Toolbar template="wb-read-only" wbName={wallboard.name} logout={logout} />

          <div className="c-wallboard--read-only__component">
            <div className="c-wallboard--read-only__cards">
              <GridResizeContainer isEditMode={false} widgets={wallboard.widgets} />
            </div>
          </div>
        </>
      ) : (
        <Toolbar template="error">{handleErrors()}</Toolbar>
      )}
    </div>
  );
};

export default WallboardReadOnly;
