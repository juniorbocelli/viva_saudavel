import React from "react";

import { Client } from '../../globals/interfaces/client';

export type LoggedClient = {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
};
export type LoggedClientState = LoggedClient | null | undefined;
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

  register: (client: Client) => void;
  login: (email: string, password: string) => void,
  logout: () => void,
  checkSession: () => void;
  isSignedIn: () => boolean | undefined;
  isAdmin: () => boolean | undefined;
};