import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router-dom';
import Toolbar from '../toolbar/toolbar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWallboardByIdThunk } from 'src/store/thunk/wallboards.thunk';
import { FetchStatus } from 'src/store/reducers/wallboards.reducer';
import GridResizeContainer from '../grid/grid.resize-container';
import { useHistory } from 'react-router';
import { fetchAvailabilityProfilesThunk, fetchAvailabilityStatesThunk } from '../../store/thunk/agents.thunk';

const WallboardReadOnly = () => {
  const { id } = useParams();
  const { logout } = useAuth0();
  const dispatch = useDispatch();
  const history = useHistory();
  const { userInfo } = useSelector((state) => state.login);
  const { wallboard, fetchStatus, fetchMessage } = useSelector((state) => state.wallboards.present.activeWallboard);
  const { availabilityProfiles } = useSelector((state) => state.agents);
  useEffect(() => {
    dispatch(fetchWallboardByIdThunk(id));
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

  if (fetchStatus !== FetchStatus.SUCCESS) {
    return <div>{fetchMessage}</div>;
  }

  // if (!wallboard.settings.link.isReadOnlyEnabled) {
  if (!wallboard.settings.link.isReadOnlyEnabled && userInfo.permissionLevel !== 'ADMINISTRATOR') {
    history.push('/');
  }

  return (
    <div className="c-wallboard--read-only">
      <Toolbar template="wb-read-only" wbName={wallboard.name} logout={logout} />

      <div className="c-wallboard--read-only__component">
        <div className="c-wallboard--read-only__cards">
          <GridResizeContainer isEditMode={false} widgets={wallboard.widgets} />
        </div>
      </div>
    </div>
  );
};

export default WallboardReadOnly;
