import React from "react";

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

export type Address = {
  cep: string;
  street: string;
  district: string;
  state: string;
  city: string;
  number: string;
  complement?: string;
};

export type Client = {
  name: string;
  cpf: string;
  email: string;
  password: string;
  cellPhone: string;
  phone?: string;

  address: Address;
};

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