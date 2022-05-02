import React from 'react';
import {
  Box,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';

import MainContentBox from '../../ui/components/pages/MainContentBox';
import ProductCard from '../../ui/components/ProductCard';
import ProductModal from '../../ui/components/ProductModal';


import useStates from './states';
import useAPIs from './apis';
import useEffects from './effects';
import { FilterSearch, Filter } from '../../globals/interfaces/product';

const Category: React.FC<React.ReactFragment> = () => {
  const states = useStates();
  const params = useParams();
  const apis = useAPIs(states);
  const effects = useEffects(apis);

  effects.useComponentDidMount({ category: params.category as FilterSearch['category'] });

  const getCategoryName = (categoryName: Filter['category']): string => {
    switch (categoryName) {
      case 'leite-e-derivados':
        return "Leite e Derivados";

      case 'queijos':
        return "Queijos";

      case 'frios':
        return "Frios";

      case 'hortifruti':
        return "Hortifruti";

      case 'bebidas':
        return "Bebidas";

      case 'doces-e-geleias':
        return "Doces e Geléias";

      default:
        return "Categoria não especificada";
    };
  };

  return (
    <MainContentBox primary={getCategoryName(params.category as Filter['category'])} states={states}>
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
              Ainda não há produtos cadastrados nesta categoria
        </Typography>

        }
      </div>

    </MainContentBox>
  );
};

export default Category;