import React from 'react';
import {
  Box,
  Typography,
  Grid,

  useTheme,
} from '@mui/material';
import { useForm } from 'react-hook-form';

import background1 from '../../../assets/images/backgrounds/background-1.jpg';

import BackDrop from '../../../ui/components/BackDrop';
import ControlledTextInput from '../../../ui/components/form/ControlledTextInput';

import useStates from './states';
import * as Rules from '../../../features/validation/rules';
import { TextMaskCpf, TextMaskMobilePhone, TextMaskCep } from '../../../features/validation/masks';

const Register: React.FC<React.ReactFragment> = (props) => {
  const states = useStates();
  const theme = useTheme();

  interface IBuceta {
    name: string;
  }
  const methods = useForm<IBuceta>({ mode: 'onBlur', reValidateMode: 'onBlur' });

  const {
    isQueryingAPI,
  } = states;
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

      {/* Green box desktop */}
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

      {/* Green box mobile */}
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

      {/* Form container */}
      <Box
        sx={
          {
            mt: { xs: '-115px', sm: theme.spacing(8) },
            // mb: theme.spacing(10),
            ml: { xs: 'auto', sm: theme.spacing(-30) },
            mr: { xs: 'auto', sm: theme.spacing(10) },
            mb: theme.spacing(10),

            width: { xs: 300, sm: '90%' },
            height: { xs: 500, sm: 'auto' },

            borderRadius: 2,


            flexDirection: 'column',

            padding: theme.spacing(5),

            backgroundColor: theme.palette.background.paper,
          }
        }
      >

        <Typography
          variant='h3'
          component='div'
          sx={
            {
              fontWeight: 700,
              fontSize: '2rem',
              mb: theme.spacing(1),
              color: theme.palette.primary.light
            }
          }
        >
          Cadastro
        </Typography>

        <Grid spacing={theme.spacing(2)} container>
          <Grid md={6} item>
            <ControlledTextInput
              hookForm={["postalCode", methods.control, methods.formState.errors, Rules.requiredText]}
              label="CEP"
              placeholder="Digite o CEP da sua rua..."
              fullWidth={true}
              mask={TextMaskCep}
            />
          </Grid>

          <Grid md={6} item>
            <ControlledTextInput
              hookForm={["name", methods.control, methods.formState.errors, Rules.requiredText]}
              label="Nome"
              placeholder="Digite seu nome..."
              fullWidth={true}
            />

            <ControlledTextInput
              hookForm={["cpf", methods.control, methods.formState.errors, Rules.requiredCpf]}
              label="CPF"
              placeholder="Digite seu CPF..."
              fullWidth={true}
              mask={TextMaskCpf}
            />

            <ControlledTextInput
              hookForm={["email", methods.control, methods.formState.errors, Rules.requiredEmail]}
              label="E-mail"
              placeholder="Digite seu e-mail..."
              fullWidth={true}
            />

            <ControlledTextInput
              hookForm={["password", methods.control, methods.formState.errors, Rules.requiredText]}
              type='password'
              label="Senha"
              placeholder="Digite seu uma senha..."
              fullWidth={true}
            />

            <ControlledTextInput
              hookForm={["email", methods.control, methods.formState.errors, Rules.requiredMobilePhone]}
              label="Celular"
              placeholder="Digite seu número de celular..."
              fullWidth={true}
              mask={TextMaskMobilePhone}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Register;