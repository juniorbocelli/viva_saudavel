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

import useStates from './states';
import useAPIs from './apis';
import { useAuth } from '../../../features/auth/context';
import { CreditCardFormData } from './types';
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
  }, [states.selectedCard]);

  const handleSubmit = (data: CreditCardFormData) => {
    const dateParts = data.expiryDate.split('/')
    const creditCard: CreditCard = {
      number: data.number.split(' '),
      name: data.name,
      expiryDate: new Date(parseInt(dateParts[1]), parseInt(dateParts[0]), 1),
      brand: data.brand,
      cvv: data.cvv,
    };

    if (typeof (states.selectedCard) === 'undefined')
      apis.newCreditCard(auth.loggedClient?.id!, creditCard);
  };

  return (
    <MainContentBox states={states} isLoggedIn={true} primary='Cartão de Crédito'>
      <Grid container spacing={2}>
        {/* Form  */}
        <Grid item xs={12} md={6}>
          <form onSubmit={methods.handleSubmit(handleSubmit)}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>

              <Typography
                variant='h6'
                component='div'
                color={theme.palette.text.secondary}

                sx={{ fontSize: '2.0rem', m: 0 }}
              >
                {
                  typeof (states.selectedCard) === 'undefined' ?
                    'Cadastrar outro'
                    :
                    'Editar dados'
                }
              </Typography>

              <ControlledTextInput
                hookForm={["number", methods.control, methods.formState.errors, Rules.requiredCreditCard]}
                label="Número do cartão"
                placeholder="0000 0000 0000 0000"
                fullWidth={true}
                mask={React.forwardRef((props, ref) => Masks.TextMaskCreditCard({ ...props, ...ref }))}
              />

              <ControlledTextInput
                hookForm={["name", methods.control, methods.formState.errors, Rules.requiredText]}
                label="Nome impresso"
                placeholder="Digite o nome impresso no cartão..."
                fullWidth={true}
              />

              <Box sx={{ display: 'flex', width: '100%', }}>

                <Box>
                  <ControlledTextInput
                    hookForm={["expiryDate", methods.control, methods.formState.errors, Rules.requiredMonthYear]}
                    label="Validade"
                    placeholder="00/0000"
                    fullWidth={true}
                    mask={React.forwardRef((props, ref) => Masks.TextMaskCompetence({ ...props, ...ref }))}

                    sx={{ mr: theme.spacing(1), width: '100px' }}
                  />
                </Box>

                <BrandCardSelect methods={methods} sx={{ flexGrow: 1, mt: '16px' }} />
              </Box>

              <Box sx={{ width: '100%', }}>
                <ControlledTextInput
                  hookForm={["cvv", methods.control, methods.formState.errors, Rules.requiredCreditCardCvv]}
                  label="CVV"
                  placeholder="000"
                  mask={React.forwardRef((props, ref) => Masks.TextMaskCreditCardCvv({ ...props, ...ref }))}

                  sx={{ width: '70px', mr: 0 }}
                />
              </Box>

              <Button variant='contained' sx={{ mt: theme.spacing(2) }} type='submit'>
                {typeof (states.selectedCard) === 'undefined' ? 'Cadastrar novo' : 'Salvar dados'}
              </Button>
            </Box>
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