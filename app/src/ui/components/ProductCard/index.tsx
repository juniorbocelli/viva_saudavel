import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Menu,
  MenuItem,
  Fade,

  useTheme,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import MaskApply from '../../../features/utils/MaskApply';
import { Product } from '../../../globals/interfaces/product'
import { CartItem } from '../../../globals/interfaces/cart';
import { useGlobalContext } from '../../../features/globalContext/context';

interface IProductCardProps {
  product: Product;
  setProduct: React.Dispatch<React.SetStateAction<null | Product>>;
}

const ProductCard: React.FC<IProductCardProps> = ({ product, setProduct }) => {
  const theme = useTheme();
  const globalContext = useGlobalContext();

  // Menu controller
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (product?: Product, frequency?: CartItem['frequency']) => {
    setAnchorEl(null);

    if (typeof (product) !== 'undefined' && typeof (frequency) !== 'undefined')
      globalContext['cart'].addItem(product, frequency);
  };

  return (
    <Card sx={{ maxWidth: { xs: 300, md: 220 }, borderWidth: 0 }} variant="outlined" square={true}>
      <CardMedia
        component="img"
        sx={{ height: { xs: 300, md: 220 }, cursor: 'pointer' }}
        image={product.thumb}
        alt={`Imagem - ${product.name} - ${product.producer}`}
        onClick={() => setProduct(product)}
      />
      <CardContent sx={{ cursor: 'pointer', }} onClick={() => setProduct(product)}>
        {/* Mobile name */}
        {/* <Typography
          gutterBottom variant="h5"
          component="div"
          sx={
            {
              display: { xs: 'block', md: 'none' },
              fontWeight: '500',
              fontSize: { xs: '1.5rem', md: '1.3rem' },
              mb: { xs: theme.spacing(0.5), md: 0 },
              mt: theme.spacing(-0.5)
            }
          }
          color={theme.palette.primary.main}
        >
          {product.name.length < 21 ? product.name : `${product.name.slice(0, 18)}...`}
        </Typography> */}

        {/* Desktop and mobile name */}
        <Typography
          gutterBottom variant="h5"
          component="div"
          sx={
            {
              fontWeight: '500',
              fontSize: { xs: '1.5rem', md: '1.3rem' },
              mb: { xs: theme.spacing(0.5), md: 0 },
              mt: theme.spacing(-0.5),
              textOverflow: 'ellipsis',
            }
          }
          color={theme.palette.primary.main}
          noWrap
        >
          {product.name}
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
          id={`fade-button-${product.id}`}
          aria-controls={open ? `fade-menu-${product.id}` : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}

          variant='contained'
          color='secondary'
          size="medium"
          endIcon={<ShoppingCartIcon />}
          sx={{ width: '100%', }}
        >
          Adicionar
        </Button>

        <Menu
          id={`fade-menu-${product.id}`}
          MenuListProps={
            {
              'aria-labelledby': `fade-button-${product.id}`,
            }
          }
          anchorEl={anchorEl}
          open={open}
          onClose={() => handleClose()}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={() => handleClose(product, 'once')}>Uma vez</MenuItem>
          <MenuItem onClick={() => handleClose(product, 'weekly')}>Semanal</MenuItem>
          <MenuItem onClick={() => handleClose(product, 'biweekly')}>Quinzenal</MenuItem>
          <MenuItem onClick={() => handleClose(product, 'monthly')}>Mensal</MenuItem>
        </Menu>
      </CardActions>
    </Card>
  );
};

export default ProductCard;