import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,

  useTheme,
} from '@mui/material';
import { useForm } from 'react-hook-form';

import background1 from '../../../assets/images/backgrounds/background-1.jpg';
import leafLogo from '../../../assets/images/logo/leaf.svg';

import BackDrop from '../../../ui/components/BackDrop';
import ControlledTextInput from '../../../ui/components/form/ControlledTextInput';

import useStates from './states';
import * as Rules from '../../../features/validation/rules';
import {
  TextMaskCpf,
  TextMaskCellPhone,
  TextMaskCep,
  TextMaskPhone,
} from '../../../features/validation/masks';
import { RegisterDataForm } from './types';
import useAPIs from './apis';

const Register: React.FC<React.ReactFragment> = () => {
  const states = useStates();
  const apis = useAPIs(states);
  const theme = useTheme();
  const methods = useForm<RegisterDataForm>({ mode: 'onBlur', reValidateMode: 'onBlur' });

  const onSubmit = (data: RegisterDataForm) => {
    console.log(data);
    apis.register(data);
  }

  const {
    isQueryingAPI,
  } = states;
  return (
    <Box
      component="main"
      sx={
        {
          display: 'flex',
          flexDirection: 'column',
          width: '100vw',
          overflowX: 'hidden',
          minHeight: '100vh',
          backgroundImage: `url(${background1})`,
          backgroundSize: 'cover'
        }
      }
    >
      <BackDrop open={isQueryingAPI} />

      {/* Green box mobile */}
      <Box
        sx={
          {
            bgcolor: theme.palette.primary.main,
            height: '180px',
            float: 'left'
          }
        }
      />

      {/* Form container */}
      <Box
        sx={
          {
            mt: { xs: '-115px', sm: '-120px', },
            // mb: theme.spacing(10),
            ml: 'auto',
            mr: 'auto',
            mb: theme.spacing(5),

            width: { xs: 300, sm: '90%' },

            borderRadius: 2,

            flexDirection: 'column',

            padding: { xs: theme.spacing(2), md: theme.spacing(5) },

            backgroundColor: theme.palette.background.paper,
          }
        }
      >
        <Box
          sx={
            {
              display: 'flex',
              justifyContent: { xs: 'center', md: 'left' },
            }
          }
        >
          <Box
            sx={
              {
                width: { xs: '70px', md: '90px' },
                mb: { xs: theme.spacing(2), md: theme.spacing(3) },
              }
            }
          >
            <img src={leafLogo} width='100%' alt='Logo' />
          </Box>
        </Box>

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

        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Grid spacing={theme.spacing(2)} container>
            <Grid md={6} item>
              <ControlledTextInput
                hookForm={["postalCode", methods.control, methods.formState.errors, Rules.requiredText]}
                label="CEP"
                placeholder="Digite o CEP da sua rua..."
                fullWidth={true}
                mask={TextMaskCep}
              />

              <ControlledTextInput
                hookForm={["street", methods.control, methods.formState.errors, Rules.requiredText]}
                label="Logradouro"
                placeholder="Digite o nome da sua rua..."
                fullWidth={true}
              />

              <ControlledTextInput
                hookForm={["district", methods.control, methods.formState.errors, Rules.requiredText]}
                label="Bairro"
                placeholder="Digite o nome da seu bairro..."
                fullWidth={true}
              />

              <ControlledTextInput
                hookForm={["state", methods.control, methods.formState.errors, Rules.requiredText]}
                label="Estado"
                disabled={false}
                fullWidth={true}
              />

              <ControlledTextInput
                hookForm={["city", methods.control, methods.formState.errors, Rules.requiredText]}
                label="Cidade"
                disabled={false}
                fullWidth={true}
              />

              <ControlledTextInput
                hookForm={["number", methods.control, methods.formState.errors, Rules.requiredText]}
                label="Número"
                placeholder="Digite o número da sua casa..."
                fullWidth={true}
              />

              <ControlledTextInput
                hookForm={["complement", methods.control, methods.formState.errors, Rules.optionalText]}
                label="Complemento"
                placeholder="Opcional"
                fullWidth={true}
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
                hookForm={["email", methods.control, methods.formState.errors, Rules.requiredText]}
                label="E-mail"
                placeholder="Digite seu e-mail..."
                fullWidth={true}
              />

              <ControlledTextInput
                hookForm={["password", methods.control, methods.formState.errors, Rules.requiredText]}
                type='password'
                label="Senha"
                placeholder="Digite sua uma senha..."
                fullWidth={true}
              />

              <ControlledTextInput
                hookForm={["cellPhone", methods.control, methods.formState.errors, Rules.requiredCellPhone]}
                label="Celular"
                placeholder="Digite seu número de celular..."
                fullWidth={true}
                mask={TextMaskCellPhone}
              />

              <ControlledTextInput
                hookForm={["phone", methods.control, methods.formState.errors, Rules.optionalPhone]}
                label="Telefone"
                placeholder="Opcional"
                fullWidth={true}
                mask={TextMaskPhone}
              />

              <Button
                type='submit'
                variant='contained'
                color='primary'
                sx={{ mt: { xs: theme.spacing(2), md: theme.spacing(2) } }}
                fullWidth
              >
                Cadastrar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default Register;