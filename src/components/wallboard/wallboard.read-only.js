import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router-dom';
import Toolbar from '../toolbar/toolbar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWallboardByIdThunk } from 'src/store/thunk/wallboards.thunk';
import { FetchStatus } from 'src/store/reducers/wallboards.reducer';
import AgentCard from '../agent-card/agent-card';

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

  const handleCards = () => {
    let cards = [];

    wallboard.widgets.forEach((widget) => {
      widget.presenceStates.selectedItems.map((presenceState) =>
        cards.push(
          <AgentCard
            key={cards.length}
            callStatus="Inbound Call"
            callStatusKey={presenceState}
            callTime="--:--:--"
            ext="0000"
            name="Staff Member Name"
            status="User online status"
            totalTime="00:00:00"
          />
        )
      );
    });
    return cards;
  };

  return (
    <div className="c-wallboard--read-only">
      <Toolbar template="wb-read-only" wbName={wallboard.name} logout={logout} />

      <div className="c-wallboard--read-only__component">
        <div className="c-wallboard--read-only__title">
          <div className="c-wallboard--read-only__title c-wallboard--read-only__title--bold">Agent List: </div>
          Support overflow queue for team 2
        </div>
        <div className="c-wallboard--read-only__cards">{handleCards()}</div>
      </div>
    </div>
  );
};

export default WallboardReadOnly;
