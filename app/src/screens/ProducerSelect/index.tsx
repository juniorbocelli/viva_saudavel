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
import { Filter } from '../../features/globalContext/types';

const ProducerSelect: React.FC<React.ReactFragment> = () => {
  const states = useStates();
  const apis = useAPIs();
  const theme = useTheme();

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
    if (states.selectedProducer !== '')
      states.setProducts(apis.getProductsByProducer(states.selectedProducer));
  }, [states.selectedProducer]);

  React.useEffect(() => {
  }, [states.products])

  const handleChangeProducer = (event: SelectChangeEvent) => {
    states.setSelectedProducer(event.target.value as Filter['producerCode']);
  };

  return (
    <MainContentBox primary={states.selectedProducer ? `Produtos de: ${getProducerName(states.selectedProducer)}` : `Selecione uma Marca`}>
      <ProductModal product={states.selectedProduct} setProduct={states.setSelectedProduct} />

      <FormControl fullWidth sx={{ mb: theme.spacing(1) }}>
        <InputLabel id="demo-simple-select-label">Marca</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={states.selectedProducer}
          label="Marca"
          onChange={handleChangeProducer}
        >
          <MenuItem value='aviacao'>Aviação</MenuItem>
          <MenuItem value='agua-na-caixa'>Água na Caixa</MenuItem>
          <MenuItem value='beta-mel'>Beta Mel</MenuItem>
          <MenuItem value='bufala-almeida-prado'>Búfala Almeida Prado</MenuItem>
          <MenuItem value='capril-do-bosque'>Capril do Bosque</MenuItem>
          <MenuItem value='fazenda-do-bem'>Fazenda do Bem</MenuItem>
          <MenuItem value='goldy'>Goldy</MenuItem>
          <MenuItem value='jaguacy'>Jaguacy</MenuItem>
          <MenuItem value='keiff'>Keiff</MenuItem>
          <MenuItem value='letti'>Letti A²</MenuItem>
          <MenuItem value='la-ferme-moderne'>La Ferme Moderne</MenuItem>
          <MenuItem value='mister-rabbit'>Mister Rabbit</MenuItem>
          <MenuItem value='naturegg'>Naturegg</MenuItem>
          <MenuItem value='pardinho-artesanal'>Pardinho Artesanal</MenuItem>
          <MenuItem value='piracanjuba'>Piracanjuba</MenuItem>
          <MenuItem value='ralston'>Ralston</MenuItem>
          <MenuItem value='urakami'>Urakami</MenuItem>
          <MenuItem value='verde-campo'>Verde Campo</MenuItem>
          <MenuItem value='villa-piva'>Villa Piva</MenuItem>
          <MenuItem value='xando'>Xandô</MenuItem>
          <MenuItem value='yorgus'>Yorgus</MenuItem>
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
            states.selectedProducer !== '' &&
            <Typography variant='h6' component='div' color='text.secondary'>
              Ainda não há produtos cadastrados para esta marca
            </Typography>

        }
      </div>

    </MainContentBox>
  );
};

export default ProducerSelect;