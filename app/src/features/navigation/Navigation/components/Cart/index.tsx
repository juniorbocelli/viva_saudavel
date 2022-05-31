import React from 'react';
import {
  Box,
  Drawer,
  Divider,
  IconButton,
  Typography,
  Button,
  CircularProgress,
  LinearProgress,

  useTheme,
  colors,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useNavigate } from 'react-router-dom';

import { IUseStates as IUseNavigationStates } from '../../states';
import CartItem from '../../../../../ui/components/CartItem';
import MaskApply from '../../../../utils/MaskApply';
import { useAuth } from '../../../../auth/context';
import LocalStorage from '../../../../storage/LocalStorage';
import { useGlobalContext } from '../../../../globalContext/context';
import * as Routes from '../../../../../globals/routes';

const Cart: React.FC<IUseNavigationStates> = (naviStates) => {
  const theme = useTheme();
  const globalContext = useGlobalContext();
  const auth = useAuth();
  const navigate = useNavigate();

  // Load cart data when render page or chenge logged client
  React.useEffect(() => {
    // If loggedClient is undefined, we not know if user is logged or not
    if (typeof (auth.loggedClient) !== 'undefined')
      if (auth.loggedClient !== null)
        globalContext['cart'].getCart(auth.loggedClient.id as string);
      else
        globalContext['cart'].getCart(LocalStorage.getCartKey());
  }, [auth.loggedClient]);

  const {
    isMobileCartOpen,
    setIsMobileCartOpen,
  } = naviStates;

  const toggleDrawer = (open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setIsMobileCartOpen(open);
    };

  return (
    <div>
      <Drawer
        anchor='right'
        open={isMobileCartOpen}
        onClose={toggleDrawer(false)}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={
          {
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: { xs: '100%', md: 700 }, height: '100%' },
          }
        }
      >
        {/* Cart content */}
        <Box
          sx={{ flexShrink: { sm: 0 }, height: '100vh' }}
          aria-label="Dados do carrinho de compra"
        >
          {/* Close Button */}
          <Box
            sx={
              {
                position: 'fixed',
                top: 0,
                backgroundColor: 'white',
                zIndex: 100,
                width: { xs: '100%', md: 700 },
              }
            }
          >
            <Box
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <IconButton
                color="inherit"
                aria-label="close drawer"
                edge="start"
                onClick={toggleDrawer(false)}
                size="large"
                sx={{ ml: theme.spacing(1), width: '50px', height: '50px' }}
              >
                <CloseIcon sx={{ fontSize: '2.7rem' }} />
              </IconButton>
              <Typography
                variant='h5'
                component='div'
                color={theme.palette.primary.dark}

                sx={{ fontWeight: 600 }}
              >
                Carrinho
              </Typography>
            </Box>
            <Divider />
          </Box>

          {/* Cart itens */}
          <Box
            sx={
              {
                p: theme.spacing(1),
                pt: { xs: '60px', md: '60px' },
                pb: { xs: '70px', md: '90px' }
              }
            }
            aria-label="Itens do carrinho de compra"
          >
            {/* Sync cart feedback */}
            {
              globalContext['cart'].feedbacks.isQueryingAPI &&
              <Box>
                <LinearProgress />
              </Box>
            }

            {/* No products */}
            {
              globalContext['cart'].cart.length === 0 &&
              <Typography variant='h6' component='div' color='text.secondary'>
                Você ainda não adicionou produtos ao carrinho
              </Typography>
            }

            {/* Once itens */}
            {
              globalContext['cart'].onceItems.length > 0 &&
              <Box sx={{ mb: { xs: theme.spacing(2.0), md: theme.spacing(2.0) } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: theme.spacing(1.0), md: theme.spacing(1.0) } }}>
                  <CalendarMonthIcon sx={{ fontSize: { md: '2.0rem' } }} color='primary' />

                  <Typography
                    variant='h6'
                    component='div'
                    sx={
                      {
                        fontWeight: 600,
                        fontSize: { xs: '1.0rem', md: '1.3rem' },
                        ml: theme.spacing(1.0),
                      }
                    }
                  >
                    {`Apenas uma vez (${globalContext['cart'].getTotalItems(globalContext['cart'].onceItems)} itens)`}
                  </Typography>
                </Box>

                {
                  globalContext['cart'].onceItems.map((item) => {
                    return <CartItem cartItem={item} key={`${item.frequency}-${item.productId}`} />;
                  })
                }
              </Box>
            }

            {/* Weekly itens */}
            {
              globalContext['cart'].weeklyItems.length > 0 &&
              <Box sx={{ mb: { xs: theme.spacing(2.0), md: theme.spacing(2.0) } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: theme.spacing(1.0), md: theme.spacing(1.0) } }}>
                  <CalendarMonthIcon sx={{ fontSize: { md: '2.0rem' } }} color='primary' />

                  <Typography
                    variant='h6'
                    component='div'
                    sx={
                      {
                        fontWeight: 600,
                        fontSize: { xs: '1.0rem', md: '1.3rem' },
                        ml: theme.spacing(1.0),
                      }
                    }
                  >
                    {`Semanal (${globalContext['cart'].getTotalItems(globalContext['cart'].weeklyItems)} itens)`}
                  </Typography>
                </Box>

                {
                  globalContext['cart'].weeklyItems.map((item) => {
                    return <CartItem cartItem={item} key={`${item.frequency}-${item.productId}`} />;
                  })
                }
              </Box>
            }

            {/* Biweekly itens */}
            {
              globalContext['cart'].biweeklyItems.length > 0 &&
              <Box sx={{ mb: { xs: theme.spacing(2.0), md: theme.spacing(2.0) } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: theme.spacing(1.0), md: theme.spacing(1.0) } }}>
                  <CalendarMonthIcon sx={{ fontSize: { md: '2.0rem' } }} color='primary' />

                  <Typography
                    variant='h6'
                    component='div'
                    sx={
                      {
                        fontWeight: 600,
                        fontSize: { xs: '1.0rem', md: '1.3rem' },
                        ml: theme.spacing(1.0),
                      }
                    }
                  >
                    {`Quinzenal (${globalContext['cart'].getTotalItems(globalContext['cart'].biweeklyItems)} itens)`}
                  </Typography>
                </Box>

                {
                  globalContext['cart'].biweeklyItems.map((item) => {
                    return <CartItem cartItem={item} key={`${item.frequency}-${item.productId}`} />;
                  })
                }
              </Box>
            }

            {/* Monthly itens */}
            {
              globalContext['cart'].monthlyItems.length > 0 &&
              <Box sx={{ mb: { xs: theme.spacing(2.0), md: theme.spacing(2.0) } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: theme.spacing(1.0), md: theme.spacing(1.0) } }}>
                  <CalendarMonthIcon sx={{ fontSize: { md: '2.0rem' } }} color='primary' />

                  <Typography
                    variant='h6'
                    component='div'
                    sx={
                      {
                        fontWeight: 600,
                        fontSize: { xs: '1.0rem', md: '1.3rem' },
                        ml: theme.spacing(1.0),
                      }
                    }
                  >
                    {`Mensal (${globalContext['cart'].getTotalItems(globalContext['cart'].monthlyItems)} itens)`}
                  </Typography>
                </Box>

                {
                  globalContext['cart'].monthlyItems.map((item) => {
                    return <CartItem cartItem={item} key={`${item.frequency}-${item.productId}`} />;
                  })
                }
              </Box>
            }
          </Box>

          {/* Total */}
          <Box
            sx={
              {
                position: 'fixed',
                bottom: 0,
                backgroundColor: colors.grey['200'],
                height: { xs: '65px', md: '90px' },
                width: { xs: '100%', md: 700 },
                display: 'flex',
                justifyContent: 'space-between',
                p: { xs: theme.spacing(1), md: theme.spacing(1) },
                pt: { md: theme.spacing(1.5) },
              }
            }>
            <Box>
              <Typography
                variant='body2'
                color='text.secondary'
              >
                {`${globalContext['cart'].cart.length} itens`}
              </Typography>

              <Typography
                variant='h4'
                component='div'
                color='text.secondary'

                sx={
                  {
                    fontWeight: 600,
                    fontSize: { xs: '1.3rem', md: '1.8rem' }
                  }
                }
              >
                {
                  globalContext['cart'].feedbacks.isQueryingAPI ?
                    <CircularProgress color='primary' />
                    :
                    `R$ ${MaskApply.maskMoney(globalContext['cart'].getTotalCartPrice(globalContext['cart'].cart))}`
                }
              </Typography>
            </Box>

            <Button
              color='primary'
              variant='contained'
              sx={
                {
                  height: { xs: '30px', md: '50px' },
                  fontSize: { xs: '0.8rem' }
                }
              }

              onClick={
                (event: React.KeyboardEvent | React.MouseEvent) => {
                  setIsMobileCartOpen(false)

                  if (auth.isSignedIn())
                    navigate(Routes.SCREEN_CLIENT_CHECKOUT);
                  else
                    navigate(Routes.SCREEN_CLIENT_LOGIN);
                }
              }
              disabled={globalContext['cart'].cart.length === 0 || globalContext['cart'].feedbacks.isQueryingAPI}
            >
              Finalizar Compra
            </Button>
          </Box>
        </Box>
      </Drawer>
    </div>
  );
};

export default Cart;