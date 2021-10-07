import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import config from 'src/config/auth';
import Login from 'src/components/login/login';
import Landing from 'src/components/landing/landing';
import jwtExtractor from 'src/common/utils/jwtExtractor';
import WallboardNew from './components/wallboard/wallboard-new';
import WallboardReadOnly from 'src/components/wallboard/wallboard.read-only';
import { Route, Switch } from 'react-router';
import { handleLogoutAC, setAccessTokenAC, setUserInfoAC, setUserTokenInfoAC } from './store/actions/login.action';

function App() {
  const [token, setToken] = useState('');
  const dispatch = useDispatch();
  const data = useSelector((state) => state.login.userInfo);
  const { isAuthenticated, getAccessTokenSilently, logout, isLoading } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getAccessTokenSilently(config).then((res) => {
          setToken(res);
          dispatch(setAccessTokenAC(res));
          dispatch(setUserTokenInfoAC(jwtExtractor(res)));
        });

        const options = {
          method: 'get',
          url: 'https://sapien-proxy.redmatter-qa01.pub/v1/user/me',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        };

        if (token.length > 0) {
          const getData = await axios(options).then((res) => res.data);
          dispatch(setUserInfoAC(getData.data));
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [token.length > 0]);

  const handleLogout = () => {
    logout();
    dispatch(handleLogoutAC());
    localStorage.clear();
  };

  return (
    <div className="App">
      {!data && isAuthenticated && <p>Loading...</p>}
      {data && (
        <>
          <span>
            Logged in as {data.firstName} {data.lastName}
          </span>
          <button
            onClick={() => {
              handleLogout();
            }}
          >
            logout
          </button>
          <div className="c-banner">
            <div className="c-banner-logo"></div>
            <div className="c-banner-brand"></div>
          </div>

          <Switch>
            <Route exact path="/">
              <Landing userInfo={jwtExtractor(token)} />
            </Route>
            <Route exact path="/wallboard/new">
              <WallboardNew />
            </Route>
            <Route path="/wallboard/:id">
              <WallboardReadOnly userInfo={jwtExtractor(token)} />
            </Route>
          </Switch>
        </>
      )}

      {!isAuthenticated && !isLoading && <Login />}
    </div>
  );
}

export default App;
