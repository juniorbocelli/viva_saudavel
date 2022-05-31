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
        items.map((item, key) => {
          return (
            <Box
              sx={
                {
                  backgroundColor: theme.palette.grey['300'],
                  p: theme.spacing(2)
                }
              }

              key={key}
            >
              <Title>
                {item.name}
              </Title>

              <Box sx={{ display: 'flex', }}>

                <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                  <img src={item.thumb} alt={`Imagem do produto ${item.name}`} width='100px' />
                </Box>

                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                  <img src={item.thumb} alt={`Imagem do produto ${item.name}`} width='170px' />
                </Box>

                <Box>
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
            </Box>
          )
        })
      }
    </div>
  );
};

export default InvoiceItemData;