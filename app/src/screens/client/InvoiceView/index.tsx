import React from 'react';
import {
  Stack,
} from '@mui/material';
import { useParams } from 'react-router-dom';

import MainContentBox from '../../../ui/components/pages/MainContentBox';
import ClientData from '../../../components/dataView/ClientData';
import AddressData from '../../../components/dataView/AddressData';
import CreditCardData from '../../../components/dataView/CreditCardData';
import InvoiceItemsData from '../../../components/dataView/InvoiceItemsData';
import InvoiceData from '../../../components/dataView/InvoiceData';

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
        <Stack
          direction='column'
          spacing={{ xs: 4, md: 6 }}
        >
          <InvoiceData invoice={states.invoice} />

          <InvoiceItemsData items={states.invoice.items} />

          <CreditCardData creditCard={states.invoice.creditCardData} />

          <ClientData client={states.invoice.receiverData} />

          <AddressData address={states.invoice.receiverAddress} />
        </Stack>
      }
    </MainContentBox>
  );
};

export default InvoiceView;