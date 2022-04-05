import React from "react";

export type LoggedUser = {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
};
export type LoggedUserState = LoggedUser | null;
export type IsCheckingSessionState = boolean;

export type IsQueryingAPIState = boolean;
export type ErrorMessageState = null | string;

export interface IAuthStates {
  loggedUser: LoggedUserState;
  setLoggedUser: React.Dispatch<React.SetStateAction<LoggedUserState>>;

  isCheckingSession: IsCheckingSessionState;
  setIsCheckingSession: React.Dispatch<React.SetStateAction<IsCheckingSessionState>>;

  isQueryingAPI: IsQueryingAPIState;
  setIsQueryingAPI: React.Dispatch<React.SetStateAction<IsQueryingAPIState>>;

  errorMessage: ErrorMessageState;
  setErrorMessage: React.Dispatch<React.SetStateAction<ErrorMessageState>>;
};

export interface IAuthContext {
  loggedUser: LoggedUserState;
  isCheckingSession: IsCheckingSessionState

  login: (username: string, password: string) => void,
  logout: () => void,
  checkSession: () => void;
  isSignedIn: () => boolean;
  isAdmin: () => boolean;
};