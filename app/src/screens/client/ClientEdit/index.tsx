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
import * as Masks from '../../../features/validation/masks';
import SanitizerString from '../../../features/utils/SanitizerString';

import { ClientDataForm } from './types';
import { Client } from '../../../globals/interfaces/client';

import DELIVERY_SETTINGS from '../../../globals/settings/delivery.json';

const ClientEdit: React.FC<React.ReactFragment> = () => {
  const auth = useAuth();
  const states = useStates();
  const methods = useForm<ClientDataForm>({ mode: 'onBlur', reValidateMode: 'onBlur', });
  const apis = useAPIs(states, methods.setValue);
  const effects = useEffects(apis);
  const theme = useTheme();

  const onSubmit = (data: ClientDataForm) => {
    console.log('data', data);
    // Verify if new cep is valid
    if (parseInt(SanitizerString.onlyNumbers(data.cep)) < DELIVERY_SETTINGS['minValidCEP'] || parseInt(SanitizerString.onlyNumbers(data.cep)) > DELIVERY_SETTINGS['maxValidCEP']) {
      states.setDialogMessage({ title: "Erro", message: "Essa região ainda não é atendida 🙁" })

      return;
    };

    const client: Client = {
      id: auth.loggedClient ? auth.loggedClient.id! : '',
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
              mask={React.forwardRef((props, inputRef) => Masks.TextMaskCep({ ...props, inputRef }))}
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
              mask={React.forwardRef((props, inputRef) => Masks.TextMaskCpf({ ...props, inputRef }))}
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
              mask={React.forwardRef((props, inputRef) => Masks.TextMaskCellPhone({ ...props, inputRef }))}
            />

            <ControlledTextInput
              hookForm={["phone", methods.control, methods.formState.errors, Rules.optionalPhone]}
              label="Telefone"
              placeholder="Opcional"
              fullWidth={true}
              mask={React.forwardRef((props, inputRef) => Masks.TextMaskPhone({ ...props, inputRef }))}
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