import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,

  useTheme,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import background1 from '../../../assets/images/backgrounds/background-1.jpg';
import leafLogo from '../../../assets/images/logo/leaf.svg';

import ControlledTextInput from '../../../ui/components/form/ControlledTextInput';

import * as Rules from '../../../features/validation/rules';
import {
  TextMaskCpf,
  TextMaskCellPhone,
  TextMaskCep,
  TextMaskPhone,
} from '../../../features/validation/masks';
import { RegisterDataForm } from './types';
import { useAuth } from '../../../features/auth/context';

import * as Routes from '../../../globals/routes';

const Register: React.FC<React.ReactFragment> = () => {
  const auth = useAuth();
  const theme = useTheme();
  const methods = useForm<RegisterDataForm>({ mode: 'onBlur', reValidateMode: 'onBlur' });
  const navigation = useNavigate();

  React.useEffect(() => {
    if (auth.isSignedIn())
      navigation(Routes.API_CLIENT_LOGIN, { replace: true });
  }, [auth.isSignedIn()]);

  const onSubmit = (data: RegisterDataForm) => {
    console.log('data', data);
    let client = {
      name: data.name,
      cpf: data.cpf,
      email: data.email,
      password: data.password,
      cellPhone: data.cellPhone,
      phone: data.phone,

      address: {
        cep: data.cep,
        street: data.street,
        district: data.district,
        state: data.state,
        city: data.city,
        number: data.number,
        complement: data.complement,
      },
    };

    auth.register(client);
  };

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
                hookForm={["cep", methods.control, methods.formState.errors, Rules.requiredText]}
                label="CEP"
                placeholder="Digite o CEP da sua rua..."
                fullWidth={true}
                mask={React.forwardRef((props, ref) => TextMaskCep({ ...props, ...ref }))}
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
                mask={React.forwardRef((props, ref) => TextMaskCpf({ ...props, ...ref }))}
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
                mask={React.forwardRef((props, ref) => TextMaskCellPhone({ ...props, ...ref }))}
              />

              <ControlledTextInput
                hookForm={["phone", methods.control, methods.formState.errors, Rules.optionalPhone]}
                label="Telefone"
                placeholder="Opcional"
                fullWidth={true}
                mask={React.forwardRef((props, ref) => TextMaskPhone({ ...props, ...ref }))}
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
          <Button sx={{ mt: theme.spacing(3) }} onClick={() => navigation(Routes.SCREEN_ADMIN_INDEX)} startIcon={<ArrowBackIcon />}>
            Voltar
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Register;