import React from 'react';
import {
  Grid,
  Box,
  Typography,
  Stack,
  Button,
  IconButton,
  Switch,
  FormControlLabel,

  useTheme,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import HomeIcon from '@mui/icons-material/Home';

import { useNavigate, useParams } from 'react-router-dom';


import MainContentBox from '../../../ui/components/pages/MainContentBox';
import CheckoutItem from '../../../ui/components/CheckoutItem';
import CreditCardLogo from '../../../ui/components/CreditCardLogo';
import FrequencyResume from './components/FrequencyResume';

import useStates from './states';
import { useAuth } from '../../../features/auth/context';
import useAPIs from './apis';

import * as Routes from '../../../globals/routes';
import MaskApply from '../../../features/utils/MaskApply';

const CheckoutView: React.FC<React.ReactFragment> = () => {
  const states = useStates();
  const apis = useAPIs(states);
  const auth = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();
  const params = useParams();

  // Effects
  React.useEffect(() => {
    if (typeof (params.id) !== 'undefined')
      if (auth.loggedClient) {
        apis.getShippingValueByCep(auth.loggedClient.address.cep);
        apis.getActiveCreditCard(auth.loggedClient.id!);
        apis.getCheckoutClient(auth.loggedClient.id as string, params.id);
        apis.getNextDeliveryDateClient(auth.loggedClient.id as string, params.id);
      };
  }, [auth.loggedClient, params.id]);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof (params.id) !== 'undefined')
      if (auth.loggedClient) {
        apis.handleActiveCheckoutClient(auth.loggedClient.id as string, params.id, event.target.checked);
      };
  };

  return (
    <MainContentBox primary="Carrinho" states={states} isLoggedIn={true} pageTitle="Checkout">
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

            {/* Once itens */}
            {
              states.onceItems.length > 0 &&
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
                    {`Apenas uma vez (${states.onceItems.length} itens)`}
                  </Typography>
                </Box>

                {
                  states.onceItems.map((item, key) => {
                    return <CheckoutItem checkoutItem={item} key={`${key}-${item.id}`} />;
                  })
                }
              </Box>
            }

            {/* Weekly itens */}
            {
              states.weeklyItems.length > 0 &&
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
                    {`Semanal (${states.weeklyItems.length} itens)`}
                  </Typography>
                </Box>

                {
                  states.weeklyItems.map((item, key) => {
                    return <CheckoutItem checkoutItem={item} key={`${key}-${item.id}`} />;
                  })
                }
              </Box>
            }

            {/* Biweekly itens */}
            {
              states.biweeklyItems.length > 0 &&
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
                    {`Quinzenal (${states.biweeklyItems.length} itens)`}
                  </Typography>
                </Box>

                {
                  states.biweeklyItems.map((item, key) => {
                    return <CheckoutItem checkoutItem={item} key={`${key}-${item.id}`} />;
                  })
                }
              </Box>
            }

            {/* Monthly itens */}
            {
              states.biweeklyItems.length > 0 &&
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
                    {`Mensal (${states.biweeklyItems.length} itens)`}
                  </Typography>
                </Box>

                {
                  states.monthlyItems.map((item, key) => {
                    return <CheckoutItem checkoutItem={item} key={`${key}-${item.id}`} />;
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
          <Box sx={{ display: 'flex', flexDirection: 'column', }}>
            <Box
              sx={
                {
                  backgroundColor: theme.palette.grey['300'],
                  p: theme.spacing(2),
                  ml: { xs: 0, md: theme.spacing(2), },

                  mb: theme.spacing(3),
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
                Resumo da Cesta
              </Typography>


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
                    Dia de entrega:
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant='h6'
                    component='span'
                    color='secondary'
                    sx={
                      {
                        fontSize: { xs: '1.4rem', md: '1.6rem' }
                      }
                    }
                  >
                    {
                      states.checkout &&
                      MaskApply.getPTWeekDayFromEN(states.checkout.deliveryDay)
                    }
                  </Typography>
                </Box>
              </Stack>

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
                    Criada em:
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant='h6'
                    component='span'
                    color='secondary'
                    sx={
                      {
                        fontSize: { xs: '1.4rem', md: '1.6rem' }
                      }
                    }
                  >
                    {
                      states.checkout &&
                      MaskApply.printDateFromTimestamp(states.checkout.createdAt!)
                    }
                  </Typography>
                </Box>
              </Stack>

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

              {
                states.onceItems.length > 0 &&
                <FrequencyResume
                  frequency='Apenas uma vez'
                  qtdItems={states.onceItems.length}
                  price={states.prices.once}
                  nextDelivery={states.deliveryDates?.once || null}
                />
              }

              {
                states.weeklyItems.length > 0 &&
                <FrequencyResume
                  frequency='Semanal'
                  qtdItems={states.weeklyItems.length}
                  price={states.prices.weekly}
                  nextDelivery={states.deliveryDates?.weekly || null}
                />
              }

              {
                states.biweeklyItems.length > 0 &&
                <FrequencyResume
                  frequency='Quinzenal'
                  qtdItems={states.biweeklyItems.length}
                  price={states.prices.biweekly}
                  nextDelivery={states.deliveryDates?.biweekly || null}
                />
              }

              {
                states.monthlyItems.length > 0 &&
                <FrequencyResume
                  frequency='Mensal'
                  qtdItems={states.monthlyItems.length}
                  price={states.prices.monthly}
                  nextDelivery={states.deliveryDates?.monthly || null}
                />
              }

              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={states.isActive}
                      onChange={handleChange}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  }

                  label='Cesta ativa?'
                />
              </Box>

            </Box>

            {/* Credit Card */}
            <Box
              sx={
                {
                  backgroundColor: theme.palette.grey['300'],
                  p: theme.spacing(2),
                  ml: { xs: 0, md: theme.spacing(2), },

                  mb: theme.spacing(3),
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
                Cartão de Crédito
              </Typography>

              {
                states.activeCreditCard !== null ?

                  <Box
                    sx={
                      {
                        display: { xs: 'block', md: 'flex' },
                        justifyContent: 'space-between'
                      }
                    }
                  >
                    <Box>
                      <Typography
                        variant='h6'
                        component='div'
                        color='primary'
                        sx={
                          {
                            fontSize: { xs: '1.4rem', md: '1.9rem' },
                          }
                        }
                      >
                        Número:
                      </Typography>

                      <Box sx={{ display: 'flex' }}>
                        <Typography
                          variant='h6'
                          component='div'
                          color={theme.palette.text.secondary}
                          sx={
                            {
                              fontSize: { xs: '1.3rem', md: '1.8rem' },
                              mr: theme.spacing(1),
                            }
                          }
                        >
                          {`**** **** **** ${states.activeCreditCard.lastNumber}`}

                        </Typography>

                        <CreditCardLogo
                          brand={states.activeCreditCard.brand}
                          style={{ width: '40px', marginTop: '0px' }}
                        />
                      </Box>
                    </Box>

                    <Box>
                      <Typography
                        variant='h6'
                        component='div'
                        color='primary'
                        sx={
                          {
                            fontSize: { xs: '1.4rem', md: '1.9rem' },
                          }
                        }
                      >
                        Validade:
                      </Typography>

                      <Typography
                        variant='h6'
                        component='div'
                        color={theme.palette.text.secondary}
                        align='left'
                        sx={
                          {
                            fontSize: { xs: '1.3rem', md: '1.8rem' },
                          }
                        }
                      >
                        {MaskApply.printMonthYearFromTimestamp(states.activeCreditCard.expiry)}
                      </Typography>
                    </Box>
                  </Box>
                  :
                  <Typography
                    variant='h6'
                    component='span'
                    color='error'

                    sx={
                      {
                        fontSize: { xs: '1.3rem', md: '1.5rem' }
                      }
                    }
                  >
                    Você ainda não tem um cartão de crédito ativo
                  </Typography>
              }

              <Button
                variant='outlined'
                size='large'
                onClick={() => navigate(Routes.SCREEN_CREDIT_CARD_SET)}

                sx={
                  {
                    width: '100%',
                    mt: theme.spacing(3),
                  }
                }
              >
                Ir para cartões de crédito
              </Button>
            </Box>

            {/* Client personal data */}
            {
              auth.loggedClient &&
              <Box
                sx={
                  {
                    backgroundColor: theme.palette.grey['300'],
                    p: theme.spacing(2),
                    ml: { xs: 0, md: theme.spacing(2), },
                    mb: theme.spacing(3),

                    display: 'flex',
                  }
                }
              >

                <Box
                  sx={
                    {
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      mr: { xs: theme.spacing(1.5), md: theme.spacing(2) },
                    }
                  }
                >
                  <AccountCircleIcon sx={{ fontSize: { xs: '2.5rem', md: '3rem' } }} />
                </Box>

                <Typography
                  variant='body1'
                  component='div'

                  sx={
                    {
                      fontWeight: 500,
                      fontSize: { xs: '0.9rem', md: '1.4rem' },
                      lineHeight: '2rem',
                      flexGrow: 1
                    }
                  }
                >
                  Nome: {auth.loggedClient.name}
                  <br />
                  CPF: {MaskApply.maskCpf(auth.loggedClient.cpf)}
                  <br />
                  Email: {auth.loggedClient.email}
                  <br />
                  Celular: {MaskApply.maskCellPhone(auth.loggedClient.cellPhone)}
                </Typography>

                <IconButton sx={{ width: '40px', height: '40px', ml: '10px' }} onClick={() => navigate(Routes.SCREEN_CLIENT_GET)}>
                  <EditIcon />
                </IconButton>
              </Box>
            }

            {/* Cclient Address */}
            {
              auth.loggedClient &&
              <Box
                sx={
                  {
                    backgroundColor: theme.palette.grey['300'],
                    p: theme.spacing(2),
                    ml: { xs: 0, md: theme.spacing(2), },

                    display: 'flex',
                  }
                }
              >

                <Box
                  sx={
                    {
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      mr: { xs: theme.spacing(1.5), md: theme.spacing(2) },
                    }
                  }
                >
                  <HomeIcon sx={{ fontSize: { xs: '2.5rem', md: '3rem' } }} />
                </Box>

                <Typography
                  variant='body1'
                  component='div'

                  sx={
                    {
                      fontWeight: 500,
                      fontSize: { xs: '0.9rem', md: '1.4rem' },
                      lineHeight: '2rem',
                      flexGrow: 1,
                    }
                  }
                >
                  {auth.loggedClient.address.street}, {auth.loggedClient.address.number}
                  <br />
                  CEP: {MaskApply.maskCep(auth.loggedClient.address.cep)}
                  <br />
                  Bairro: {auth.loggedClient.address.district}
                  <br />
                  {auth.loggedClient.address.city}-{auth.loggedClient.address.state}
                </Typography>

                <IconButton sx={{ width: '40px', height: '40px', ml: '10px' }} onClick={() => navigate(Routes.SCREEN_CLIENT_GET)}>
                  <EditIcon />
                </IconButton>
              </Box>
            }
          </Box>
        </Grid>
      </Grid>
    </MainContentBox>
  );
};

export default CheckoutView;