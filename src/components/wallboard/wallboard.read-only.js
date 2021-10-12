import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router-dom';
import Toolbar from '../toolbar/toolbar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWallboardByIdThunk } from 'src/store/thunk/wallboards.thunk';
import { FetchStatus } from 'src/store/reducers/wallboards.reducer';

const WallboardReadOnly = () => {
  const { id } = useParams();
  const { logout } = useAuth0();
  const dispatch = useDispatch();
  const { wallboard, fetchStatus } = useSelector((state) => state.wallboards.activeWallboard);
  const { userInfo, token } = useSelector((state) => state.login);
  useEffect(() => {
    dispatch(fetchWallboardByIdThunk({wbId: id, orgId:userInfo.organisationId, token}));
    // eslint-disable-next-line
  }, [id]);

  if (fetchStatus !== FetchStatus.SUCCESS) {
    return <div>Single wallboard loading...</div>;
  }
  return (
    <div className="c-wallboard--read-only">
      <Toolbar template="wb-read-only" wbName={wallboard.name} logout={logout} />
    </div>
  );
};

export default WallboardReadOnly;
