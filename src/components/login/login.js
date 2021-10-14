import React from 'react';

import { useAuth0 } from "@auth0/auth0-react";
const Login = () => {
  const { loginWithRedirect } = useAuth0();
  
  
// https://community.auth0.com/t/how-do-i-set-up-a-dynamic-allowed-callback-url/60268
  return (
    <div className="c-login">
      <div className="c-login-left">
        <div className="c-login-brand">
          <a href="/"><div className="c-login-brand__logo"></div></a>
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
        <button className="c-login-start__btn" onClick={() => loginWithRedirect()}>Sign In</button>
      </div>
    </div>
  )
}

export default Login;
