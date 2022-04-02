import React from 'react';
import {
  Button,
  Typography,

  useTheme,
} from '@mui/material';
import { useForm } from 'react-hook-form';

import TextInput from '../../../../../ui/components/form/TextInput';

import * as Rules from '../../../../../features/validation/rules';
import { IUseStates } from '../../states';
import { RecoveryPasswordFormData } from '../../types';

const RecoveryPassword: React.FC<IUseStates> = (states) => {
  const theme = useTheme();
  const { register, formState: { errors }, handleSubmit } = useForm<RecoveryPasswordFormData>();

  const {
    setOperation,
  } = states;

  const onSubmit = (data: RecoveryPasswordFormData) => {
    console.log(data);
    // Here: API that send login data
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit)} style={{width: '100%'}}>
        <TextInput
          label="Usuário"
          name="username"
          autoComplete="username"
          autoFocus={true}
          size="small"
          hookForm={['username', register, errors, Rules.requiredText]}
        />

        <Typography
          variant='subtitle1'
          sx={{ mb: theme.spacing(-1), fontSize: '0.8rem', textAlign: 'right', width: '100%', cursor: 'pointer' }}

          onClick={() => setOperation('signIn')}
        >
          Fazer login
        </Typography>

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

export default RecoveryPassword;