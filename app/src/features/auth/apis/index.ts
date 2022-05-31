// General Imports ==================================================================================================================================
import registerAPI from './registerAPI';
import loginAPI from './loginAPI';
import logoutAPI from './logoutAPI';
import checkSessionAPI from './checkSessionAPI';
import { changeClientCodeAPI } from '../../../services/cart';

// Hooks ============================================================================================================================================


// Types ============================================================================================================================================
import { IAuthStates, } from '../types';
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

  const setLogged = (client: Client, token: string) => {
    const clientToLoggin: Client = {
      id: client.id,

      name: client.name,
      cpf: client.cpf,

      email: client.email,
      cellPhone: client.cellPhone,
      phone: client.phone,

      isActive: client.isActive,
      isAdmin: client.isAdmin,

      address: {
        cep: client.address.cep,
        street: client.address.street,
        district: client.address.district,
        state: client.address.state,
        city: client.address.city,
        number: client.address.number,
        complement: client.address.complement,
      },
    };

    states.setLoggedClient(clientToLoggin);

    LocalStorage.setToken(token);
  };

  const setNotLogged = () => {
    states.setLoggedClient(null);
    LocalStorage.setToken('not_auth');
  };

  const register = (client: Client) => {
    states.setIsQueryingAPI(true);

    registerAPI(client)
      .then(async response => {
        console.log('response => registerAPI', response);
        // Verify if exist errors
        if (typeof (response.data.error) !== 'undefined') {
          setNotLogged();
          states.setErrorMessage(response.data.error);

          return;
        };

        // Verify if client exist
        if (typeof (response.data.client) !== 'undefined') {
          const client: Client = response.data.client;

          // Change default cart key to client id
          try {
            // Since the execution order of changeClientCode and setLogged matters, we have to ensure that changeClientCode
            // is executed first
            const response = await changeClientCodeAPI(LocalStorage.getCartKey(), client.id as string);

            // Verify if exist errors
            if (typeof (response.data.error) !== 'undefined') {
              setNotLogged();
              states.setErrorMessage(response.data.error);

              return;
            };

            // Set loggedIn routines
            setLogged(client, response.data.client.token);

          } catch (error) {
            setNotLogged();
            states.setErrorMessage(error as string);
          };
        }
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
      .then(async response => {
        console.log('response => loginAPI', response);
        // Verify if exist errors
        if (typeof (response.data.error) !== 'undefined') {
          setNotLogged();
          states.setErrorMessage(response.data.error);

          return;
        };

        // Verify if client exist
        if (typeof (response.data.client) !== 'undefined') {
          const client: Client = response.data.client;

          // Change default cart key to client id
          try {
            // Since the execution order of changeClientCode and setLogged matters, we have to ensure that changeClientCode
            // is executed first
            const response = await changeClientCodeAPI(LocalStorage.getCartKey(), client.id as string);

            // Verify if exist errors
            if (typeof (response.data.error) !== 'undefined') {
              setNotLogged();
              states.setErrorMessage(response.data.error);

              return;
            };

            // Set loggedIn routines
            setLogged(client, client.token as string);

          } catch (error) {
            setNotLogged();
            states.setErrorMessage(error as string);
          };
        }
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
        if (typeof (response.data.client) !== 'undefined') {
          const client: Client = response.data.client;

          // Set loggedIn routines
          setLogged(client, response.data.client.token);
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