import React from 'react';
import { Box, SxProps } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';

import SelectInput from '../../../../ui/components/form/SelectInput';
import { requiredSelect } from '../../../../features/validation/rules';
import { ProductProducerCode } from '../../../../features/globalContext/types_new';
import { ProductFormData } from '../types';

interface IProducerSelectProps {
  methods: UseFormReturn<ProductFormData>;
  sx?: SxProps;
};

type Option = {
  label: string;
  value: ProductProducerCode;
}
const options: Array<Option> = [
  { label: 'Aviação', value: 'aviacao' },
  { label: 'Água na Caixa', value: 'agua-na-caixa' },
  { label: 'Beta Mel', value: 'beta-mel' },
  { label: 'Búfala Almeida Prado', value: 'bufala-almeida-prado' },
  { label: 'Capril do Bosque', value: 'capril-do-bosque' },
  { label: 'Fazenda do Bem', value: 'fazenda-do-bem' },
  { label: 'Goldy', value: 'goldy' },
  { label: 'Jaguacy', value: 'jaguacy' },
  { label: 'Keiff', value: 'keiff' },
  { label: 'Letti A²', value: 'letti' },
  { label: 'La Ferme Moderne', value: 'la-ferme-moderne' },
];

const ProducerSelect: React.FC<IProducerSelectProps> = ({ methods, sx }) => {
  return (
    <Box sx={sx}>
      <SelectInput
        label='Produtor'
        hookForm={["producerCode", methods.control, methods.formState.errors, requiredSelect]}
        options={options}
      />
    </Box>
  );
};

export default ProducerSelect;