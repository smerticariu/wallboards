import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'src/store/store';
import './style/main.scss';
import config from 'src/config/auth';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import reportWebVitals from './reportWebVitals';
ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <Auth0Provider
        domain={config.domain}
        clientId={config.clientId}
        redirectUri={config.redirectUri}
        audience={config.audience}
        scope={config.scope}
        responseType={config.responseType}
        cacheLocation={config.cacheLocation}
      >
        <App />
      </Auth0Provider>
    </Provider>
  </HashRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
