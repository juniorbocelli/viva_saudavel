import React from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,

  useTheme,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import MainContentBox from '../../ui/components/pages/MainContentBox';
import ProductCard from '../../ui/components/ProductCard';
import ProductModal from '../../ui/components/ProductModal';

import useAPIs from '../../services/products/apis';
import useStates from './states';
import { FilterCodes } from '../../services/products/apis';

const FilterSelect: React.FC<React.ReactFragment> = () => {
  const states = useStates();
  const apis = useAPIs();
  const theme = useTheme();

  const getFilterName = (filterName: FilterCodes): string => {
    switch (filterName) {
      case 'a2a2':
        return "A2A2";

      case 'kosher':
        return "Kosher";

      case 'natural':
        return "Natural";

      case 'sem-adicao-de-acucar':
        return "Sem Adição de Açúcar";

      case 'sem-gluten':
        return "Sem Glúten";

      case 'sem-lactose':
        return "Sem Lactose";

      default:
        return "Catgoria não especificada";
    };
  };

  React.useEffect(() => {
    if (states.selectedFilter !== '')
      states.setProducts(apis.getProductByFilter(states.selectedFilter));
  }, [states.selectedFilter]);

  const handleChangeFilter = (event: SelectChangeEvent) => {
    states.setSelectedFilter(event.target.value as FilterCodes);
  };

  return (
    <MainContentBox primary={states.selectedFilter ? `Filtro de: ${getFilterName(states.selectedFilter)}` : `Selecione um Filtro`}>
      <ProductModal product={states.selectedProduct} setProduct={states.setSelectedProduct} />

      <FormControl fullWidth sx={{ mb: theme.spacing(1) }}>
        <InputLabel id="demo-simple-select-label">Filtro</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={states.selectedFilter}
          label="Filtro"
          onChange={handleChangeFilter}
        >
          <MenuItem value='a2a2'>A2A2</MenuItem>
          <MenuItem value='kosher'>Kosher</MenuItem>
          <MenuItem value='sem-lactose'>Sem Lactose</MenuItem>
          <MenuItem value='sem-gluten'>Sem Glúten</MenuItem>
          <MenuItem value='sem-adicao-de-acucar'>Sem Adição de Açúcar</MenuItem>
        </Select>
      </FormControl>

      <div style={{ width: '100%' }}>
        {
          states.products.length > 0 ?
            <Box
              sx={
                {
                  display: 'grid',
                  gap: 1,
                  gridTemplateColumns: {
                    xs: 'repeat(2, 1fr)', // 0
                    sm: 'repeat(2, 1fr)', // 600
                    md: 'repeat(3, 1fr)', // 900
                    lg: 'repeat(4, 1fr)', // 1200
                    xl: 'repeat(5, 1fr)', // 1536
                  },
                }
              }
            >
              {
                states.products.map((item, key) => {
                  return <ProductCard product={item} setProduct={states.setSelectedProduct} key={key} />;
                })
              }
            </Box>

            :
            states.selectedFilter !== '' &&
            <Typography variant='h6' component='div' color='text.secondary'>
              Ainda não há produtos cadastrados para este filtro
            </Typography>

        }
      </div>

    </MainContentBox>
  );
};

export default FilterSelect;