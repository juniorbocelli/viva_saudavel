// General Imports ==================================================================================================================================
import registerAPI from './registerAPI';
import loginAPI from './loginAPI';
import logoutAPI from './logoutAPI';
import checkSessionAPI from './checkSessionAPI';
import { changeClientCodeAPI } from '../../../services/cart';

// Hooks ============================================================================================================================================


// Types ============================================================================================================================================
import { IAuthStates, LoggedClient, } from '../types';
import { Client } from '../../../globals/interfaces/client';
import LocalStorage from '../../storage/LocalStorage';

export interface IUseAPI {
  register: (client: Client) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  checkSession: () => void;
};

// APIs =============================================================================================================================================
function useAPIs(states: IAuthStates): IUseAPI {
  const changeClientCode = (oldCartClientId: string, clientId: string) => {
    states.setIsQueryingAPI(true);

    changeClientCodeAPI(oldCartClientId, clientId)
      .then((response) => {
        console.log('response => changeClientCodeAPI', response);
        // Verify if exist errors
        if (typeof (response.data.error) !== 'undefined') {
          setNotLogged();
          states.setErrorMessage(response.data.error);

          return;
        };
      })
      .catch((error) => {
        console.error('error => changeClientCodeAPI', error);
        states.setErrorMessage(error.data.message);
      })
      .finally(() => {
        states.setIsQueryingAPI(false);
      });
  };

  const setLogged = (client: LoggedClient, token: string) => {
    states.setLoggedClient({
      id: client.id,
      name: client.name,
      email: client.email,
      isAdmin: client.isAdmin,
    });

    LocalStorage.setToken(token);
  };

  const setNotLogged = () => {
    states.setLoggedClient(null);
    LocalStorage.setToken('not_auth');
  };

  const register = (client: Client) => {
    states.setIsQueryingAPI(true);

    registerAPI(client)
      .then((response) => {
        console.log('response => registerAPI', response);
        // Verify if exist errors
        if (typeof (response.data.error) !== 'undefined') {
          setNotLogged();
          states.setErrorMessage(response.data.error);

          return;
        };

        // Verify if client exist
        if (typeof (response.data.client)) {
          const user: LoggedClient = {
            id: response.data.client.id,
            name: response.data.client.name,
            email: response.data.client.email,
            isAdmin: response.data.client.isAdmin,
          };

          // Change default cart key to client id
          changeClientCode(LocalStorage.getCartKey(), response.data.client.id);

          // Set loggedIn routines
          setLogged(user, response.data.client.token);
        };
      })
      .catch((error) => {
        setNotLogged();
        states.setErrorMessage(error.data.message);
      })
      .finally(() => {
        states.setIsQueryingAPI(false)
      });
  };

  const login = (email: string, password: string) => {

    states.setIsQueryingAPI(true);

    loginAPI(email, password)
      .then(response => {
        console.log('response => loginAPI', response);
        // Verify if exist errors
        if (typeof (response.data.error) !== 'undefined') {
          setNotLogged();
          states.setErrorMessage(response.data.error);

          return;
        };

        // Verify if client exist
        if (typeof (response.data.client)) {
          const user: LoggedClient = {
            id: response.data.client.id,
            name: response.data.client.name,
            email: response.data.client.email,
            isAdmin: response.data.client.isAdmin,
          };
          // Change default cart key to client id
          changeClientCode(LocalStorage.getCartKey(), response.data.client.id);

          // Set loggedIn routines
          setLogged(user, response.data.client.token);
        };

      })
      .catch(error => {
        setNotLogged();
        states.setErrorMessage(error.data.message);
      })
      .finally(() => {
        states.setIsQueryingAPI(false);
      });
  }

  const logout = () => {
    setNotLogged();
    states.setIsQueryingAPI(true);

    logoutAPI()
      .then(response => {
        console.log('response => logoutAPI', response);
      })
      .catch(error => {
        states.setErrorMessage(error.data.message);
      })
      .finally(() => {
        states.setIsQueryingAPI(false);
      });
  };

  const checkSession = () => {
    // If not exist token, client is not logged
    if (LocalStorage.getToken() === LocalStorage.getDefaultToken()) {
      states.setLoggedClient(null);
      return;
    };

    states.setLoggedClient(undefined);

    checkSessionAPI(LocalStorage.getToken())
      .then(response => {
        console.log('response => checkSessionAPI', response);
        // Verify if exist errors
        if (typeof (response.data.error) !== 'undefined') {
          setNotLogged();
          states.setErrorMessage(response.data.error);

          return;
        };

        // Verify if client exist
        if (typeof (response.data.client)) {
          const user: LoggedClient = {
            id: response.data.client.id,
            name: response.data.client.name,
            email: response.data.client.email,
            isAdmin: response.data.client.isAdmin,
          };

          setLogged(user, response.data.client.token);
        };
      })
      .catch(error => {
        setNotLogged();
        states.setErrorMessage(error.data.message);
      })
      .finally(() => {
        // states.setIsCheckingSession(false);
      });
  };

  return {
    register,
    login,
    logout,
    checkSession
  };
};

export default useAPIs;