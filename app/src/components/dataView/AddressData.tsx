import React from 'react';
import {
  Box,
  Typography,

  useTheme,
} from '@mui/material';

import Title from './components/Title';
import Paragraph from './components/Paragraph';

import { Address } from '../../globals/interfaces/client';

import MaskApply from '../../features/utils/MaskApply';

interface IAddressDataProps {
  address: Address;
};

const AddressData: React.FC<IAddressDataProps> = ({ address }) => {
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
        Dados para Entrega
      </Typography>

      <Box
        sx={
          {
            backgroundColor: theme.palette.grey['300'],
            p: theme.spacing(2)
          }
        }
      >
        <Title>
          CEP:
            </Title>
        <Paragraph>
          {address && MaskApply.maskCep(address.cep)}
        </Paragraph>

        <Box sx={{ display: 'flex' }}>
          <Box sx={{ mr: theme.spacing(4) }}>
            <Title>
              Logradouro:
            </Title>
            <Paragraph>
              {address?.street}
            </Paragraph>
          </Box>

          <Box>
            <Title>
              Número:
            </Title>
            <Paragraph>
              {address?.number}
            </Paragraph>
          </Box>
        </Box>

        <Title>
          Bairro:
        </Title>
        <Paragraph>
          {address?.district}
        </Paragraph>

        <Title>
          Cidade:
        </Title>
        <Paragraph>
          {`${address?.city}-${address?.state}`}
        </Paragraph>

        <Title>
          Complemento:
        </Title>
        <Paragraph>
          {address?.complement}
        </Paragraph>

      </Box>
    </div>
  )
};

export default AddressData;