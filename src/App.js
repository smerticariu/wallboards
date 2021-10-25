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
import { handleLogoutAC, setAccessTokenAC, setUserTokenInfoAC } from './store/actions/login.action';
import { fetchUserInfoThunk } from './store/thunk/login.thunk';
import { WALLBOARD_MODAL_NAMES } from './components/modal/new-wallboard/modal.new-wallboard.defaults';
import ModalNewWallboard from './components/modal/new-wallboard/modal.new-wallboard';
import ModalAddComponent from './components/modal/add-component/modal.add-component';
import ModalSaveWallboard from './components/modal/save-wallboard/modal.save-wallboard';
import ModalEditWallboard from './components/modal/edit-wallboard/modal.edit-wallboard';
import ModalDeleteWallboard from './components/modal/delete-wallboard/modal.delete-wallboard';
import NotificationMessage from './components/agent-card/notification-message/notification-message';
import ModalDeleteWallboardComponent from './components/modal/delete-wallboard-component/modal.delete-wallboard-component';
import ModalConfirmSaveWallboard from './components/modal/save-wallboard/modal.confirm-save-wallboard';
import ModalWarning from './components/modal/warning/modal.warning';
import axios from 'axios';

function App() {
  const dispatch = useDispatch();
  const { userInfo, userTokenInfo } = useSelector((state) => state.login);
  const { isAuthenticated, getAccessTokenSilently, logout, isLoading } = useAuth0();
  const activeModalName = useSelector((state) => state.modal.activeModalName);
  const { warningMessage } = useSelector((state) => state.modal);

  useEffect(() => {
    // console.log('this is sf config', window.wbConfig);

    const fetchData = async () => {
      // try {
      //   await getAccessTokenSilently(config).then((res) => {
      //     dispatch(setAccessTokenAC(res));
      //     dispatch(setUserTokenInfoAC(jwtExtractor(res)));
      //     dispatch(fetchUserInfoThunk(res));
      //   });
      // } catch (err) {
      //   console.log(err);
      // }


      const options = {
        method: 'get',
        url: "https://gatekeeper.redmatter-qa01.pub/token/salesforce?scope="+config.scope,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer 00D8d000000KoTX!AQEAQB1AKrSbNsyljVNaJGI6X8hBz5s5K7zK3RADOELSh1bTkkBSY4GDh54pFDLXviSVLObHIOi3gElJ1wKUta.KE09JGz4Z`
        }
      }

      await axios(options).then(res => {
        dispatch(setAccessTokenAC(res.data.jwt));
        dispatch(setUserTokenInfoAC(jwtExtractor(res.data.jwt)));
        dispatch(fetchUserInfoThunk(res.data.jwt));
      })

      console.log(userInfo)
    };

    fetchData();
    // const scope = 'wallboard:basic';

    // const options = {
    //   method: 'get',
    //   url: `https://gatekeeper.redmatter-qa01.pub/token/salesforce?scope=${scope}`,
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer 00D8d000000KoTX!AQEAQB1AKrSbNsyljVNaJGI6X8hBz5s5K7zK3RADOELSh1bTkkBSY4GDh54pFDLXviSVLObHIOi3gElJ1wKUta.KE09JGz4Z`
    //   }
    // }

    // const sftoken = await axios(options).then(res => res.data.jwt);


    // const options2 = {
    //   method: 'get',
    //   url: `https://gatekeeper.redmatter.pub/token/sapien/organisation/{organisation}/user/{user}?scope={scopes}`,
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer 00D8d000000KoTX!AQEAQB1AKrSbNsyljVNaJGI6X8hBz5s5K7zK3RADOELSh1bTkkBSY4GDh54pFDLXviSVLObHIOi3gElJ1wKUta.KE09JGz4Z`
    //   }
    // }

    // eslint-disable-next-line
  }, []);

  const handleLogout = () => {
    logout();
    dispatch(handleLogoutAC());
    localStorage.clear();
  };
  return (
    <div className="App">
      {!userInfo && isAuthenticated && <p>Loading...</p>}
      {userInfo && userTokenInfo && (
        <>
          <span>
            Logged in as {userInfo.firstName} {userInfo.lastName}
          </span>
          <button
            onClick={() => {
              handleLogout();
            }}
          >
            logout
          </button>
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
          <NotificationMessage />
          {activeModalName === WALLBOARD_MODAL_NAMES.SELECT_COMPONENT && <ModalNewWallboard />}
          {activeModalName === WALLBOARD_MODAL_NAMES.ADD_COMPONENT && <ModalAddComponent />}
          {activeModalName === WALLBOARD_MODAL_NAMES.SAVE_WALLBOARD && <ModalSaveWallboard />}
          {activeModalName === WALLBOARD_MODAL_NAMES.DELETE_WALLBOARD && <ModalDeleteWallboard />}
          {activeModalName === WALLBOARD_MODAL_NAMES.EDIT_WALLBOARD && <ModalEditWallboard />}
          {activeModalName === WALLBOARD_MODAL_NAMES.DELETE_WALLBOARD_COMPONENT && <ModalDeleteWallboardComponent />}
          {activeModalName === WALLBOARD_MODAL_NAMES.CONFIRM_SAVE_WALLBOARD && <ModalConfirmSaveWallboard />}
          {warningMessage && <ModalWarning />}
        </>
      )}

      {!isAuthenticated && !isLoading && <Login />}
    </div>
  );
}

export default App;
