import React from 'react';
import {
  Grid,
  Box,
  Typography,
  LinearProgress,
  Stack,
  Button,

  useTheme,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import MainContentBox from '../../../ui/components/pages/MainContentBox';
import CartItem from '../../../ui/components/CartItem';
import DeliveryDaySelect from './components/DeliveryDaySelect';

import useStates from './states';
import { useGlobalContext } from '../../../features/globalContext/context';
import { useAuth } from '../../../features/auth/context';
import MaskApply from '../../../features/utils/MaskApply';
import { CheckoutFormData } from './types';
import useAPIs from './apis';
import { WeekDaysName } from '../../../globals/interfaces/checkout';
import * as Routes from '../../../globals/routes';

const Checkout: React.FC<React.ReactFragment> = () => {
  const states = useStates();
  const apis = useAPIs(states);
  const globalContext = useGlobalContext();
  const auth = useAuth();
  const theme = useTheme();
  const methods = useForm<CheckoutFormData>({ mode: 'onBlur', reValidateMode: 'onBlur' });
  const navigate = useNavigate();

  // Evaluate delivery day when change week day field
  React.useEffect(() => {
    if (methods.getValues('deliveryDay') !== ' ')
      apis.getDeliveryDate(methods.getValues('deliveryDay') as WeekDaysName);
  }, [methods.watch('deliveryDay')]);

  React.useEffect(() => {
    if (auth.loggedClient) {
      apis.getShippingValueByCep(auth.loggedClient.address.cep);
      apis.getActiveCreditCard(auth.loggedClient.id!);
    };
  }, [auth.loggedClient]);

  const cartVaLue = (): number => {
    return globalContext['cart'].getTotalCartPrice(globalContext['cart'].cart);
  };

  const invoiceValue = (): number => {
    let value: number = 0;

    if (states.shippingValue !== null)
      value = value + states.shippingValue;

    value = value + cartVaLue();

    return value;
  };

  const onSubmit = (data: CheckoutFormData) => {
    console.log('onSubmit', data);
  };

  return (
    <MainContentBox primary="Carrinho" states={states} isLoggedIn={true}>
      <Grid container spacing={{ xs: 0, md: 3 }} sx={{ width: { xs: '100%', md: '90%' }, m: 'auto' }}>
        {/* Cart Items */}
        <Grid item xs={12} sm={7}>
          {/* Cart itens */}
          <Box
            sx={
              {
                pb: { xs: theme.spacing(1), md: '90px' },
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
              <Box sx={{ mb: { xs: theme.spacing(2.0), md: theme.spacing(3.0) } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: theme.spacing(1.0), md: theme.spacing(2.0) } }}>
                  <CalendarMonthIcon sx={{ fontSize: { md: '2.0rem' } }} color='primary' />

                  <Typography
                    variant='h6'
                    component='div'
                    sx={
                      {
                        fontWeight: 600,
                        fontSize: { xs: '1.0rem', md: '1.6rem' },
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
              <Box sx={{ mb: { xs: theme.spacing(2.0), md: theme.spacing(3.0) } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: theme.spacing(1.0), md: theme.spacing(2.0) } }}>
                  <CalendarMonthIcon sx={{ fontSize: { md: '2.0rem' } }} color='primary' />

                  <Typography
                    variant='h6'
                    component='div'
                    sx={
                      {
                        fontWeight: 600,
                        fontSize: { xs: '1.0rem', md: '1.6rem' },
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
              <Box sx={{ mb: { xs: theme.spacing(2.0), md: theme.spacing(3.0) } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: theme.spacing(1.0), md: theme.spacing(2.0) } }}>
                  <CalendarMonthIcon sx={{ fontSize: { md: '2.0rem' } }} color='primary' />

                  <Typography
                    variant='h6'
                    component='div'
                    sx={
                      {
                        fontWeight: 600,
                        fontSize: { xs: '1.0rem', md: '1.6rem' },
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
              <Box sx={{ mb: { xs: theme.spacing(2.0), md: theme.spacing(3.0) } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: theme.spacing(1.0), md: theme.spacing(2.0) } }}>
                  <CalendarMonthIcon sx={{ fontSize: { md: '2.0rem' } }} color='primary' />

                  <Typography
                    variant='h6'
                    component='div'
                    sx={
                      {
                        fontWeight: 600,
                        fontSize: { xs: '1.0rem', md: '1.6rem' },
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

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant='outlined'
              size='large'
              onClick={() => navigate(Routes.SCREEN_INDEX)}

              sx={
                {
                  width: { xs: '100%', md: '70%' },
                  mb: theme.spacing(5),
                }
              }
            >
              Continuar comprando
          </Button>
          </Box>
        </Grid>

        <Grid item xs={12} sm={5}>
          {/* Checkout Informations */}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box
              sx={
                {
                  backgroundColor: theme.palette.grey['300'],
                  p: theme.spacing(2),
                  ml: { xs: 0, md: theme.spacing(2), },
                  
                  mb: theme.spacing(3)
                }
              }
            >
              <Typography
                variant='h4'
                color='primary'
                component='div'
                sx={
                  {
                    fontWeight: 500,
                    fontSize: { xs: '1.6rem', md: '2.4rem' },
                    mb: { xs: theme.spacing(2), md: theme.spacing(3) },
                  }
                }
              >
                Resumo do pedido
              </Typography>

              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <DeliveryDaySelect methods={methods} sx={{ mb: theme.spacing(2) }} />

                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={{ xs: 1, sm: 2, md: 4 }}

                  sx={
                    {
                      mb: theme.spacing(3)
                    }
                  }
                >
                  <Box>
                    <Typography
                      variant='h6'
                      component='span'
                      color='primary'

                      sx={
                        {
                          fontSize: { xs: '1.3rem', md: '1.5rem' }
                        }
                      }
                    >
                      Próxima entrega:
                </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant='h6'
                      component='span'
                      color={states.deliveryDay === null ? 'error' : 'secondary'}

                      sx={
                        {
                          fontSize: { xs: '1.4rem', md: '1.6rem' }
                        }
                      }
                    >
                      {
                        states.deliveryDay === null ?
                          'Escolha o dia da entrega...' :
                          MaskApply.printDateFromTimestamp(states.deliveryDay)}
                    </Typography>
                  </Box>
                </Stack>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: theme.spacing(1.0) }}>
                  <Typography
                    variant='h6'
                    component='span'
                    color='primary'

                    sx={
                      {
                        fontSize: { xs: '1.5rem', md: '1.7rem' }
                      }
                    }
                  >
                    {`${globalContext['cart'].cart.length} itens`}
                  </Typography>

                  <Typography
                    variant='h6'
                    component='span'
                    color='primary'

                    sx={
                      {
                        fontSize: { xs: '1.5rem', md: '1.7rem' }
                      }
                    }
                  >
                    {`R$ ${MaskApply.maskMoney(globalContext['cart'].getTotalCartPrice(globalContext['cart'].cart))}`}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: theme.spacing(3) }}>
                  <Typography
                    variant='h6'
                    component='span'
                    color='primary'

                    sx={
                      {
                        fontSize: { xs: '1.5rem', md: '1.7rem' }
                      }
                    }
                  >
                    Frete
              </Typography>

                  <Typography
                    variant='h6'
                    component='span'
                    color='primary'

                    sx={
                      {
                        fontSize: { xs: '1.5rem', md: '1.7rem' }
                      }
                    }
                  >
                    {states.shippingValue !== null ? `R$ ${MaskApply.maskMoney(states.shippingValue)}` : ''}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: theme.spacing(3) }}>
                  <Typography
                    variant='h6'
                    component='span'
                    color='primary'

                    sx={
                      {
                        fontSize: { xs: '1.6rem', md: '1.8rem' }
                      }
                    }
                  >
                    Total
              </Typography>

                  <Typography
                    variant='h6'
                    component='span'
                    color='primary'

                    sx={
                      {
                        fontSize: { xs: '1.6rem', md: '1.8rem' }
                      }
                    }
                  >
                    {states.shippingValue !== null ? `R$ ${MaskApply.maskMoney(invoiceValue())}` : ''}
                  </Typography>
                </Box>
              </form>

            </Box>

            {/* Credit Card */}
            <Box
              sx={
                {
                  backgroundColor: theme.palette.grey['300'],
                  p: theme.spacing(2),
                  ml: { xs: 0, md: theme.spacing(2), }
                }
              }
            >
              <Typography
                variant='h4'
                color='primary'
                component='div'
                sx={
                  {
                    fontWeight: 500,
                    fontSize: { xs: '1.6rem', md: '2.4rem' },
                    mb: { xs: theme.spacing(2), md: theme.spacing(3) },
                  }
                }
              >
                Resumo do pedido
                </Typography>
            </Box>

          </Box>

        </Grid>

      </Grid>
    </MainContentBox>
  );
};

export default Checkout;