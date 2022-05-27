import React from 'react';
import {
  Grid,
} from '@mui/material';
import { useParams } from 'react-router-dom';

import MainContentBox from '../../../ui/components/pages/MainContentBox';
import ClientData from '../../../components/dataView/ClientData';
import AddressData from '../../../components/dataView/AddressData';

import useStates from './states';
import useAPIs from './apis';
import { useAuth } from '../../../features/auth/context';

const InvoiceView: React.FC<React.ReactFragment> = () => {
  const states = useStates();
  const apis = useAPIs(states);
  const auth = useAuth();
  const params = useParams();

  // Effects
  React.useEffect(() => {
    if (typeof (params.id) !== 'undefined')
      if (auth.loggedClient)
        apis.getClientInvoice(auth.loggedClient.id as string, params.id);
  }, [params.id, auth.loggedClient]);

  return (
    <MainContentBox states={states} primary='Pedido'>
      {
        states.invoice !== null &&
        <React.Fragment>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <ClientData client={states.invoice.receiverData} />
            </Grid>

            <Grid item xs={12} md={6}>
              <AddressData address={states.invoice.receiverAddress} />
            </Grid>
          </Grid>
        </React.Fragment>
      }
    </MainContentBox>
  );
};

export default InvoiceView;