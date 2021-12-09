import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WallboardComponents from './wallboard-group-components';
import Toolbar from '../toolbar/toolbar';
import { fetchWallboardGroupByIdThunk } from 'src/store/thunk/wallboards.thunk';
import { useParams } from 'react-router';
import { FetchStatus } from 'src/store/reducers/wallboards.reducer';
import { DEFAULTS } from '../../common/defaults/defaults';

const WallboardGroupEdit = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { fetchStatus, fetchMessage, statusCode, wallboardGroup } = useSelector((state) => state.wallboards.present.wallboardGroup);

  const { userInfo } = useSelector((state) => state.login);
  const adminPermissions = userInfo.isAdmin;
  const teamleaderPermissions = userInfo.isTeamLeader;

  useEffect(() => {
    if (!wallboardGroup.isNewWallboardGroup) dispatch(fetchWallboardGroupByIdThunk({ id }));
    // eslint-disable-next-line
  }, [id]);

  const handleErrors = () => {
    if (!wallboardGroup.isNewWallboardGroup && fetchStatus !== FetchStatus.SUCCESS) {
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
          <h3 className="error-message--headline">Error 401:</h3>
          <p className="error-message">{DEFAULTS.WALLBOARDS.MESSAGE.NOT_ALLOWED_EDIT}</p>
        </div>
      );
    }

    if (!adminPermissions && teamleaderPermissions && !wallboardGroup.isNewWallboardGroup) {
      // editing a wallboard with team leader permissions
      if (userInfo.id !== wallboardGroup.createdByUserId) {
        // edit the wallboard only if the team leader has access on it
        return (
          <div className="error-message-container">
            <h3 className="error-message--headline">Error 401:</h3>
            <p className="error-message">{DEFAULTS.WALLBOARDS.MESSAGE.NOT_ALLOWED_EDIT}</p>
          </div>
        );
      }
    }
  };

  return (
    <div className="c-wallboard--new">
      {adminPermissions && (fetchStatus === FetchStatus.SUCCESS || wallboardGroup.isNewWallboardGroup) ? (
        // {true ? (
        <>
          <Toolbar template={DEFAULTS.TOOLBAR.NAME.NEW_WALLBOARD_GROUP} />
          <WallboardComponents />
        </>
      ) : (
        <Toolbar template={DEFAULTS.TOOLBAR.NAME.ERROR}>{handleErrors()}</Toolbar>
      )}
    </div>
  );
};

export default WallboardGroupEdit;
