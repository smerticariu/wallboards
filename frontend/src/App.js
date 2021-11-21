import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import config from 'src/config/auth';
import Login from 'src/components/login/login';
import Landing from 'src/components/landing/landing';
import jwtExtractor from 'src/common/utils/jwtExtractor';
import WallboardEdit from './components/wallboard/wallboard-edit';
import WallboardReadOnly from 'src/components/wallboard/wallboard.read-only';
import { Route, Switch } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { setAccessTokenAC, setUserTokenInfoAC } from './store/actions/login.action';
import { fetchUserDataThunk, fetchUserInfoThunk } from './store/thunk/login.thunk';
import ModalNewWallboard from './components/modal/new-wallboard/modal.new-wallboard';
import ModalAddComponent from './components/modal/add-component/modal.add-component';
import ModalSaveWallboard from './components/modal/save-wallboard/modal.save-wallboard';
import ModalEditWallboard from './components/modal/edit-wallboard/modal.edit-wallboard';
import ModalDeleteWallboard from './components/modal/delete-wallboard/modal.delete-wallboard';
import NotificationMessage from './components/agent-card/notification-message/notification-message';
import ModalDeleteWallboardComponent from './components/modal/delete-wallboard-component/modal.delete-wallboard-component';
import ModalConfirmSaveWallboard from './components/modal/save-wallboard/modal.confirm-save-wallboard';
import ModalWarning from './components/modal/warning/modal.warning';
import { DEFAULTS } from './common/defaults/defaults';
import ModalCallStatus from './components/modal/call-status/modal.call-status';
import ModalQueueStatus from './components/modal/queue-status/modal.queue-status';

function App() {
  const dispatch = useDispatch();
  const { userInfo, userTokenInfo, token } = useSelector((state) => state.login);
  const { isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0();
  const activeModalName = useSelector((state) => state.modal.activeModalName);
  const { warningMessage } = useSelector((state) => state.modal);
  const sfToken = window?.WbConfig?.sfSessionId;
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
        });
      } else if (sfToken) {
        dispatch(fetchUserDataThunk(sfToken));
      }
    } catch (err) {
      console.log(err);
    }
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
              <Route path="/wallboard/:id">
                <WallboardReadOnly userInfo={userTokenInfo} />
              </Route>
            </Switch>
          </HashRouter>
          <NotificationMessage />
          {activeModalName === DEFAULTS.MODAL.MODAL_NAMES.SELECT_COMPONENT && <ModalNewWallboard />}
          {activeModalName === DEFAULTS.MODAL.MODAL_NAMES.ADD_COMPONENT && <ModalAddComponent />}
          {activeModalName === DEFAULTS.MODAL.MODAL_NAMES.SAVE_WALLBOARD && <ModalSaveWallboard />}
          {activeModalName === DEFAULTS.MODAL.MODAL_NAMES.DELETE_WALLBOARD && <ModalDeleteWallboard />}
          {activeModalName === DEFAULTS.MODAL.MODAL_NAMES.EDIT_WALLBOARD && <ModalEditWallboard />}
          {activeModalName === DEFAULTS.MODAL.MODAL_NAMES.DELETE_WALLBOARD_COMPONENT && <ModalDeleteWallboardComponent />}
          {activeModalName === DEFAULTS.MODAL.MODAL_NAMES.CONFIRM_SAVE_WALLBOARD && <ModalConfirmSaveWallboard />}
          {activeModalName === DEFAULTS.MODAL.MODAL_NAMES.CALL_STATUS && <ModalCallStatus />}
          {activeModalName === DEFAULTS.MODAL.MODAL_NAMES.QUEUE_STATUS && <ModalQueueStatus />}
          {warningMessage && <ModalWarning />}
        </>
      )}

      {!sfToken && !isAuthenticated && !isLoading && <Login />}
    </div>
  );
}

export default App;
