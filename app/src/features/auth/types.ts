import React from "react";

import { Client } from '../../globals/interfaces/client';

export type LoggedClientState = Client | null | undefined;
export type IsCheckingSessionState = boolean;

export type IsQueryingAPIState = boolean;
export type ErrorMessageState = null | string;

export interface IAuthStates {
  loggedClient: LoggedClientState;
  setLoggedClient: React.Dispatch<React.SetStateAction<LoggedClientState>>;

  isQueryingAPI: IsQueryingAPIState;
  setIsQueryingAPI: React.Dispatch<React.SetStateAction<IsQueryingAPIState>>;

  errorMessage: ErrorMessageState;
  setErrorMessage: React.Dispatch<React.SetStateAction<ErrorMessageState>>;
};

export interface IAuthContext {
  loggedClient: LoggedClientState;

  feedback: {
    isQueryingAPI: IsQueryingAPIState;
    setIsQueryingAPI: React.Dispatch<React.SetStateAction<IsQueryingAPIState>>;

    errorMessage: ErrorMessageState;
    setErrorMessage: React.Dispatch<React.SetStateAction<ErrorMessageState>>;
  },

  register: (client: Client) => void;
  login: (email: string, password: string) => void,
  logout: () => void,
  checkSession: () => void;
  isSignedIn: () => boolean | undefined;
  isAdmin: () => boolean | undefined;
};