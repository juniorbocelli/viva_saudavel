import React from 'react';
import {
  Button,
  Link,
  Grid,
  Box,
  Typography,
  Container,

  useTheme,
} from '@mui/material';
import { useForm } from 'react-hook-form';

import TopFormAvatar from '../components/TopFormAvatar';
import TextInput from '../../../ui/components/form/TextInput';

import useStates from './states';
import * as Rules from '../../../features/validation/rules';
import { COMPANY_NAME } from '../../../globals/strings';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://company.com.br/">
        {COMPANY_NAME}
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignIn() {
  const states = useStates();
  const theme = useTheme();

  const { register, formState: { errors }, handleSubmit } = useForm();

  const {
    hasError,
    errorMessage
  } = states;

  const onSubmit = (data: { username: string, password: string }) => {
    console.log(data);
    // Here: API that send login data
    return null;
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ mt: theme.spacing(8), display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <TopFormAvatar userName={null} />

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          method="POST"

          sx={{ mt: theme.spacing(1), width: '100%' }}
        >
          <TextInput
            label="Usuário"
            name="username"
            autoComplete="username"
            autoFocus={true}
            size="medium"
            hookForm={['username', register, errors, Rules.requiredText]}
          />
          <TextInput
            name="password"
            label="Senha"
            type="password"
            autoComplete="current-password"
            size="medium"
            hookForm={['password', register, errors, Rules.requiredText]}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ margin: theme.spacing(3, 0, 2) }}
          >
            Enviar
          </Button>
          <Grid container direction="column">
            <Grid item xs>
              <Link href="#" variant="body2">
                Recuperar minha senha
              </Link>
            </Grid>
            <Grid sx={{ marginTop: theme.spacing(1), }} item xs>
              {
                hasError &&
                <Typography color="error" variant="body1">
                  {errorMessage}
                </Typography>
              }
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};