import React from 'react';
import { useParams } from 'react-router-dom';

import MainContentBox from '../../../ui/components/pages/MainContentBox';
import ClientDataView from '../../../components/ClientDataView';

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
        <ClientDataView client={states.invoice.receiverData} address={states.invoice.receiverAddress} />
      }
    </MainContentBox>
  );
};

export default InvoiceView;