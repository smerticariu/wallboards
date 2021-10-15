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
import ModalDeleteWallboard from './components/modal/delete-wallboard/modal.delete-wallboard';
import NotificationMessage from './components/agent-card/notification-message/notification-message';

function App() {
  const dispatch = useDispatch();
  const { userInfo, userTokenInfo } = useSelector((state) => state.login);
  const { isAuthenticated, getAccessTokenSilently, logout, isLoading } = useAuth0();
  const activeModalName = useSelector((state) => state.wallboards.activeModalName);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getAccessTokenSilently(config).then((res) => {
          dispatch(setAccessTokenAC(res));
          dispatch(setUserTokenInfoAC(jwtExtractor(res)));
          dispatch(fetchUserInfoThunk(res));
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();

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
          <div className="c-banner">
            <a href="/">
              <div className="c-banner-logo"></div>
            </a>
            <div className="c-banner-brand"></div>
          </div>

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
        </>
      )}

      {!isAuthenticated && !isLoading && <Login />}
    </div>
  );
}

export default App;
