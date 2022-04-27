import React from 'react';
import {
  Box,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';

import MainContentBox from '../../ui/components/pages/MainContentBox';
import ProductCard from '../../ui/components/ProductCard';
import ProductModal from '../../ui/components/ProductModal';

import useAPIs from '../../services/products/apis';
import useStates from './states';
import { Filter } from '../../globals/interfaces/product';

const Producer: React.FC<React.ReactFragment> = () => {
  const states = useStates();
  const params = useParams();
  const apis = useAPIs();

  const getProducerName = (producerName: Filter['producerCode']): string => {
    switch (producerName) {
      case 'agua-na-caixa':
        return "Água na Caixa";

      case 'aviacao':
        return "Aviação";

      case 'beta-mel':
        return "Beta Mel";

      case 'bufala-almeida-prado':
        return "Búfala Almeida Prado";

      case 'capril-do-bosque':
        return "Capril do Bosque";

      case 'fazenda-do-bem':
        return "Fazenda do Bem";

      case 'goldy':
        return "Goldy";

      case 'jaguacy':
        return "Jaguacy";

      case 'keiff':
        return "Keiff";

      case 'la-ferme-moderne':
        return "La Ferme Moderne";

      case 'letti':
        return "Letti A²";

      case 'mister-rabbit':
        return "Mister Rabbit";

      case 'naturegg':
        return "Naturegg";

      case 'pardinho-artesanal':
        return "Pardinho Artesanal";

      case 'piracanjuba':
        return "Piracanjuba";

      case 'ralston':
        return "Ralston";

      case 'urakami':
        return "Urakami";

      case 'verde-campo':
        return "Verde Campo";

      case 'villa-piva':
        return "Villa Piva";

      case 'xando':
        return "Xandô";

      case 'yorgus':
        return "Yorgus";

      default:
        return "Catgoria não especificada";
    };
  };

  React.useEffect(() => {
    if (typeof (params) !== 'undefined')
      states.setProducts(apis.getProductsByProducer(params.producer as Filter['producerCode']));
  }, [params]);

  return (
    <MainContentBox primary={`Produtos de: ${getProducerName(params.producer as Filter['producerCode'])}`}>
      <ProductModal product={states.selectedProduct} setProduct={states.setSelectedProduct} />

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

        <Typography variant='h6' component='div' color='text.secondary'>
          Ainda não há produtos cadastrados para esta marca
        </Typography>

        }
      </div>

    </MainContentBox>
  );
};

export default Producer;