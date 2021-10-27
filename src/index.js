import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'src/store/store';
import './style/main.scss';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import reportWebVitals from './reportWebVitals';
ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <Auth0Provider
        domain="redmatter-qa01.eu.auth0.com"
        clientId="40leAQozuSfAQGf52Lf4JBeY6QIXBvmc"
        redirectUri="https://wallboards.herokuapp.com/"
        // redirectUri="http://localhost:3000"
        audience="https://sapien-proxy.redmatter-qa01.pub/"
        scope="wallboard:admin"
        responseType="id_token"
        cacheLocation="localstorage"
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
