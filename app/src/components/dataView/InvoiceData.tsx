import React from 'react';
import {
  Typography,
  Box,
  Button,

  useTheme,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import Title from './components/Title';
import Paragraph from './components/Paragraph';

import { Invoice } from '../../globals/interfaces/invoice';

import MaskApply from '../../features/utils/MaskApply';

interface IInvoiceDataProps {
  invoice: Invoice;
};

const InvoiceData: React.FC<IInvoiceDataProps> = ({ invoice }) => {
  const theme = useTheme();

  const getStatus = (status: Invoice['status']): string => {
    switch (status) {
      case 'awaitingPayment':
        return 'Aguardando pagamento';

      case 'paymentAccept':
        return 'Pagamento aceito'

      case 'paymentFailed':
        return 'Pagamento falhou';

      case 'preparingForShipping':
        return 'Preparando para envio';

      case 'dispatched':
        return 'Enviado';

      case 'delivered':
        return 'Entregue';

      case 'returned':
        return 'O pedido retornou';

      case 'canceled':
        return 'Pedido cancelado';

      case 'finished':
        return 'Pedido finalizado';

      default:
        return 'Desconhecido';
    }
  };

  const getFrequency = (frequency: Invoice['frequency']): string => {
    switch (frequency) {
      case 'all':
        return 'Primeiro pedido';

      case 'once':
        return 'Apenas uma vez'

      case 'weekly':
        return 'Semanal';

      case 'biweekly':
        return 'Quinzenal';

      case 'monthly':
        return 'Mensal';

      default:
        return 'Desconhecida';
    }
  };

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
        Dados do Pedido
      </Typography>

      <Box
        sx={
          {
            backgroundColor: theme.palette.grey['300'],
            p: theme.spacing(2)
          }
        }
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Title>
              Status:
            </Title>
            <Paragraph sx={{ color: theme.palette.secondary['main'] }}>
              {getStatus(invoice.status)}
            </Paragraph>
          </Box>

          <Button
            variant='contained'
            sx={
              {
                height: '2.2rem',
                display: { xs: 'none', md: 'flex' }
              }
            }
            startIcon={<ShoppingCartIcon />}
          >
            Ver carrinho
          </Button>
        </Box>

        <Box>
          <Button
            variant='outlined'
            sx={
              {
                display: { xs: 'flex', md: 'none' },
                my: theme.spacing(1)
              }
            }
            fullWidth
            size='small'
          >
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <ShoppingCartIcon sx={{fontSize: '1.2rem', mr: '5px'}} /> Ver carrinho
            </Box>
          </Button>
        </Box>

        <Title>
          Recorrência do pedido*
        </Title>
        <Paragraph>
          {getFrequency(invoice.frequency)}
        </Paragraph>

        <Title>
          Valor dos produtos:
        </Title>
        <Paragraph>
          R$ {MaskApply.maskMoney(invoice.values.productsValue)}
        </Paragraph>

        <Title>
          Valor do frete**:
        </Title>
        <Paragraph>
          R$ {MaskApply.maskMoney(invoice.values.shippingValue)}
        </Paragraph>

        <Title>
          Descontos:
        </Title>
        <Paragraph>
          R$ {MaskApply.maskMoney(invoice.values.discounts)}
        </Paragraph>

        <Title>
          Valor total:
        </Title>
        <Paragraph>
          {MaskApply.maskMoney(invoice.values.totalValue)}
        </Paragraph>

        <Title>
          Data do pedido:
        </Title>
        <Paragraph>
          {MaskApply.printDateFromTimestamp(invoice.createdAt)}
        </Paragraph>

        <Title>
          Data da entrega:
        </Title>
        <Paragraph>
          {MaskApply.printDateFromTimestamp(invoice.scheduledDeliveryDate)}
        </Paragraph>

        <Typography variant='body2' color='text.secondary' sx={{ mb: theme.spacing(1) }}>
          * No primeiro pedido você receberá todos os produtos de uma só vez e nos próximos, de acordo com a recorrência
          de cada item.
        </Typography>

        <Typography variant='body2' color='text.secondary'>
          ** Nos pedidos com recorrência o frete é cobrado somente uma vez, sempre na primeira entrega de cada mês.
        </Typography>
      </Box>
    </div>
  );
};

export default InvoiceData;