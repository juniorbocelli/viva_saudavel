import React from 'react';
import {
  Box,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';

import MainContentBox from '../../ui/components/pages/MainContentBox';
import ProductCard from '../../ui/components/ProductCard';
import ProductModal from '../../ui/components/ProductModal';

import { FilterCodes, FilterSearch } from '../../globals/interfaces/product';
import useStates from './states';
import useAPIs from './apis';
import useEffects from './effects';

const Filter: React.FC<React.ReactFragment> = () => {
  const states = useStates();
  const apis = useAPIs(states);
  const effects = useEffects(apis);
  const params = useParams();

  if (typeof (params.filter) !== 'undefined')
    effects.useComponentDidMount({ [params.filter]: true as FilterSearch })

  const getFilterName = (filterName: FilterCodes): string => {
    switch (filterName) {
      case 'a2a2':
        return "A2A2";

      case 'sem-gluten':
        return "Sem Glúten";

      case 'kosher':
        return "Kosher";

      case 'sem-lactose':
        return "Sem Lactose";

      case 'natural':
        return "Natural";

      case 'sem-adicao-de-acucar':
        return "Sem adição de açúcar";

      default:
        return "Catgoria não especificada";
    };
  };

  return (
    <MainContentBox primary={`Filtrado por: ${getFilterName(params.filter as FilterCodes)}`}>
      <ProductModal product={states.selectedProduct} setProduct={states.setSelectedProduct} />

      <div style={{ width: '100%' }}>
        {
          states.cards.length > 0 ?
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
                states.cards.map((item, key) => {
                  return <ProductCard productCard={item} setProduct={states.setSelectedProduct} key={key} />;
                })
              }
            </Box>

            :

            <Typography variant='h6' component='div' color='text.secondary'>
              Ainda não há produtos deste tipo cadastrados
            </Typography>

        }
      </div>

    </MainContentBox>
  );
};

export default Filter;