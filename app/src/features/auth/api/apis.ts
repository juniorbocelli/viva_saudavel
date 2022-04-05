// General Imports ==================================================================================================================================
import loginAPI from './loginAPI';
import logoutAPI from './logoutAPI';
import permissionsAPI from './permissionsAPI';

// Hooks ============================================================================================================================================


// Types ============================================================================================================================================
import { IAuthStates, LoggedUser } from '../types';
import LocalStorage from '../../storage/LocalStorage';

export interface IUseAPI {
  login: (user: string, password: string) => void;
  logout: () => void;
  checkSession: () => void;
};

// APIs =============================================================================================================================================
function useAPIs(states: IAuthStates): IUseAPI {

  const login = (user: string, password: string) => {

    states.setIsQueryingAPI(true);

    loginAPI(user, password)
      .then(response => {
        states.setLoggedUser({
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          isAdmin: response.data.isAdmin,
        });

        LocalStorage.setToken(response.data.token);
      })
      .catch(error => {
        LocalStorage.setToken('not_auth');
        states.setErrorMessage(error.response.data.message);
      })
      .finally(() => {
        states.setIsQueryingAPI(false);
      });
  }

  const logout = () => {
    states.setLoggedUser(null);
    LocalStorage.setToken('not_auth');
    states.setIsQueryingAPI(true);

    logoutAPI()
      .then(response => {

      })
      .catch(error => {
        states.setErrorMessage(error.response.data.message);
      })
      .finally(() => {
        states.setIsQueryingAPI(false);
      });
  };

  const checkSession = () => {
    states.setIsCheckingSession(true);

    permissionsAPI()
      .then(response => {
        states.setLoggedUser({
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          isAdmin: response.data.isAdmin,
        });

        LocalStorage.setToken(response.data.token);
      })
      .catch(error => {
        states.setLoggedUser(null);
        LocalStorage.setToken('not_auth');
        states.setErrorMessage(error.response.data.message);
      })
      .finally(() => {
        states.setIsCheckingSession(false);
      });
  };

  return {
    login,
    logout,
    checkSession
  };
};

export default useAPIs;