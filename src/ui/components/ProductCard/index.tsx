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
    <Card sx={{ maxWidth: { xs: 300, md: 200 }, borderWidth: 0 }} variant="outlined" square={true}>
      <CardMedia
        component="img"
        sx={{ height: { xs: 300, md: 200 }, cursor: 'pointer' }}
        image={product.images[0]}
        alt={`Imagem - ${product.name} - ${product.producer}`}
        onClick={() => setProduct(product)}
      />
      <CardContent sx={{ cursor: 'pointer', }} onClick={() => setProduct(product)}>
        <Typography
          gutterBottom variant="h5"
          component="div"
          sx={{ fontWeight: 'bold', m: 0, mt: theme.spacing(-1) }}
          color={theme.palette.primary.main}
        >
          {product.name}
        </Typography>
        <Typography
          variant="h6"
          component="div"
          color={theme.palette.primary.light}
          sx={{ mt: theme.spacing(-1), p: 0 }}
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