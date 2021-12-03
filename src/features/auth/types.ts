
export type isSignedInType = boolean;
export type isLoadingAuthType = boolean;
export type isCheckingSessionType = boolean;
export type errorMessageType = string | null;
export type permissionsType = Array<string>;

export interface IAuthStates {
  isSignedIn: isSignedInType,
  isLoadingAuth: isLoadingAuthType,
  isCheckingSession: isCheckingSessionType,
  errorMessage: errorMessageType,
  permissions: permissionsType,

  setIsSignedIn: (setValue: isSignedInType) => void,
  setIsLoadingAuth: (setValue: isLoadingAuthType) => void,
  setIsCheckingSession: (setValue: isCheckingSessionType) => void,
  setErrorMessage: (setValue: errorMessageType) => void,
  setPermissions: (setValue: permissionsType) => void
};

export interface IAuthContext {
  isSignedIn: isSignedInType,
  isLoadingAuth: isLoadingAuthType,
  isCheckingSession: isCheckingSessionType,
  errorMessage: errorMessageType,
  permissions: permissionsType,

  login: (username: string, password: string) => void,
  logout: () => void,
  checkSession: () => void
};