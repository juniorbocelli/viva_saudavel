import React from 'react';
import {
  Box,
  Typography,
  Stack,

  useTheme,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import MaskApply from '../../../../features/utils/MaskApply';

interface IFrequencyResumeProps {
  qtdItems: number;
  price: number;
  frequency: string;
  nextDelivery: Date | null;
};

const FrequencyResume: React.FC<IFrequencyResumeProps> = ({ qtdItems, price, frequency, nextDelivery }) => {
  const theme = useTheme();

  return (
    <Box>
      <Box sx={{ mb: { xs: theme.spacing(2.0), md: theme.spacing(3.0) } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: theme.spacing(1.0), md: theme.spacing(2.0) } }}>
          <CalendarMonthIcon sx={{ fontSize: { md: '2.0rem' } }} color='primary' />

          <Typography
            variant='h6'
            component='div'
            sx={
              {
                fontWeight: 600,
                fontSize: { xs: '1.3rem', md: '1.6rem' },
                ml: theme.spacing(1.0),
              }
            }
          >
            {`${frequency} (${qtdItems} itens)`}
          </Typography>
        </Box>

        <Stack
          direction={{ xs: 'row', sm: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 4 }}

          sx={
            {
              mb: theme.spacing(0)
            }
          }
        >
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
            Valor:
          </Typography>

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
            R$ {MaskApply.maskMoney(price)}
          </Typography>
        </Stack>

        <Stack
          direction={{ xs: 'row', sm: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 4 }}

          sx={
            {
              mb: theme.spacing(0)
            }
          }
        >
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
              nextDelivery !== null ?
                MaskApply.printDateFromTimestamp(nextDelivery)
                :
                'Não há'
            }
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default FrequencyResume;