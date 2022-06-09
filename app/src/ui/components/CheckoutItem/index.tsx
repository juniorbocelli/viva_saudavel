import React from 'react';
import {
  Box,
  Typography,

  useTheme,
} from '@mui/material';

import { Product } from '../../../globals/interfaces/product';
import MaskApply from '../../../features/utils/MaskApply';

interface ICheckoutItemProps {
  checkoutItem: Product;
};

const CheckoutItem: React.FC<ICheckoutItemProps> = ({ checkoutItem }) => {
  const theme = useTheme();
  return (
    <Box>
      <Box
        sx={
          {
            display: 'flex',
          }
        }
      >
        <Box
          sx={
            {
              width: { xs: '17%', md: '20%' },
              ml: { xs: theme.spacing(0.5), md: theme.spacing(1) }
            }
          }
        >
          <img width='100%' src={checkoutItem.thumb} alt={`Imagem de produto ${checkoutItem.id} do carrinho`} />
        </Box>

        <Box
          sx={
            {
              p: theme.spacing(0.5)
            }
          }
        >
          <Typography
            variant='h6'
            component='div'
            sx={
              {
                fontSize: { xs: '1.0rem', md: '1.4rem' }
              }
            }
          >
            {checkoutItem.name}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
            <Typography
              variant='h5'
              component='div'
              sx={
                {
                  fontSize: { xs: '1.1rem', md: '1.5rem' },
                  fontWeight: 600
                }
              }
              color='text.secondary'
            >
              {`R$ ${MaskApply.maskMoney(checkoutItem.price)}`}
            </Typography>

            <Typography variant='body1' color='text.secondary'>
              /item
            </Typography>
          </Box>
        </Box>

      </Box>
    </Box>
  );
};

export default CheckoutItem;