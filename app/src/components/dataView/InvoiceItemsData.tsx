import React from 'react'
import {
  Typography,
  Box,

  useTheme,
} from '@mui/material';

import Title from './components/Title';
import Paragraph from './components/Paragraph';

import { InvoiceProductData } from '../../globals/interfaces/invoice';

import MaskApply from '../../features/utils/MaskApply';

interface IInvoiceItemsData {
  items: Array<InvoiceProductData>;
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
            mb: theme.spacing(2)
          }
        }
      >
        Produtos
      </Typography>
      {
        items.map((item) => {
          return (
            <Box
              sx={
                {
                  backgroundColor: theme.palette.grey['300'],
                  p: theme.spacing(2)
                }
              }
            >
              <Title>
                {item.name}
              </Title>

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Paragraph>
                  Produtor: {item.producer}
                </Paragraph>

                <Paragraph>
                  Quantidade: {item.measure}
                </Paragraph>

                <Paragraph>
                  Preço: {MaskApply.maskMoney(item.price)}
                </Paragraph>
              </Box>
            </Box>
          )
        })
      }
    </div>
  );
};

export default InvoiceItemData;