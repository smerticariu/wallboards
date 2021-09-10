import jsforce from 'jsforce';
import React from 'react';

import { LoginService } from '../../services/login.service';

const LoginCallback = () => {
  LoginService('event');

  return (
    <button onClick={() => jsforce.browser.login()}>Login</button>
  )
}

export default LoginCallback;
