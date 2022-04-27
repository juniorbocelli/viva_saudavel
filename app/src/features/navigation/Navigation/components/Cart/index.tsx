import React from 'react';
import {
  Box,
  Drawer,
  Divider,
  IconButton,
  Typography,
  Button,

  useTheme,
  colors,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import { IUseStates } from '../../states';
import CartItem from '../../../../../ui/components/CartItem';
import { useGlobalContext } from '../../../../globalContext/context';
import MaskApply from '../../../../../features/utils/MaskApply';

const Cart: React.FC<IUseStates> = (states) => {
  const theme = useTheme();
  const globalContext = useGlobalContext();

  // Itens by frequency
  const onceItems = globalContext['cart'].getProductsByFrequency('once');
  const weeklyItems = globalContext['cart'].getProductsByFrequency('weekly');
  const biweeklyItems = globalContext['cart'].getProductsByFrequency('biweekly');
  const monthlyItems = globalContext['cart'].getProductsByFrequency('monthly');

  const {
    isMobileCartOpen,
    setIsMobileCartOpen,
  } = states;

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

                sx={{fontWeight: 600}}
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
            {/* No products */}
            {
              globalContext['cart'].getCartLenght() === 0 &&
              <Typography variant='h6' component='div' color='text.secondary'>
                Você ainda não adicionou produtos ao carrinho
              </Typography>
            }

            {/* Once itens */}
            {
              onceItems.quantity > 0 &&
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
                    {`Apenas uma vez (${onceItems.quantity} itens)`}
                  </Typography>
                </Box>

                {
                  onceItems.items.map((item) => {
                    return <CartItem cartItem={item[0]} itemKey={item[1]} key={item[1]} />;
                  })
                }
              </Box>
            }

            {/* Weekly itens */}
            {
              weeklyItems.quantity > 0 &&
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
                    {`Semanal (${weeklyItems.quantity} itens)`}
                  </Typography>
                </Box>

                {
                  weeklyItems.items.map((item) => {
                    return <CartItem cartItem={item[0]} itemKey={item[1]} key={item[1]} />;
                  })
                }
              </Box>
            }

            {/* Biweekly itens */}
            {
              biweeklyItems.quantity > 0 &&
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
                    {`Quinzenal (${biweeklyItems.quantity} itens)`}
                  </Typography>
                </Box>

                {
                  biweeklyItems.items.map((item) => {
                    return <CartItem cartItem={item[0]} itemKey={item[1]} key={item[1]} />;
                  })
                }
              </Box>
            }

            {/* Monthly itens */}
            {
              monthlyItems.quantity > 0 &&
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
                    {`Mensal (${monthlyItems.quantity} itens)`}
                  </Typography>
                </Box>

                {
                  monthlyItems.items.map((item) => {
                    return <CartItem cartItem={item[0]} itemKey={item[1]} key={item[1]} />;
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
                {`${globalContext['cart'].getCartLenght()} itens`}
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
                {`R$ ${MaskApply.maskMoney(globalContext['cart'].getCartValue())}`}
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

              disabled={globalContext['cart'].getCartLenght() === 0}
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