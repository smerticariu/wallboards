import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import config from 'src/config/auth/authConfig';
import Login from 'src/components/login/login';
import Landing from 'src/components/landing/landing';
import jwtExtractor from 'src/common/utils/jwtExtractor';
import WallboardEdit from './components/wallboard/wallboard-edit';
import WallboardReadOnly from 'src/components/wallboard/wallboard.read-only';
import { Route, Switch } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { setAccessTokenAC, setUserTokenInfoAC, setUsersAvatarsAC } from './store/actions/login.action';
import { fetchUserDataThunk, fetchUserInfoThunk } from './store/thunk/login.thunk';
import ModalAgentList from './components/modal/agent-list/modal.agent-list';
import ModalSaveWallboard from './components/modal/save-wallboard/modal.save-wallboard';
import ModalEditWallboard from './components/modal/edit-wallboard/modal.edit-wallboard';
import ModalDeleteWallboard from './components/modal/delete-wallboard/modal.delete-wallboard';
import NotificationMessage from './components/notification-message/notification-message';
import ModalDeleteWallboardComponent from './components/modal/delete-wallboard-component/modal.delete-wallboard-component';
import ModalConfirmSaveWallboard from './components/modal/save-wallboard/modal.confirm-save-wallboard';
import ModalWarning from './components/modal/warning/modal.warning';
import { DEFAULTS } from './common/defaults/defaults';
import ModalCallStatus from './components/modal/call-status/modal.call-status';
import ModalQueueTracking from './components/modal/queue-tracking/modal.queue-tracking';
import ModalQueueStatus from './components/modal/queue-status/modal.queue-status';
import ModalCallTracking from './components/modal/call-tracking/modal.call-tracking';
import ModalAgentLogin from './components/modal/agent-login/modal.agent-login';
import jsforce from 'jsforce';
import ModalAgentStatus from './components/modal/agent-status/modal.agent-status';
import ModalQueueList from './components/modal/queue-list/modal.queue-list';
import ModalNewWidget from './components/modal/new-widget/modal.new-widget';
import WallboardGroupEdit from './components/wallboard-group/wallboard-group-edit';
import ModalConfirmSaveWallboardGroup from './components/modal/save-wallboard-group/modal.confirm-save-wallboard-group';
import ModalSaveWallboardGroup from './components/modal/save-wallboard-group/modal.save-wallboard-group';

function App() {
  const dispatch = useDispatch();
  const { userInfo, userTokenInfo, token } = useSelector((state) => state.login);
  const { isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0();
  const activeModalName = useSelector((state) => state.modal.activeModalName);
  const { warningMessage } = useSelector((state) => state.modal);
  const sfToken = window?.WbConfig?.sfSessionId || process.env.REACT_APP_TOKEN;
  useEffect(() => {
    if (!token) {
      fetchData();
    }
    // eslint-disable-next-line
  }, [isAuthenticated, token]);
  useEffect(() => {
    let tokenExpiryTimeout = null;
    if (userTokenInfo?.expiry) {
      tokenExpiryTimeout = setTimeout(() => {
        fetchData();
      }, new Date(userTokenInfo?.expiry * 1000) - new Date() + 2000);
    }
    return () => clearTimeout(tokenExpiryTimeout);
    // eslint-disable-next-line
  }, [userTokenInfo]);
  const fetchData = async () => {
    try {
      if (!sfToken && isAuthenticated) {
        await getAccessTokenSilently(config).then((res) => {
          dispatch(setAccessTokenAC(res));
          dispatch(setUserTokenInfoAC(jwtExtractor(res)));
          dispatch(fetchUserInfoThunk(res));
          getUsersAvatars(jwtExtractor(res));
        });
      } else if (sfToken) {
        dispatch(fetchUserDataThunk(sfToken));
        dispatch(setUsersAvatarsAC(window?.WbConfig?.usersAvatars));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getUsersAvatars = async (jwtDecoded) => {
    var conn = new jsforce.Connection({
      instanceUrl: jwtDecoded.salesforceRestUrl.split('/services')[0],
      accessToken: jwtDecoded.salesforceAccessToken,
    });

    conn.query(DEFAULTS.SOQL.GET_USERS_PHOTOS, (err, sfUsers) => {
      if (err) {
        return console.error(err);
      }

      conn.query(DEFAULTS.SOQL.GET_USERS_IDS, (err, avsUsers) => {
        if (err) {
          return console.error(err);
        }

        const usersPhotos = sfUsers.records;
        const usersIds = avsUsers.records;
        let usersAvatars = [];

        usersPhotos.forEach((userPhoto) => {
          usersIds.forEach((userId) => {
            if (userPhoto.Id === userId.nbavs__User__c) {
              usersAvatars.push({
                id: userId.nbavs__Id__c,
                smallPhoto: userPhoto.SmallPhotoUrl,
                largePhoto: userPhoto.FullPhotoUrl,
                name: userPhoto.Name,
              });
            }
          });
        });
        dispatch(setUsersAvatarsAC(usersAvatars));
      });
    });
  };

  const handleRedirect = () => {
    const wbToRedirect = localStorage.getItem('wallboard'); //store the link of the read-only wallboard
    localStorage.removeItem('wallboard'); //remove the link of the read-only wallboard
    if (wbToRedirect) window.location.href = wbToRedirect; //redirect to the link of the read-only wallboard
  };

  return (
    <div className="App">
      {!userInfo && isAuthenticated && <p>Loading...</p>}
      {userInfo && userTokenInfo && (
        <>
          {handleRedirect()}
          <HashRouter>
            <Switch>
              <Route exact path="/">
                <Landing />
              </Route>
              <Route exact path="/wallboard/:id/edit">
                <WallboardEdit />
              </Route>
              <Route exact path="/wallboard/group/:id/edit">
                <WallboardGroupEdit />
              </Route>
              <Route path="/wallboard/:id">
                <WallboardReadOnly userInfo={userTokenInfo} />
              </Route>
            </Switch>
          </HashRouter>
          <NotificationMessage />
          {activeModalName === DEFAULTS.MODAL.MODAL_NAMES.SELECT_COMPONENT && <ModalNewWidget />}
          {activeModalName === DEFAULTS.MODAL.MODAL_NAMES.AGENT_LIST && <ModalAgentList />}
          {activeModalName === DEFAULTS.MODAL.MODAL_NAMES.SAVE_WALLBOARD && <ModalSaveWallboard />}
          {activeModalName === DEFAULTS.MODAL.MODAL_NAMES.SAVE_WALLBOARD_GROUP && <ModalSaveWallboardGroup />}
          {activeModalName === DEFAULTS.MODAL.MODAL_NAMES.DELETE_WALLBOARD && <ModalDeleteWallboard />}
          {activeModalName === DEFAULTS.MODAL.MODAL_NAMES.EDIT_WALLBOARD && <ModalEditWallboard />}
          {activeModalName === DEFAULTS.MODAL.MODAL_NAMES.DELETE_WALLBOARD_COMPONENT && <ModalDeleteWallboardComponent />}
          {activeModalName === DEFAULTS.MODAL.MODAL_NAMES.CONFIRM_SAVE_WALLBOARD && <ModalConfirmSaveWallboard />}
          {activeModalName === DEFAULTS.MODAL.MODAL_NAMES.CONFIRM_SAVE_WALLBOARD_GROUP && <ModalConfirmSaveWallboardGroup />}
          {activeModalName === DEFAULTS.MODAL.MODAL_NAMES.CALL_STATUS && <ModalCallStatus />}
          {activeModalName === DEFAULTS.MODAL.MODAL_NAMES.QUEUE_TRACKING && <ModalQueueTracking />}
          {activeModalName === DEFAULTS.MODAL.MODAL_NAMES.QUEUE_STATUS && <ModalQueueStatus />}
          {activeModalName === DEFAULTS.MODAL.MODAL_NAMES.CALL_TRACKING && <ModalCallTracking />}
          {activeModalName === DEFAULTS.MODAL.MODAL_NAMES.AGENT_LOGIN && <ModalAgentLogin />}
          {activeModalName === DEFAULTS.MODAL.MODAL_NAMES.AGENT_STATUS && <ModalAgentStatus />}
          {activeModalName === DEFAULTS.MODAL.MODAL_NAMES.QUEUE_LIST && <ModalQueueList />}
          {warningMessage && <ModalWarning />}
        </>
      )}

      {!sfToken && !isAuthenticated && !isLoading && <Login />}
    </div>
  );
}

export default App;
