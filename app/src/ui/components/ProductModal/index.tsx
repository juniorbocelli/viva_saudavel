import React from 'react';
import {
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  Grid,
  Box,
  Menu,
  MenuItem,

  Fade,

  useTheme,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { TransitionProps } from '@mui/material/transitions';

import MaskApply from '../../../features/utils/MaskApply';
import { Product } from '../../../globals/interfaces/product';
import { CartItem } from '../../../globals/interfaces/cart';

import isA2A2 from '../../../assets/images/product-categories-icons/a2a2.svg';
import isGlutenFree from '../../../assets/images/product-categories-icons/glutenFree.svg';
import isKosher from '../../../assets/images/product-categories-icons/kosher.svg';
import isLactoseFree from '../../../assets/images/product-categories-icons/lactoseFree.svg';
import isSugarFree from '../../../assets/images/product-categories-icons/sugarFree.svg';
import isNatural from '../../../assets/images/product-categories-icons/natural.svg';

import ProductImageGallery from '../../../ui/components/ProductImageGallery';

import { useAuth } from '../../../features/auth/context';
import LocalStorage from '../../../features/storage/LocalStorage';
import { useGlobalContext } from '../../../features/globalContext/context';

const Filters: React.FC<Product | null> = (product) => {
  return (
    <Box sx={{ display: 'flex' }}>
      {
        product?.filters.isKosher &&
        <IconButton
          sx={
            {
              width: { xs: 65, md: 80 },
              mr: { xs: '-10px' },
              ml: '-10px'
            }
          }
        >

          <img src={isKosher} alt="Filtro de produtos kosher" />
        </IconButton>
      }

      {
        product?.filters.isA2A2 &&
        <IconButton
          sx={
            {
              width: { xs: 65, md: 80 },
              mr: { xs: '-10px' },
            }
          }
        >

          <img src={isA2A2} alt="Filtro de produtos A2A2" />
        </IconButton>
      }

      {
        product?.filters.isGlutenFree &&
        <IconButton
          sx={
            {
              width: { xs: 65, md: 80 },
              mr: { xs: '-10px' },
            }
          }
        >

          <img src={isGlutenFree} alt="Filtro de produtos sem glúten" />
        </IconButton>
      }

      {
        product?.filters.isLactoseFree &&
        <IconButton
          sx={
            {
              width: { xs: 65, md: 80 },
              mr: { xs: '-10px' },
            }
          }
        >

          <img src={isLactoseFree} alt="Filtro de produtos sem lactose" />
        </IconButton>
      }

      {
        product?.filters.isSugarFree &&
        <IconButton
          sx={
            {
              width: { xs: 65, md: 80 },
              mr: { xs: '-10px' },
            }
          }
        >

          <img src={isSugarFree} alt="Filtro de produtos sem açúcar" />
        </IconButton>
      }

      {
        product?.filters.isNatural &&
        <IconButton
          sx={
            {
              width: { xs: 65, md: 80 },
              mr: '-10px',
            }
          }
        >

          <img src={isNatural} alt="Filtro de produtos naturais" />
        </IconButton>
      }
    </Box>
  );
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IProductModalProps {
  product: null | Product;

  setProduct: React.Dispatch<React.SetStateAction<null | Product>>;
};

const ProductModal: React.FC<IProductModalProps> = ({ product, setProduct }) => {
  const theme = useTheme();
  const auth = useAuth();
  const globalContext = useGlobalContext();

  // Menu controller
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (product?: Product, frequency?: CartItem['frequency']) => {
    setAnchorEl(null);

    if (typeof (product) !== 'undefined' && typeof (frequency) !== 'undefined')
      globalContext['cart'].addItem(auth.loggedClient?.id || LocalStorage.getCartKey(), product.id!, frequency);
  };

  const handleClose = () => {
    setProduct(null);
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={Boolean(product)}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Voltar
            </Typography>
          </Toolbar>
        </AppBar>

        <Box sx={{ p: theme.spacing(2) }}>
          <Grid container spacing={theme.spacing(1)}>
            <Grid item md={5} xs={12} >
              {
                product &&
                <ProductImageGallery images={product.images} />
              }
            </Grid>

            <Grid item md={7} xs={12}>
              {/* Mobile Title */}
              <Typography
                variant='h3'
                sx={
                  {
                    display: { xs: 'blocke', md: 'none' },
                    fontSize: { xs: '1.5rem', },
                    mb: theme.spacing(-0.3)
                  }
                }
              >
                {`${product?.name}`}
              </Typography>

              <Typography
                sx={
                  {
                    display: { xs: 'block', md: 'none' },
                    mb: theme.spacing(0.7),
                    fontSize: '0.9rem',
                  }
                }
                color="text.secondary"
              >
                {`${product?.measure}, ${product?.producer}`}
              </Typography>

              {/* Desktop Title */}
              <Typography
                variant='h3'
                sx={
                  {
                    display: { xs: 'none', md: 'block' },
                    mb: theme.spacing(1.0),
                    fontSize: { md: '2.4rem' },
                  }
                }
              >
                {`${product?.name} ${product?.producer} - ${product?.measure}`}
              </Typography>

              {/* Price */}
              <Typography
                variant='h3'
                sx={
                  {
                    fontSize: { xs: '1.2rem', md: '2.0rem' },
                    mb: { xs: theme.spacing(0.7), md: theme.spacing(1.0) }
                  }
                }

                color={theme.palette.primary.light}
              >
                {product && `R$ ${MaskApply.maskMoney(product?.price)}`}
              </Typography>

              {
                product &&
                <React.Fragment>
                  <Button
                    id={`fade-modal-button-${product.id}`}
                    aria-controls={open ? `fade-modal-menu-${product.id}` : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}

                    variant='contained'
                    color='secondary'
                    size="small"
                    endIcon={<ShoppingCartIcon />}
                    sx={{ fontSize: { xs: '0.6rem', md: '0.8rem' } }}
                  >
                    Adicionar
                  </Button>
                  <Menu
                    id={`fade-modal-menu-${product.id}`}
                    MenuListProps={{
                      'aria-labelledby': `fade-modal-button-${product.id}`,
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={() => handleCloseMenu()}
                    TransitionComponent={Fade}
                  >
                    <MenuItem onClick={() => handleCloseMenu(product, 'once')}>Uma vez</MenuItem>
                    <MenuItem onClick={() => handleCloseMenu(product, 'weekly')}>Semanal</MenuItem>
                    <MenuItem onClick={() => handleCloseMenu(product, 'biweekly')}>Quinzenal</MenuItem>
                    <MenuItem onClick={() => handleCloseMenu(product, 'monthly')}>Mensal</MenuItem>
                  </Menu>
                </React.Fragment>
              }


              {
                product &&
                <Filters {...product} />
              }
              <Typography
                variant='h5'
                sx={
                  {
                    fontSize: { xs: '1.3rem', md: '1.6rem' },
                    mb: { xs: theme.spacing(0.7), md: theme.spacing(1.0) }
                  }
                }
                color={theme.palette.primary.main}
              >
                Descrição
              </Typography>

              <Typography
                variant='body1'
                sx={
                  {
                    fontSize: { xs: '0.9rem', md: '1.0rem' },
                    mb: { xs: theme.spacing(1.5), md: theme.spacing(1.8) }
                  }
                }
                color='text.secondary'
              >
                {product?.description}
              </Typography>

              <Typography
                variant='h5'
                sx={
                  {
                    fontSize: { xs: '1.3rem', md: '1.6rem' },
                    mb: { xs: theme.spacing(0.7), md: theme.spacing(1.0) }
                  }
                }
                color={theme.palette.primary.main}
              >
                Ingredientes
              </Typography>

              <Typography
                variant='body1'
                sx={
                  {
                    fontSize: { xs: '0.9rem', md: '1.0rem' },
                    mb: { xs: theme.spacing(1.5), md: theme.spacing(1.8) }
                  }
                }
                color='text.secondary'
              >
                {product?.ingredients}
              </Typography>

              <Typography
                variant='h5'
                sx={
                  {
                    fontSize: { xs: '1.3rem', md: '1.6rem' },
                    mb: { xs: theme.spacing(0.7), md: theme.spacing(1.0) }
                  }
                }
                color={theme.palette.primary.main}
              >
                Validade
              </Typography>

              <Typography
                variant='body1'
                sx={
                  {
                    fontSize: { xs: '0.9rem', md: '1.0rem' },
                    mb: { xs: theme.spacing(1.5), md: theme.spacing(1.8) }
                  }
                }
                color='text.secondary'
              >
                {product?.validate}
              </Typography>
            </Grid>
          </Grid>
        </Box>

      </Dialog>
    </div>
  );
};

export default ProductModal;