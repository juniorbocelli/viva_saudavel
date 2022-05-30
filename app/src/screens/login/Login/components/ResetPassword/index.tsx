import React from 'react';
import {
  Button,

  useTheme,
} from '@mui/material';
import { useForm } from 'react-hook-form';

import TextInput from '../../../../../ui/components/form/TextInput';

import * as Rules from '../../../../../features/validation/rules';
import { IUseStates } from '../../states';
import { ResetPasswordFormData } from '../../types';
import { useAuth } from '../../../../../features/auth/context';

const ResetPassword: React.FC<IUseStates> = (states) => {
  const theme = useTheme();
  const auth = useAuth();
  const { register, formState: { errors }, handleSubmit } = useForm<ResetPasswordFormData>();

  const onSubmit = (data: ResetPasswordFormData) => {
    console.log(data);
    // Here: API that send login data

    if (data.password !== data.passwordConfirmation)
      auth.feedback.setErrorMessage("As senhas informadas não coincidem!");
    return null;
  }

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          name="password"
          label="Nova senha"
          type="password"
          autoComplete="password"
          size="small"
          hookForm={['password', register, errors, Rules.requiredText]}
        />

        <TextInput
          name="passwordConfirmation"
          label="Confirmação de senha"
          type="password"
          autoComplete="confirmation-password"
          size="small"
          hookForm={['passwordConfirmation', register, errors, Rules.requiredText]}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ margin: theme.spacing(1, 0, 1) }}
        >
          Enviar
        </Button>
      </form>
    </React.Fragment>
  );
};

export default ResetPassword;