import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Menu,
  Fade,
  MenuItem,

  useTheme,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import MaskApply from '../../../features/utils/MaskApply';
import { CartItem } from '../../../globals/interfaces/cart';
import { IProductCardProps } from './types';
import { useAuth } from '../../../features/auth/context';
import LocalStorage from '../../../features/storage/LocalStorage';
import { useGlobalContext } from '../../../features/globalContext/context';

import useAPIs from './apis';

const ProductCard: React.FC<IProductCardProps> = ({ productCard, setProduct }) => {
  const theme = useTheme();
  const apis = useAPIs(setProduct);
  const auth = useAuth();
  const globalContext = useGlobalContext();

  // Menu controller
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (productId?: CartItem['productId'], frequency?: CartItem['frequency']) => {
    setAnchorEl(null);

    if (typeof (productId) !== 'undefined' && typeof (frequency) !== 'undefined')
      globalContext['cart'].addItem(auth.loggedClient?.id || LocalStorage.getCartKey(), productId, frequency);
  };

  return (
    <Card sx={{ maxWidth: { xs: 300, md: 220 }, borderWidth: 0 }} variant="outlined" square={true}>
      <CardMedia
        component="img"
        sx={{ height: { xs: 300, md: 220 }, cursor: 'pointer' }}
        image={productCard.thumb}
        alt={`Imagem - ${productCard.name} - ${productCard.producer}`}
        onClick={() => apis.getProduct(productCard.id)}
      />
      <CardContent sx={{ cursor: 'pointer', }} onClick={() => apis.getProduct(productCard.id)}>
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
          {productCard.name}
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
          {productCard.producer}
        </Typography>

        <Typography
          variant="h5"
          component="div"
          color="text.secondary"
          sx={{ fontWeight: 'bold', mb: 0 }}
        >
          {`R$ ${MaskApply.maskMoney(productCard.price)}`}
        </Typography>
      </CardContent>
      <CardActions sx={{ mt: theme.spacing(-1) }}>
        <Button
          id={`fade-button-${productCard.id}`}
          aria-controls={open ? `fade-menu-${productCard.id}` : undefined}
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
          id={`fade-menu-${productCard.id}`}
          MenuListProps={
            {
              'aria-labelledby': `fade-button-${productCard.id}`,
            }
          }
          anchorEl={anchorEl}
          open={open}
          onClose={() => handleClose()}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={() => handleClose(productCard.id, 'once')}>Uma vez</MenuItem>
          <MenuItem onClick={() => handleClose(productCard.id, 'weekly')}>Semanal</MenuItem>
          <MenuItem onClick={() => handleClose(productCard.id, 'biweekly')}>Quinzenal</MenuItem>
          <MenuItem onClick={() => handleClose(productCard.id, 'monthly')}>Mensal</MenuItem>
        </Menu>
      </CardActions>
    </Card>
  );
};

export default ProductCard;