export type OperationState = 'signIn' | 'recoveryPassword' | 'resetPassword';

export type TokenState = undefined | 'string';

export type SignInFormData = {
  email: string;
  password: string;
};

export type ResetPasswordFormData = {
  password: string;
  passwordConfirmation: string;
};

export type RecoveryPasswordFormData = {
  username: string;
};