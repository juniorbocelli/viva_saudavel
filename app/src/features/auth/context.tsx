import React from 'react';
import useAPIs from './api/apis';
import useStates from './states';
import { IAuthContext } from './types';

const AuthContext = React.createContext({} as IAuthContext);

interface Props {
  children?: React.ReactNode
};

export let globalAuth = {
  logout: () => { },
};

export const AuthContextProvider: React.FC<Props> = ({ children }) => {

  const states = useStates();
  const api = useAPIs(states);

  globalAuth = {
    logout: api.logout,
  };

  return (
    <AuthContext.Provider
      value={
        {
          isSignedIn: states.isSignedIn,
          isCheckingSession: states.isCheckingSession,
          isLoadingAuth: states.isLoadingAuth,
          errorMessage: states.errorMessage,
          permissions: states.permissions,

          login: api.login,
          logout: api.logout,
          checkSession: api.checkSession,
        }
      }
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = React.useContext(AuthContext);
  return context;
};
