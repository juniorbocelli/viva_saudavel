import React from 'react';
import {
  Box,
  Button,
  Grid,

  useTheme,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import MainContentBox from '../../../ui/components/pages/MainContentBox';
import ControlledTextInput from '../../../ui/components/form/ControlledTextInput';
import SelectInput from '../../../ui/components/form/SelectInput';

import useStates from './states';
import useAPIs from './apis';
import { CreditCardFormData } from './types';
import * as Rules from '../../../features/validation/rules';
import * as Masks from '../../../features/validation/masks';

const CreditCardSet: React.FC<React.ReactFragment> = () => {
  const states = useStates();
  const apis = useAPIs(states);
  const theme = useTheme();
  const navigate = useNavigate();
  const methods = useForm<CreditCardFormData>({ mode: 'onBlur', reValidateMode: 'onBlur' });

  const handleSubmit = () => {

  };

  return (
    <MainContentBox states={states} isLoggedIn={true} primary='Cartão de Crédito'>
      <Grid container>
        {/* Form  */}
        <Grid item>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <form onSubmit={methods.handleSubmit(handleSubmit)}>
              <ControlledTextInput
                hookForm={["number", methods.control, methods.formState.errors, Rules.requiredText]}
                label="Número do cartão"
                placeholder="0000 0000 0000 0000"
                fullWidth={true}
                mask={React.forwardRef((props, ref) => Masks.TextMaskCreditCard({ ...props, ...ref }))}

                sx={{}}
              />

              <ControlledTextInput
                hookForm={["name", methods.control, methods.formState.errors, Rules.requiredText]}
                label="Nome impresso"
                placeholder="Nome impreso no cartão"
                fullWidth={true}
                mask={React.forwardRef((props, ref) => Masks.TextMaskCreditCard({ ...props, ...ref }))}
              />
            </form>
          </Box>
        </Grid>

        {/* Card list */}
        <Grid item>

        </Grid>
      </Grid>
    </MainContentBox>
  );
};

export default CreditCardSet;