import jsforce from 'jsforce';
import React from 'react';

import { LoginService } from '../../services/login.service';

const Login = () => {
  LoginService();

  return (
    <button onClick={() => jsforce.browser.login()}>Login</button>
  )
}

export default Login;
