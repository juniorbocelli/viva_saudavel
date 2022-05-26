import React from 'react';
import {
  Grid,
  Box,
  Typography,

  useTheme,
} from '@mui/material';

import { Client, Address } from '../../globals/interfaces/client';
import { InvoiceReceiverData } from '../../globals/interfaces/invoice';

export interface IClientDataViewProps {
  client: Client | InvoiceReceiverData;
  address?: Address;

  showClient?: boolean;
  showAddress?: boolean;
};

const ClientDataView: React.FC<IClientDataViewProps> = ({ client, address, showClient, showAddress }) => {
  const theme = useTheme();

  return (
    <Grid container>
      {/* Client */}
      <Grid xs={12} md={6} item>
        <Typography>
          Dados do Cliente
        </Typography>

      </Grid>

      {/* Client */}
      <Grid xs={12} md={6} item>
        <Typography>
          Dados de Entrega
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ClientDataView;