import React from 'react'
import {
  Typography,
  Box,

  useTheme,
} from '@mui/material';

import Title from './components/Title';
import Paragraph from './components/Paragraph';

import { InvoiceProductData } from '../../globals/interfaces/invoice';
import { Product } from '../../globals/interfaces/product';

interface IInvoiceItemsData {
  items: Array<InvoiceProductData> | Array<Product>;
};

const InvoiceItemData: React.FC<IInvoiceItemsData> = ({ items }) => {
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
            mb: theme.spacing(3)
          }
        }
      >
        Produtos
      </Typography>

      <Box
        sx={
          {
            backgroundColor: theme.palette.grey['300'],
            p: theme.spacing(2)
          }
        }
      >
        
      </Box>
    </div>
  );
};

export default InvoiceItemData;