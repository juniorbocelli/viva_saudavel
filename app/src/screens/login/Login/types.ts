export type IsQueryingAPIState = boolean;
export type ErrorMessageState = string | undefined;

export type OperationState = 'signIn' | 'recoveryPassword' | 'resetPassword';

export type TokenState = undefined | 'string';

export type SignInFormData = {
  username: string;
  password: string;
};

export type ResetPasswordFormData = {
  password: string;
  passwordConfirmation: string;
};

export type RecoveryPasswordFormData = {
  username: string;
};