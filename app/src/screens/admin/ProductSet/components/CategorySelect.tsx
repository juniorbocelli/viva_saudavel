import React from 'react';
import { Box, SxProps } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';

import SelectInput from '../../../../ui/components/form/SelectInput';
import { requiredSelect } from '../../../../features/validation/rules';
import { ProductCategory } from '../../../../globals/interfaces/product';
import { ProductFormData } from '../types';

interface ICategorySelectProps {
  methods: UseFormReturn<ProductFormData>;
  sx?: SxProps;
};

type Option = {
  label: string;
  value: ProductCategory | ' ';
}
const options: Array<Option> = [
  { label: 'Categoria...', value: ' ' },
  { label: 'Leite e Derivados', value: 'leite-e-derivados' },
  { label: 'Queijos', value: 'queijos' },
  { label: 'Frios', value: 'frios' },
  { label: 'Hortifruti', value: 'hortifruti' },
  { label: 'Bebidas', value: 'bebidas' },
  { label: 'Doces e Geléias', value: 'doces-e-geleias' },
];

const CategorySelect: React.FC<ICategorySelectProps> = ({ methods, sx }) => {
  return (
    <Box sx={sx}>
      <SelectInput
        label='Categoria'
        hookForm={["category", methods.control, methods.formState.errors, requiredSelect]}
        options={options}
      />
    </Box>
  );
};

export default CategorySelect;