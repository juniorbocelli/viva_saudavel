import React from 'react';
import {
  IAuthStates,

  LoggedUserState,
  IsCheckingSessionState,

  IsQueryingAPIState,
  ErrorMessageState,
} from './types';

function useStates(): IAuthStates {

  const [loggedUser, setLoggedUser] = React.useState<LoggedUserState>(null);
  const [isCheckingSession, setIsCheckingSession] = React.useState<IsCheckingSessionState>(false);

  const [isQueryingAPI, setIsQueryingAPI] = React.useState<IsQueryingAPIState>(false);
  const [errorMessage, setErrorMessage] = React.useState<ErrorMessageState>(null);

  return {
    loggedUser,
    setLoggedUser,

    isCheckingSession,
    setIsCheckingSession,

    isQueryingAPI,
    setIsQueryingAPI,

    errorMessage,
    setErrorMessage,
  };
};

export default useStates;