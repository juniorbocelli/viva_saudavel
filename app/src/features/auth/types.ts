import React from "react";

export type LoggedClient = {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
};
export type LoggedClientState = LoggedClient | null;
export type IsCheckingSessionState = boolean;

export type IsQueryingAPIState = boolean;
export type ErrorMessageState = null | string;

export interface IAuthStates {
  loggedClient: LoggedClientState;
  setLoggedClient: React.Dispatch<React.SetStateAction<LoggedClientState>>;

  isCheckingSession: IsCheckingSessionState;
  setIsCheckingSession: React.Dispatch<React.SetStateAction<IsCheckingSessionState>>;

  isQueryingAPI: IsQueryingAPIState;
  setIsQueryingAPI: React.Dispatch<React.SetStateAction<IsQueryingAPIState>>;

  errorMessage: ErrorMessageState;
  setErrorMessage: React.Dispatch<React.SetStateAction<ErrorMessageState>>;
};

export interface IAuthContext {
  loggedClient: LoggedClientState;
  isCheckingSession: IsCheckingSessionState

  login: (email: string, password: string) => void,
  logout: () => void,
  checkSession: () => void;
  isSignedIn: () => boolean;
  isAdmin: () => boolean;
};