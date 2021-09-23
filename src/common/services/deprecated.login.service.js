import createAuth0Client from '@auth0/auth0-spa-js';
import config from '../../config/auth';
import jwtExtractor from '../utils/jwtExtractor';

export const LoginService = async () => {
  try {
    const client = await createAuth0Client(config);
    let result, token, isAuthenticated, data = null;
    if (window.location.search.includes('code=')) {
      result = await client.handleRedirectCallback();
      token = await client.getTokenSilently();
      isAuthenticated = await client.isAuthenticated();

      window.history.replaceState({},document.title, window.location.pathname);
    }

    if(token) {
      data = jwtExtractor(token);
    }

    return {
      client,
      result,
      token,
      isAuthenticated,
      data
    }

  } catch(err) {
    console.log('eroare', err)
  }

  

  

  
  





  // const client = await createAuth0Client(config);
  // let result, token, isAuthenticated = null;

  // if (window.location.search.includes('code=')) {
  //   result = await client.handleRedirectCallback();
  //   token = await client.getTokenSilently();
  //   window.history.replaceState({},
  //     document.title, window.location.pathname);
  //   }

  // isAuthenticated = await client.isAuthenticated();

 
  //   dispatch({ type: types.LOGIN_GET_DATA_FROM_SALESFORCE, payload: {
  //     client,
  //     result,
  //     token,
  //     isAuthenticated,
  //   } });

    // if(login) {
    //   client.loginWithRedirect();
    // }
  

  
}

