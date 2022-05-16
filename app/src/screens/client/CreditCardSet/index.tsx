import React from 'react';
import {
  Box,
  Button,
  Grid,
  Typography,

  useTheme,
} from '@mui/material';
import { useForm } from 'react-hook-form';

import MainContentBox from '../../../ui/components/pages/MainContentBox';
import ControlledTextInput from '../../../ui/components/form/ControlledTextInput';
import CardsList from './components/CardsList';
import BrandCardSelect from './components/BrandCardSelect';
import Card from './components/Card';
import * as CardUtils from './cardUtils';

import useStates from './states';
import useAPIs from './apis';
import { useAuth } from '../../../features/auth/context';
import { CreditCardFormData, CardValuesEstate } from './types';
import { CreditCard } from '../../../globals/interfaces/creditCard';
import * as Rules from '../../../features/validation/rules';
import * as Masks from '../../../features/validation/masks';

const CreditCardSet: React.FC<React.ReactFragment> = () => {
  const methods = useForm<CreditCardFormData>({ mode: 'onBlur', reValidateMode: 'onBlur' });
  const states = useStates();
  const apis = useAPIs(states, methods);
  const auth = useAuth();
  const theme = useTheme();

  // Effects
  React.useEffect(() => {
    if (typeof (auth.loggedClient?.id) !== 'undefined' && auth.loggedClient?.id !== null)
      apis.getCreditCards(auth.loggedClient?.id);
  }, [auth.loggedClient?.id,]);

  React.useEffect(() => {
    if (typeof (auth.loggedClient?.id) !== 'undefined' && auth.loggedClient?.id !== null)
      if (typeof (states.selectedCard) !== 'undefined')
        apis.getCreditCard(auth.loggedClient.id, states.selectedCard);
      else
        methods.reset();
  }, [states.selectedCard]);

  const handleSubmit = (data: CreditCardFormData) => {
    // Varify if card is valid
    

    const dateParts = data.expiry.split('/')
    const creditCard: CreditCard = {
      number: data.number.split(' '),
      name: data.name,
      expiry: new Date(parseInt('20' + dateParts[1]), parseInt(dateParts[0]), 1),
      brand: data.brand,
      cvc: data.cvc,
    };

    if (typeof (states.selectedCard) === 'undefined')
      apis.newCreditCard(auth.loggedClient?.id!, creditCard);
  };

  const handleCallback = (type: { issuer: string, MaxLength: number }, isValid: boolean) => {
    if (states.cardValues.isValid !== isValid)
      states.setCardValues({ ...states.cardValues, isValid: isValid });

    if (states.cardValues.issuer !== type.issuer)
      states.setCardValues({ ...states.cardValues, issuer: type.issuer });
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    states.setCardValues({ ...states.cardValues, focused: e.target.name });
  };

  const handleInputChange = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.name === 'number') {
      methods.setValue('number', CardUtils.formatCreditCardNumber(e.target.value));
      states.setCardValues({ ...states.cardValues, number: e.target.value });
    } else if (e.target.name === 'expiry') {
      methods.setValue('expiry', CardUtils.formatExpirationDate(e.target.value));
      states.setCardValues({ ...states.cardValues, expiry: e.target.value });
    } else if (e.target.name === 'cvc') {
      methods.setValue('cvc', CardUtils.formatCVC(e.target.value));
      states.setCardValues({ ...states.cardValues, cvc: e.target.value });
    } else if (e.target.name === 'name') {
      states.setCardValues({ ...states.cardValues, name: e.target.value });
    }
  };

  return (
    <MainContentBox states={states} isLoggedIn={true} primary='Cartão de Crédito'>
      <Grid container spacing={2}>
        {/* Form  */}
        <Grid item xs={12} md={6}>

          <form onSubmit={methods.handleSubmit(handleSubmit)}>
            <Typography
              variant='h6'
              component='div'
              color={theme.palette.text.secondary}

              sx={{ fontSize: '2.0rem', mb: theme.spacing(3) }}

              align='center'
            >
              {
                typeof (states.selectedCard) === 'undefined' ?
                  'Cadastrar outro'
                  :
                  'Editar dados'
              }
            </Typography>

            <Grid container>
              <Grid item xs={12} md={6}>
                <Card
                  number={states.cardValues.number}
                  name={states.cardValues.name}
                  expiry={states.cardValues.expiry}
                  cvc={states.cardValues.cvc}
                  focus={states.cardValues.focused}
                  callback={handleCallback}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                  <ControlledTextInput
                    hookForm={["number", methods.control, methods.formState.errors, Rules.requiredText]}
                    label="Número do cartão"
                    placeholder="0000 0000 0000 0000"
                    fullWidth={true}

                    onFocus={handleInputFocus}
                    onChange={handleInputChange}
                  />

                  <ControlledTextInput
                    hookForm={["name", methods.control, methods.formState.errors, Rules.requiredText]}
                    label="Nome impresso"
                    placeholder="Digite o nome impresso no cartão..."
                    fullWidth={true}

                    onFocus={handleInputFocus}
                    onChange={handleInputChange}
                  />

                  <Box sx={{ display: 'flex', width: '100%', }}>

                    <Box>
                      <ControlledTextInput
                        hookForm={["expiry", methods.control, methods.formState.errors, Rules.requiredMonthYear]}
                        label="Validade"
                        placeholder="00/00"
                        fullWidth={true}

                        sx={{ mr: theme.spacing(1), width: '100px' }}

                        onFocus={handleInputFocus}
                        onChange={handleInputChange}
                      />
                    </Box>

                    <ControlledTextInput
                      hookForm={["cvc", methods.control, methods.formState.errors, Rules.requiredCreditCardCvv]}
                      label="CVC"
                      placeholder="000"

                      sx={{ width: '70px', mr: 0 }}

                      onFocus={handleInputFocus}
                      onChange={handleInputChange}
                    />
                  </Box>

                  <Button variant='contained' sx={{ mt: theme.spacing(2) }} type='submit'>
                    {typeof (states.selectedCard) === 'undefined' ? 'Cadastrar novo' : 'Salvar dados'}
                  </Button>

                </Box>
              </Grid>
            </Grid>

          </form>
        </Grid>

        {/* Card list */}
        <Grid item xs={12} md={6}>
          <Typography
            variant='h6'
            component='div'
            color={theme.palette.text.secondary}
            align='center'

            sx={{ fontSize: '2.0rem', mb: theme.spacing(1) }}
          >
            Cartões cadastrados
          </Typography>
          <CardsList cards={states.cards} selectedCard={states.selectedCard} setSelectedCard={states.setSelectedCard} />
        </Grid>
      </Grid>
    </MainContentBox>
  );
};

export default CreditCardSet;