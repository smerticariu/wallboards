import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import config from 'src/config/auth'
import Login from 'src/components/login/login'
import Landing from 'src/components/landing/landing';

function App() {
  const [data, setData] = useState({});
  const [token, setToken] = useState('');
  const objectIsEmpty = obj => Object.keys(obj).length;

  const { isAuthenticated, getAccessTokenSilently, logout } = useAuth0();

  useEffect( () =>{
    const fetchData = async () => {
      try {
        await getAccessTokenSilently(config).then(res  => {
          setToken(res);
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
          {/* <p>Logged in as {data.firstName} {data.lastName}</p> */}
          <div className="c-banner">
            <div className="c-banner-logo"></div>
            <h1 className="c-banner-brand">Wallboards</h1>
          </div>
          <Landing />
          <button onClick={() => {handleLogout()}}>logout</button>
        </>
      }
      
      

      {(!isAuthenticated) && <Login />}
      
    </div>
  );
}

export default App;
