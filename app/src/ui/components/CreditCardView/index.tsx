import React from 'react';
import {
  Box,
  Typography,
  Button,

  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import CreditCardLogo from '../CreditCardLogo';

import MaskApply from '../../../features/utils/MaskApply';
import { CreditCard } from '../../../globals/interfaces/creditCard';
import * as Routes from '../../../globals/routes';

interface ICreditCardViewProps {
  creditCard: CreditCard | null;
};

const CreditCardView: React.FC<ICreditCardViewProps> = ({ creditCard }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
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
        creditCard !== null ?

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
                  {`**** **** **** ${creditCard.number[creditCard.number.length - 1]}`}

                </Typography>

                <CreditCardLogo
                  brand={creditCard.brand}
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
                {MaskApply.printMonthYearFromTimestamp(creditCard.expiry)}
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
  );
};

export default CreditCardView;