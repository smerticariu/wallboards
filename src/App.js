import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import config from 'src/config/auth'
import Login from 'src/components/login/login'
import Landing from 'src/components/landing/landing';
import * as actionTypes from '../src/store/actionTypes';
import jwtExtractor from 'src/common/utils/jwtExtractor';

function App() {
  const [data, setData] = useState({});
  const [token, setToken] = useState('');
  const dispatch = useDispatch();
  const objectIsEmpty = obj => Object.keys(obj).length;

  const { isAuthenticated, getAccessTokenSilently, logout, isLoading } = useAuth0();
  
  console.log(useAuth0())
  useEffect(() => {
    const fetchData = async () => {
      try {
        await getAccessTokenSilently(config).then(res  => {
          setToken(res);
          dispatch({ type: actionTypes.SET_ACCESS_TOKEN, payload: res });
          dispatch({ type: actionTypes.SET_USER_INFO, payload: jwtExtractor(res) });
        })

        const options = {
          method: 'get',
          url: 'https://sapien-proxy.redmatter-qa01.pub/v1/user/me',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          }
        }
        
        if(token.length > 0) {
          const getData = await axios(options).then(res => res.data);
          setData(getData.data);
        }
        
      } catch(err) {
        console.log(err)
      }
    }

    fetchData();
    
  }, [data && token.length > 0]);

  const handleLogout = () => {
    setData({})
    logout(); 
    localStorage.clear();
  }

  return (
    <div className="App">
      {(objectIsEmpty(data) === 0 && isAuthenticated) && <p>Loading...</p>}
      {objectIsEmpty(data) > 0 &&
        <>
          <span>Logged in as {data.firstName} {data.lastName}</span>
          <button onClick={() => {handleLogout()}}>logout</button>
          <div className="c-banner">
            <div className="c-banner-logo"></div>
            <div className="c-banner-brand"></div>
          </div>
          <Landing />
        </>
      }
      
      

      {(!isAuthenticated && !isLoading) && <Login />}
      
    </div>
  );
}

export default App;
