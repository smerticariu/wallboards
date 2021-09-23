import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as types from '../../../store/actionTypes';
import { LoginService } from '../../services/login.service';

const Login = () => {
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState([]);
  // const style = loginStyle();
  
  useEffect(() => {
    const getLoginData = async () => {
      const loginData = await LoginService();
      setLoginData(loginData)
      dispatch({ type: types.LOGIN_GET_DATA_FROM_SALESFORCE, payload: loginData });
      console.log('loginData', loginData)
    }
    
     getLoginData()
    
  }, []);
  
  
// https://community.auth0.com/t/how-do-i-set-up-a-dynamic-allowed-callback-url/60268
  return (
    <div className="c-login">
      <div className="c-login-left">
        <div className="c-login-brand">
          <a href="/"><div className="c-login-brand__logo"></div></a>
          <h1 className="c-login-brand__headline">Wallboards</h1>
        </div>

        <div className="c-login-info">
          <h2 className="c-login-info__subheadline">Comprehensive Contact Centre Information</h2>
          <p className="c-login-info__description">
            Natterbox Wallboards ensure that management and staff have the real-time business insight to dynamically manage
            resource for inbound calls and maximise the effectiveness of outbound calling teams.
          </p>
          <div className="c-login-info__cards"></div>
        </div>

        <div className="c-login-salesforce">
          <div className="c-login-salesforce__logo"></div>
          <p className="c-login-salesforce__text">Natterbox is a fully integrated Salesforce company</p>
        </div>
      </div>

      <div className="c-login-right">
        <div className="c-login-start">
          <h1 className="c-login-start__headline">Let's get started</h1>
          <p className="c-login-start__description">
            When you click the sign in button below a new Salesforce window will be presented. Enter your user login credentials to sign in Wallboards.
          </p>
        </div>
        <button className="c-login-start__btn" onClick={() => loginData.client.loginWithRedirect()}>Login</button>
      </div>
    </div>
  )
}

export default Login;
