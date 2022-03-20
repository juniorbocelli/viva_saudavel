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
import * as MaskApply from '../../../../../features/validation/maskApply';

const Cart: React.FC<IUseStates> = (states) => {
  const theme = useTheme();
  const globalContext = useGlobalContext();

  // Itens by frequency
  const onceItems = globalContext.getProductsByFrequency('once');
  const weeklyItems = globalContext.getProductsByFrequency('weekly');
  const biweeklyItems = globalContext.getProductsByFrequency('biweekly');
  const monthlyItems = globalContext.getProductsByFrequency('monthly');

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
                width: {md: 700},
              }
            }
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
            <Divider />
          </Box>

          {/* Cart itens */}
          <Box
            sx={
              {
                p: theme.spacing(1),
                pt: { md: '60px' },
                pb: { md: '90px' }
              }
            }
            aria-label="Itens do carrinho de compra"
          >
            {/* Once itens */}
            {
              onceItems.length > 0 &&
              <Box sx={{ mb: { md: theme.spacing(2.0) } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: { md: theme.spacing(1.0) } }}>
                  <CalendarMonthIcon sx={{ fontSize: { md: '2.0rem' } }} color='primary' />

                  <Typography
                    variant='h6'
                    component='div'
                    sx={
                      {
                        fontWeight: 600,
                        fontSize: '1.3rem',
                        ml: theme.spacing(1.0),
                      }
                    }
                  >
                    {`Apenas uma vez (${onceItems.length} itens)`}
                  </Typography>
                </Box>

                {
                  onceItems.map((item) => {
                    return <CartItem cartItem={item[0]} itemKey={item[1]} key={item[1]} />;
                  })
                }
              </Box>
            }

            {/* Weekly itens */}
            {
              weeklyItems.length > 0 &&
              <Box sx={{ mb: { md: theme.spacing(2.0) } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: { md: theme.spacing(1.0) } }}>
                  <CalendarMonthIcon sx={{ fontSize: { md: '2.0rem' } }} color='primary' />

                  <Typography
                    variant='h6'
                    component='div'
                    sx={
                      {
                        fontWeight: 600,
                        fontSize: '1.3rem',
                        ml: theme.spacing(1.0),
                      }
                    }
                  >
                    {`Semanal (${weeklyItems.length} itens)`}
                  </Typography>
                </Box>

                {
                  weeklyItems.map((item) => {
                    return <CartItem cartItem={item[0]} itemKey={item[1]} key={item[1]} />;
                  })
                }
              </Box>
            }

            {/* Biweekly itens */}
            {
              biweeklyItems.length > 0 &&
              <Box sx={{ mb: { md: theme.spacing(2.0) } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: { md: theme.spacing(1.0) } }}>
                  <CalendarMonthIcon sx={{ fontSize: { md: '2.0rem' } }} color='primary' />

                  <Typography
                    variant='h6'
                    component='div'
                    sx={
                      {
                        fontWeight: 600,
                        fontSize: '1.3rem',
                        ml: theme.spacing(1.0),
                      }
                    }
                  >
                    {`Quinzenal (${biweeklyItems.length} itens)`}
                  </Typography>
                </Box>

                {
                  biweeklyItems.map((item) => {
                    return <CartItem cartItem={item[0]} itemKey={item[1]} key={item[1]} />;
                  })
                }
              </Box>
            }

            {/* Monthly itens */}
            {
              monthlyItems.length > 0 &&
              <Box sx={{ mb: { md: theme.spacing(2.0) } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: { md: theme.spacing(1.0) } }}>
                  <CalendarMonthIcon sx={{ fontSize: { md: '2.0rem' } }} color='primary' />

                  <Typography
                    variant='h6'
                    component='div'
                    sx={
                      {
                        fontWeight: 600,
                        fontSize: '1.3rem',
                        ml: theme.spacing(1.0),
                      }
                    }
                  >
                    {`Mensal (${monthlyItems.length} itens)`}
                  </Typography>
                </Box>

                {
                  monthlyItems.map((item) => {
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
                height: { md: '90px' },
                width: { md: 700 },
                display: 'flex',
                justifyContent: 'space-between',
                p: { md: theme.spacing(1) },
                pt: { md: theme.spacing(1.5) },
              }
            }>
            <Box>
              <Typography
                variant='body2'
                color='text.secondary'
              >
                {`${globalContext.getCartLenght()} itens`}
              </Typography>

              <Typography
                variant='h4'
                component='div'
                color='text.secondary'

                sx={
                  {
                    fontWeight: 600,
                    fontSize: { md: '1.8rem' }
                  }
                }
              >
                {`R$ ${MaskApply.maskMoney(globalContext.getCartValue())}`}
              </Typography>
            </Box>

            <Button
              color='primary'
              variant='contained'
              sx={
                {
                  height: { md: '50px' }
                }
              }

              disabled={globalContext.getCartLenght() === 0}
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