import React from 'react'
import {
  Typography,
  Box,

  useTheme,
} from '@mui/material';

import Title from './components/Title';
import Paragraph from './components/Paragraph';
import CreditCardLogo from '../../ui/components/CreditCardLogo';

import { CreditCard } from '../../globals/interfaces/creditCard';

import MaskApply from '../../features/utils/MaskApply';

interface ICreditCardDataProps {
  creditCard: CreditCard;
};

const CreditCardData: React.FC<ICreditCardDataProps> = ({ creditCard }) => {
  const theme = useTheme();

  return (
    <div>
      <Typography
        variant='h5'
        component='div'
        color='primary'
        sx={
          {
            fontSize: { xs: '1.4rem', md: '1.7rem' },
            mb: theme.spacing(2)
          }
        }
      >
        Cartão de Crédito
      </Typography>

      <Box
        sx={
          {
            backgroundColor: theme.palette.grey['300'],
            p: theme.spacing(2)
          }
        }
      >
        <Box sx={{ display: 'flex' }}>
          <Box>
            <Title>
              Número:
            </Title>
            <Paragraph>
              {`**** **** **** ${creditCard.number[creditCard.number.length - 1]}`}
            </Paragraph>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <CreditCardLogo brand={creditCard.brand} style={{ width: '40px', marginLeft: '7px', marginTop: '35px' }} />
          </Box>

          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <CreditCardLogo brand={creditCard.brand} style={{ width: '30px', marginLeft: '5px', marginTop: '20px' }} />
          </Box>
        </Box>

        <Title>
          Nome:
        </Title>
        <Paragraph>
          {creditCard.name}
        </Paragraph>

        <Box sx={{ display: 'flex' }}>
          <Box sx={{ mr: theme.spacing(4) }}>
            <Title>
              Vencimento:
            </Title>
            <Paragraph>
              {MaskApply.printMonthYearFromTimestamp(creditCard.expiry)}
            </Paragraph>
          </Box>

          <Box>
            <Title>
              CVC:
            </Title>
            <Paragraph>
              ***
            </Paragraph>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default CreditCardData;