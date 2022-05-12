import React from 'react';
import { Box, SxProps } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';

import { CreditCardFormData } from '../types';
import { requiredText } from '../../../../features/validation/rules';
import SelectInput from '../../../../ui/components/form/SelectInput';

import mastercardIcon from '../../../../assets/images/payment-methods/mastercard.svg';
import visaIcon from '../../../../assets/images/payment-methods/visa.svg';
import eloIcon from '../../../../assets/images/payment-methods/elo.svg';
import americanExpressIcon from '../../../../assets/images/payment-methods/american-express.svg';

import hipercardIcon from '../../../../assets/images/payment-methods/hipercard.svg';
import jcbIcon from '../../../../assets/images/payment-methods/jcb.svg';
import discoverIcon from '../../../../assets/images/payment-methods/discover.svg';
import dinersIcon from '../../../../assets/images/payment-methods/diners.svg';

interface IOptionLabel {
  name: string;
  icon: string;
};

const OptionLabel: React.FC<IOptionLabel> = ({ name, icon }) => {
  return (
    <Box sx=
      {
        {
          fontSize: '1.3rem',
          display: 'flex',
          marginRight: '15px',
        }
      }
    >
      <img src={icon} width='30px' style={{ marginRight: '5px' }} /> {name}
    </Box>);
};


interface IBrandCardSelectProps {
  methods: UseFormReturn<CreditCardFormData>;
  sx?: SxProps;
};

type Option = {
  label: any;
  value: string;
}
const options: Array<Option> = [
  { label: 'Bandeira do cartão...', value: ' ' },
  { label: <OptionLabel name='Mastercard' icon={mastercardIcon} />, value: 'mastercard' },
  { label: <OptionLabel name='VISA' icon={visaIcon} />, value: 'visa' },
  { label: <OptionLabel name='ELO' icon={eloIcon} />, value: 'elo' },
  { label: <OptionLabel name='American Express' icon={americanExpressIcon} />, value: 'americanExpress' },
  { label: <OptionLabel name='Hipercard' icon={hipercardIcon} />, value: 'hipercard' },
  { label: <OptionLabel name='JCB' icon={jcbIcon} />, value: 'jcb' },
  { label: <OptionLabel name='Discover' icon={discoverIcon} />, value: 'discover' },
  { label: <OptionLabel name='Diners' icon={dinersIcon} />, value: 'diners' },
];

const BrandCardSelect: React.FC<IBrandCardSelectProps> = ({ methods, sx }) => {

  return (
    <Box sx={sx}>
      <SelectInput
        label='Bandeira do cartão'
        hookForm={["brand", methods.control, methods.formState.errors, requiredText]}
        options={options}
      />
    </Box>
  );
};

export default BrandCardSelect;