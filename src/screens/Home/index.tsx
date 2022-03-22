import React from 'react';
import {
  Typography,

  useTheme,
} from '@mui/material';

import MainContentBox from '../../ui/components/pages/MainContentBox';
import ProductGallery from '../../ui/components/ProductGallery';
import ProductModal from '../../ui/components/ProductModal';

import useAPIs from '../../services/products/apis';

import useStates from './states';

const Home: React.FC<React.ReactFragment> = (props) => {
  const states = useStates();
  const apis = useAPIs();
  const theme = useTheme();

  React.useEffect(() => {
    states.setLeiteEDerivados(apis.getProductsByCategory('leite-e-derivados'));
    states.setQueijos(apis.getProductsByCategory('queijos'));
    states.setHortifruti(apis.getProductsByCategory('hortifruti'));
    states.setBebidas(apis.getProductsByCategory('bebidas'));
    states.setDocesEGeleias(apis.getProductsByCategory('doces-e-geleias'));
  }, []);

  return (
    <MainContentBox>
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
      <ProductGallery products={states.leiteEDerivados} setProduct={states.setSelectedProduct} />

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
      <ProductGallery products={states.queijos} setProduct={states.setSelectedProduct} />

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
      <ProductGallery products={states.hortifruti} setProduct={states.setSelectedProduct} />

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
      <ProductGallery products={states.bebidas} setProduct={states.setSelectedProduct} />


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
      <ProductGallery products={states.docesEGeleias} setProduct={states.setSelectedProduct} />
    </MainContentBox >
  );
};

export default Home;