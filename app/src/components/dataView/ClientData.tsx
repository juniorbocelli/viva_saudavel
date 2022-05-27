import React from 'react';
import {
  Box,
  Typography,

  useTheme,
} from '@mui/material';

import Title from './components/Title';
import Paragraph from './components/Paragraph';

import { Client } from '../../globals/interfaces/client';
import { InvoiceReceiverData } from '../../globals/interfaces/invoice';

import MaskApply from '../../features/utils/MaskApply';

interface IClientDataProps {
  client: Client | InvoiceReceiverData;
};

const ClientData: React.FC<IClientDataProps> = ({ client }) => {
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
        Dados do Cliente
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
          Nome:
          </Title>
        <Paragraph>
          {client.name}
        </Paragraph>

        <Title>
          CPF:
          </Title>
        <Paragraph>
          {MaskApply.maskCpf(client.cpf)}
        </Paragraph>

        <Title>
          E-mail:
          </Title>
        <Paragraph>
          {client.email}
        </Paragraph>

        <Title>
          Celular:
          </Title>
        <Paragraph>
          {MaskApply.maskCellPhone(client.cellPhone)}
        </Paragraph>

        {
          typeof (client as Client).phone !== 'undefined' &&
          <React.Fragment>
            <Title>
              Celular:
              </Title>
            <Paragraph>
              {MaskApply.maskPhone((client as Client).phone!)}
            </Paragraph>
          </React.Fragment>
        }

      </Box>
    </div>
  )
};

export default ClientData;