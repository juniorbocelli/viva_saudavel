import React from 'react';
import {
  IAuthStates,
  isSignedInType,
  isLoadingAuthType,
  isCheckingSessionType,
  errorMessageType,
  permissionsType,
} from './types';

function useStates(): IAuthStates {

  const [isSignedIn, setIsSignedIn] = React.useState<isSignedInType>(false);
  const [isLoadingAuth, setIsLoadingAuth] = React.useState<isLoadingAuthType>(false);
  const [isCheckingSession, setIsCheckingSession] = React.useState<isCheckingSessionType>(false);
  const [errorMessage, setErrorMessage] = React.useState<errorMessageType>(null);
  const [permissions, setPermissions] = React.useState<permissionsType>([]);

  return {
    isSignedIn,
    setIsSignedIn,

    isLoadingAuth,
    setIsLoadingAuth,

    isCheckingSession,
    setIsCheckingSession,

    errorMessage,
    setErrorMessage,

    permissions,
    setPermissions,
  };
};

export default useStates;