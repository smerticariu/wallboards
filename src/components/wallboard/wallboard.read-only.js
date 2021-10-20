import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router-dom';
import Toolbar from '../toolbar/toolbar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWallboardByIdThunk } from 'src/store/thunk/wallboards.thunk';
import { FetchStatus } from 'src/store/reducers/wallboards.reducer';
import AgentCard from '../agent-card/agent-card';
import GridResizeContainer from '../grid/grid.resize-container';

const WallboardReadOnly = () => {
  const { id } = useParams();
  const { logout } = useAuth0();
  const dispatch = useDispatch();
  const { wallboard, fetchStatus, fetchMessage } = useSelector((state) => state.wallboards.present.activeWallboard);
  const { userInfo, token } = useSelector((state) => state.login);
  useEffect(() => {
    dispatch(fetchWallboardByIdThunk({ wbId: id, orgId: userInfo.organisationId, token }));
    // eslint-disable-next-line
  }, [id]);

  if (fetchStatus !== FetchStatus.SUCCESS) {
    return <div>{fetchMessage}</div>;
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
