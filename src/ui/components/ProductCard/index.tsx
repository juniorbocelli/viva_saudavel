import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,

  useTheme,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import * as MaskApply from '../../../features/validation/maskApply';
import { Product } from '../../../features/globalContext/types';

interface IProductCardProps {
  product: Product;
  setProduct: React.Dispatch<React.SetStateAction<null | Product>>;
}

const ProductCard: React.FC<IProductCardProps> = ({ product, setProduct }) => {
  const theme = useTheme();

  return (
    <Card sx={{ maxWidth: { xs: 300, md: 220 }, borderWidth: 0 }} variant="outlined" square={true}>
      <CardMedia
        component="img"
        sx={{ height: { xs: 300, md: 220 }, cursor: 'pointer' }}
        image={product.images[0]}
        alt={`Imagem - ${product.name} - ${product.producer}`}
        onClick={() => setProduct(product)}
      />
      <CardContent sx={{ cursor: 'pointer', }} onClick={() => setProduct(product)}>
        {/* Mobile name */}
        <Typography
          gutterBottom variant="h5"
          component="div"
          sx={
            {
              display: {xs: 'block', md: 'none'},
              fontWeight: '500',
              fontSize: { xs: '1.5rem', md: '1.3rem' },
              mb: { xs: theme.spacing(0.5), md: 0 },
              mt: theme.spacing(-0.5)
            }
          }
          color={theme.palette.primary.main}
        >
          {product.name.length < 21 ? product.name : `${product.name.slice(0, 18)}...`}
        </Typography>

        {/* Desktop name */}
        <Typography
          gutterBottom variant="h5"
          component="div"
          sx={
            {
              display: {xs: 'none', md: 'block'},
              fontWeight: '500',
              fontSize: { xs: '1.5rem', md: '1.3rem' },
              mb: { xs: theme.spacing(0.5), md: 0 },
              mt: theme.spacing(-0.5)
            }
          }
          color={theme.palette.primary.main}
        >
          {product.name.length < 17 ? product.name : `${product.name.slice(0, 14)}...`}
        </Typography>

        <Typography
          variant="h6"
          component="div"
          color={theme.palette.primary.light}
          sx={
            {
              mt: theme.spacing(-1),
              p: 0,
              fontSize: { xs: '1.0rem' },
            }
          }
        >
          {product.producer}
        </Typography>

        <Typography
          variant="h5"
          component="div"
          color="text.secondary"
          sx={{ fontWeight: 'bold', mb: 0 }}
        >
          {`R$ ${MaskApply.maskMoney(product.price)}`}
        </Typography>
      </CardContent>
      <CardActions sx={{ mt: theme.spacing(-1) }}>
        <Button
          variant='contained'
          color='secondary'
          size="medium"
          endIcon={<ShoppingCartIcon />}
          sx={{ width: '100%', }}
        >
          Adicionar
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;