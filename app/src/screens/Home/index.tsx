import React from 'react';
import {
  Typography,

  useTheme,
} from '@mui/material';

import MainContentBox from '../../ui/components/pages/MainContentBox';
import ProductGallery from '../../ui/components/ProductGallery';
import ProductModal from '../../ui/components/ProductModal';

import useStates from './states';
import useAPIs from './apis';
import useEffects from './effects';

const Home: React.FC<React.ReactFragment> = (props) => {
  const states = useStates();
  const apis = useAPIs(states);
  const effects = useEffects(apis);
  const theme = useTheme();

  effects.useComponentDidMount();

  return (
    <MainContentBox states={states}>
      <ProductModal product={states.selectedProduct} setProduct={states.setSelectedProduct} />

      {/* Leite e derivados Gallery */}
      <Typography
        variant='h3'
        component='div'
        color='primary'

        sx={
          {
            fontSize: { xs: '1.6rem', md: '2.6rem' },
            ml: { md: theme.spacing(2) },
            mb: { xs: theme.spacing(1.0), md: theme.spacing(2) },
          }
        }
      >
        Leite e Derivados
      </Typography>
      <ProductGallery productCards={states.leiteEDerivados} setProduct={states.setSelectedProduct} />

      {/* Queijos Gallery */}
      <Typography
        variant='h3'
        component='div'
        color='primary'

        sx={
          {
            fontSize: { xs: '1.6rem', md: '2.6rem' },
            mt: { xs: theme.spacing(1.0), md: theme.spacing(2) },
            ml: { md: theme.spacing(2) },
            mb: { xs: theme.spacing(1.0), md: theme.spacing(2) },
          }
        }
      >
        Queijos
      </Typography>
      <ProductGallery productCards={states.queijos} setProduct={states.setSelectedProduct} />

      {/* Frios Gallery */}
      <Typography
        variant='h3'
        component='div'
        color='primary'

        sx={
          {
            fontSize: { xs: '1.6rem', md: '2.6rem' },
            mt: { xs: theme.spacing(1.0), md: theme.spacing(2) },
            ml: { md: theme.spacing(2) },
            mb: { xs: theme.spacing(1.0), md: theme.spacing(2) },
          }
        }
      >
        Frios
      </Typography>
      <ProductGallery productCards={states.frios} setProduct={states.setSelectedProduct} />

      {/* Hortifruti Gallery */}
      <Typography
        variant='h3'
        component='div'
        color='primary'

        sx={
          {
            fontSize: { xs: '1.6rem', md: '2.6rem' },
            mt: { xs: theme.spacing(1.0), md: theme.spacing(2) },
            ml: { md: theme.spacing(2) },
            mb: { xs: theme.spacing(1.0), md: theme.spacing(2) },
          }
        }
      >
        Hortifruti
      </Typography>
      <ProductGallery productCards={states.hortifruti} setProduct={states.setSelectedProduct} />

      {/* Bebidas Gallery */}
      <Typography
        variant='h3'
        component='div'
        color='primary'

        sx={
          {
            fontSize: { xs: '1.6rem', md: '2.6rem' },
            mt: { xs: theme.spacing(1.0), md: theme.spacing(2) },
            ml: { md: theme.spacing(2) },
            mb: { xs: theme.spacing(1.0), md: theme.spacing(2) },
          }
        }
      >
        Bebidas
      </Typography>
      <ProductGallery productCards={states.bebidas} setProduct={states.setSelectedProduct} />


      {/* Doces e Geléias Gallery */}
      <Typography
        variant='h3'
        component='div'
        color='primary'

        sx={
          {
            fontSize: { xs: '1.6rem', md: '2.6rem' },
            mt: { xs: theme.spacing(1.0), md: theme.spacing(2) },
            ml: { md: theme.spacing(2) },
            mb: { xs: theme.spacing(1.0), md: theme.spacing(2) },
          }
        }
      >
        Doces e Geléias
      </Typography>
      <ProductGallery productCards={states.docesEGeleias} setProduct={states.setSelectedProduct} />
    </MainContentBox >
  );
};

export default Home;