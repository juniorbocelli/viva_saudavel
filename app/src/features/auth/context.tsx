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

  const isSignedIn = () => {
    return Boolean(states.loggedUser);
  };

  const isAdmin = () => {
    if (states.loggedUser === null)
      return false;
    else
      return states.loggedUser.isAdmin;
  };

  globalAuth = {
    logout: api.logout,
  };

  return (
    <AuthContext.Provider
      value={
        {
          isCheckingSession: states.isCheckingSession,
          loggedUser: states.loggedUser,

          login: api.login,
          logout: api.logout,
          checkSession: api.checkSession,
          isSignedIn: isSignedIn,
          isAdmin: isAdmin,
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
