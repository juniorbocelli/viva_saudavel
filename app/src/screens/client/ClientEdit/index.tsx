import React from 'react';
import {
  Grid,
  Button,

  useTheme,
} from '@mui/material';
import { useForm } from 'react-hook-form';

import MainContentBox from '../../../ui/components/pages/MainContentBox';
import ControlledTextInput from '../../../ui/components/form/ControlledTextInput';

import useStates from './states';
import useAPIs from './apis';
import useEffects from './effects';
import { useAuth } from '../../../features/auth/context';

import * as Rules from '../../../features/validation/rules';
import {
  TextMaskCpf,
  TextMaskCellPhone,
  TextMaskCep,
  TextMaskPhone,
} from '../../../features/validation/masks';
import { ClientDataForm } from './types';
import { IClientUpdateProps } from './apis/updateClientAPI';

const ClientEdit: React.FC<React.ReactFragment> = () => {
  const auth = useAuth();
  const states = useStates();
  const methods = useForm<ClientDataForm>({ mode: 'onBlur', reValidateMode: 'onBlur', });
  const apis = useAPIs(states, methods.setValue);
  const effects = useEffects(apis);
  const theme = useTheme();

  const onSubmit = (data: ClientDataForm) => {
    console.log('data', data);
    const client: IClientUpdateProps = {
      id: auth.loggedClient ? auth.loggedClient.id : '',
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

    apis.updateClient(client);
  };

  effects.useComponentDidMount(auth.loggedClient);

  return (
    <MainContentBox states={states} isLoggedIn={true}>
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
              hookForm={["password", methods.control, methods.formState.errors, Rules.optionalText]}
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
              Salvar dados
              </Button>
          </Grid>
        </Grid>
      </form>
    </MainContentBox>
  );
};

export default ClientEdit;