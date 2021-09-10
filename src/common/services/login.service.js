import jsforce from 'jsforce';
import { CREDENTIALS } from '../components/login/defaults';
import { useDispatch } from 'react-redux';
import * as types from '../../store/actionTypes';



export const LoginService = (event) => {
  const dispatch = useDispatch();

  jsforce.browser.init({
    clientId: CREDENTIALS.CONSUMER_KEY,
    redirectUri: CREDENTIALS.REDIRECT_URI,
  });

  jsforce.browser.on('connect', conn => {
    console.log('login service')
    switch(event) {
      case 'callback':
        window.close();
        break;

      default:

      conn.query('SELECT Id, Name FROM Account', (err, res) => {
        if (err) {
            return console.error(err);
        }

        console.log('query response:', res)

        dispatch({ type: types.LOGIN_GET_DATA_FROM_SALESFORCE, payload: res });
      });

      console.log('connection:', conn)
    }
    });

  // jsforce.browser.login();
}