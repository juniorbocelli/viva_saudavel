import React from 'react';
import {
  Button,
  Typography,
  InputAdornment,
  IconButton,

  useTheme,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import TextInput from '../../../../../ui/components/form/TextInput';

import * as Rules from '../../../../../features/validation/rules';
import { IUseStates } from '../../states';
import { SignInFormData } from '../../types';

const SignIn: React.FC<IUseStates> = (states) => {
  const theme = useTheme();
  const { register, formState: { errors }, handleSubmit } = useForm<SignInFormData>();

  const {
    setOperation,
  } = states;

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data: SignInFormData) => {
    console.log(data);
    // Here: API that send login data
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          sx={{ mb: -2, fontSize: '0.8rem', textAlign: 'right', width: '100%', cursor: 'pointer' }}

          onClick={() => setOperation('recoveryPassword')}
        >
          Esqueceu a senha?
        </Typography>

        <TextInput
          name="password"
          label="Senha"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          size="small"
          hookForm={['password', register, errors, Rules.requiredText]}

          InputProps={
            {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }
          }
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ margin: theme.spacing(1, 0, 1) }}
        >
          Entrar
        </Button>
      </form>
    </React.Fragment>
  );
};

export default SignIn;