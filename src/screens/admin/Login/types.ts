export type IsQueryingAPIState = boolean;
export type ErrorMessageState = string | undefined;

export type OperationState = 'signIn' | 'recoveryPassword' | 'resetPassword';

export type TokenState = undefined | 'string'; 