import React from 'react';
import { Box, SxProps } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';

import SelectInput from '../../../../ui/components/form/SelectInput';
import { requiredSelect } from '../../../../features/validation/rules';
import { CheckoutFormData, } from '../types';
import { WeekDaysName } from '../../../../globals/interfaces/dateTime';

import DELIVERY_SETTING from '../../../../globals/settings/delivery.json';

interface IDeliveryDaySelectProps {
  methods: UseFormReturn<CheckoutFormData>;
  sx?: SxProps;
};

type Option = {
  label: string;
  value: WeekDaysName | ' ';
};
let options: Array<Option> = [
  { label: 'Dia da entrega...', value: ' ' },
  { label: 'Segunda-feira', value: 'monday' },
  { label: 'Terça-feira', value: 'tuesday' },
  { label: 'Quarta-feira', value: 'wednesday' },
  { label: 'Quinta-feira', value: 'thursday' },
  { label: 'Sexta-feira', value: 'friday' },

];

if (DELIVERY_SETTING.isDeliveryInWeekends) {
  options = [options[0], { label: 'Domingo', value: 'sunday' }, ...options.splice(1, 5)];
  options.push({ label: 'Sábado', value: 'saturday' },);
};

const DeliveryDaySelect: React.FC<IDeliveryDaySelectProps> = ({ methods, sx }) => {
  return (
    <Box sx={sx}>
      <SelectInput
        label='Dia de entrega'
        hookForm={["deliveryDay", methods.control, methods.formState.errors, requiredSelect]}
        options={options}
      />
    </Box>
  );
};

export default DeliveryDaySelect;