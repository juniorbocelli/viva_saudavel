import React from 'react';
import {
  IAuthStates,

  LoggedClientState,
  IsCheckingSessionState,

  IsQueryingAPIState,
  ErrorMessageState,
} from './types';

function useStates(): IAuthStates {

  const [loggedClient, setLoggedClient] = React.useState<LoggedClientState>(null);
  const [isCheckingSession, setIsCheckingSession] = React.useState<IsCheckingSessionState>(false);

  const [isQueryingAPI, setIsQueryingAPI] = React.useState<IsQueryingAPIState>(false);
  const [errorMessage, setErrorMessage] = React.useState<ErrorMessageState>(null);

  return {
    loggedClient,
    setLoggedClient,

    isCheckingSession,
    setIsCheckingSession,

    isQueryingAPI,
    setIsQueryingAPI,

    errorMessage,
    setErrorMessage,
  };
};

export default useStates;