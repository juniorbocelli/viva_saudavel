import React from 'react';
import { Box, SxProps } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';

import SelectInput from '../../../../ui/components/form/SelectInput';
import { requiredSelect } from '../../../../features/validation/rules';
import { ProductProducerCode } from '../../../../globals/interfaces/product';
import { ProductFormData } from '../types';

interface IProducerSelectProps {
  methods: UseFormReturn<ProductFormData>;
  sx?: SxProps;
};

type Option = {
  label: string;
  value: ProductProducerCode | ' ';
}
const options: Array<Option> = [
  { label: 'Código do Produtor...', value: ' ' },
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
  { label: 'Mister Rabbit', value: 'mister-rabbit' },
  { label: 'Naturegg', value: 'naturegg' },
  { label: 'Pardinho Artesanal', value: 'pardinho-artesanal' },
  { label: 'Piracanjuba', value: 'piracanjuba' },
  { label: 'Ralston', value: 'ralston' },
  { label: 'Urakami', value: 'urakami' },
  { label: 'Verde Campo', value: 'verde-campo' },
  { label: 'Villa Piva', value: 'villa-piva' },
  { label: 'Xandô', value: 'xando' },
  { label: 'Yorgus', value: 'yorgus' },
  { label: 'Sadia', value: 'sadia' },
  { label: 'Seara', value: 'seara' },
  { label: 'Perdigão', value: 'perdigao' },
  { label: 'Figueiras', value: 'figueiras' },
  { label: 'President', value: 'president' },
  { label: 'Ceratti', value: 'ceratti' },
  { label: 'Haciendas', value: 'haciendas' },
];

const ProducerSelect: React.FC<IProducerSelectProps> = ({ methods, sx }) => {
  return (
    <Box sx={sx}>
      <SelectInput
        label='Código do Produtor'
        hookForm={["producerCode", methods.control, methods.formState.errors, requiredSelect]}
        options={options}
      />
    </Box>
  );
};

export default ProducerSelect;