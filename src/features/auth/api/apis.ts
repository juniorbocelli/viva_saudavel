// General Imports ==================================================================================================================================
import loginAPI from './loginAPI';
import logoutAPI from './logoutAPI';
import permissionsAPI from './permissionsAPI';

// Hooks ============================================================================================================================================


// Types ============================================================================================================================================
import { IAuthStates } from '../types';

export interface IUseAPI {
  login: (user: string, password: string) => void,
  logout: () => void,
  checkSession: () => void
}

// APIs =============================================================================================================================================
function useAPIs(states: IAuthStates): IUseAPI {

  const login = (user: string, password: string) => {

    states.setIsLoadingAuth(true);

    loginAPI(user, password)
      .then(response => {
        states.setIsSignedIn(true);
        states.setPermissions(response.data.permissions);
      })
      .catch(error => {
        states.setErrorMessage(error.response.data.message);
      })
      .finally(() => {
        states.setIsLoadingAuth(false);
      });
  }

  const logout = () => {
    states.setIsSignedIn(false);

    logoutAPI()
      .then(response => {

      })
      .catch(error => {

      })
      .finally();
  };

  const checkSession = () => {
    states.setIsCheckingSession(true);

    permissionsAPI()
      .then(response => {
        states.setIsSignedIn(true);
        states.setPermissions(response.data.permissions);
      })
      .catch(error => {
        states.setIsSignedIn(false);
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