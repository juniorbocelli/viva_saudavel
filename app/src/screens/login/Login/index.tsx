import React from 'react';
import {
  Box,
  Typography,

  useTheme,
} from '@mui/material';

import leafLogo from '../../../assets/images/logo/leaf.svg';
import background1 from '../../../assets/images/backgrounds/background-1.jpg';

import BackDrop from '../../../ui/components/BackDrop';
import SignIn from './components/SignIn';
import RecoveryPassword from './components/RecoveryPassword';
import ResetPassword from './components/ResetPassword';

import Url from '../../../features/utils/Url';

import useStates from './states';
import useAPIs from './apis';
import { useEffects } from './effects';

const Login: React.FC<React.ReactFragment> = (props) => {
  const states = useStates();
  const apis = useAPIs(states);
  const effects = useEffects(apis);
  const theme = useTheme();

  const {
    isQueryingAPI,
    errorMessage,

    operation,

    setToken,
  } = states;

  // Get token to recovery reset password
  effects.useComponentdidMount(states);
  React.useEffect(() => {
    setToken(Url.getParams().token);
  }, [setToken]);

  return (
    <Box
      component="main"
      sx={
        {
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          width: '100vw',
          height: '100vh',
          backgroundImage: `url(${background1})`,
          backgroundSize: 'cover'
        }
      }
    >
      <BackDrop open={isQueryingAPI} />

      <Box
        sx={
          {
            bgcolor: theme.palette.primary.main,
            width: '30%',
            display: {
              xs: 'none',
              sm: 'block'
            }
          }
        }
      />

      <Box
        sx={
          {
            bgcolor: theme.palette.primary.main,
            height: '180px',
            display: {
              xs: 'block',
              sm: 'none'
            },
            float: 'left'
          }
        }
      />

      <Box
        sx={
          {
            mt: { xs: '-115px', sm: theme.spacing(8) },
            // mb: theme.spacing(10),
            ml: { xs: 'auto', sm: -20 },
            mr: { xs: 'auto' },

            width: { xs: 300, sm: 450 },
            height: { xs: 500, sm: 450 },

            borderRadius: 2,

            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: theme.spacing(5),

            backgroundColor: theme.palette.background.paper,
          }
        }
      >

        <Box
          sx={{ width: 90, height: 90, mb: { xs: theme.spacing(-1), md: theme.spacing(-1) } }}
        >
          <img src={leafLogo} width='100%' alt='Logo' />
        </Box>

        <Typography
          variant='h3'
          component='div'
          sx={
            {
              fontWeight: 700,
              fontSize: '2rem',
              mb: theme.spacing(1),
              textAlign: 'center',
              color: theme.palette.primary.light
            }
          }
        >
          {
            operation === 'signIn' ? `Login` :
              operation === 'recoveryPassword' ? `Recuperar Senha` : `Redefinir Senha`
          }
        </Typography>

        <Typography
          variant='body1'
          sx={{ textAlign: 'center', color: 'text.secondary' }}
        >
          {
            operation === 'signIn' ? `Entre para fazer suas compras` :
              operation === 'recoveryPassword' ? `Digite seu usuário para recuperar sua senha` : `Digide corretamente sua nova senha`
          }
        </Typography>

        {
          operation === 'signIn' ? <SignIn {...states} /> :
            operation === 'recoveryPassword' ? <RecoveryPassword {...states} /> : <ResetPassword {...states} />
        }

        {
          typeof (errorMessage) !== "undefined" &&
          <Typography color="error" variant="body1" sx={{ mt: theme.spacing(3) }}>
            {errorMessage}
          </Typography>
        }
      </Box>
    </Box>
  );
};

export default Login;