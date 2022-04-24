import React from 'react';
import {
  IAuthStates,

  LoggedClientState,

  IsQueryingAPIState,
  ErrorMessageState,
} from './types';

function useStates(): IAuthStates {

  const [loggedClient, setLoggedClient] = React.useState<LoggedClientState>(undefined);

  const [isQueryingAPI, setIsQueryingAPI] = React.useState<IsQueryingAPIState>(false);
  const [errorMessage, setErrorMessage] = React.useState<ErrorMessageState>(null);

  return {
    loggedClient,
    setLoggedClient,

    isQueryingAPI,
    setIsQueryingAPI,

    errorMessage,
    setErrorMessage,
  };
};

export default useStates;