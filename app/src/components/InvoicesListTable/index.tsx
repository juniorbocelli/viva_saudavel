import React from 'react';
import DataTable from "react-data-table-component";
import SortIcon from "@mui/icons-material/ArrowDownward";
import { useNavigate } from 'react-router-dom';

import { Invoice, getStatus, getFrequency } from '../../globals/interfaces/invoice';

import { useAuth } from '../../features/auth/context';

import MaskApply from '../../features/utils/MaskApply';
import * as Routes from '../../globals/routes';

const columns: any = [
  {
    name: "Data do pedido",
    selector: (row: Invoice) => MaskApply.printDateFromTimestamp(row.createdAt),
    sortable: true,
  },
  {
    name: "Data da entrega",
    selector: (row: Invoice) => MaskApply.printDateFromTimestamp(row.scheduledDeliveryDate),
    sortable: true,
  },
  {
    name: "Valor total",
    selector: (row: Invoice) => `R$ ${MaskApply.maskMoney(row.values.totalValue)}`,
    sortable: true,
  },
  {
    name: "Recorrência",
    cell: (row: Invoice) => {

      return getFrequency(row.frequency);
    },
    sortable: true,
    compact: true,
  },
  {
    name: "Status",
    cell: (row: Invoice) => {

      return getStatus(row.status);
    },
    sortable: true,
    compact: true,
  },
];

interface ICheckoutsListTableProps {
  invoices: Array<Invoice>;
};

const CheckoutssListTable: React.FC<ICheckoutsListTableProps> = ({ invoices }) => {
  const navigation = useNavigate();
  const auth = useAuth();

  const handleRowClick = (row: Invoice) => {
    if (auth.loggedClient)
      if (auth.loggedClient.isAdmin)
        navigation(Routes.SCREEN_ADMIN_INVOICE_GET
          .replace(':id', row.id as string));
      else
        navigation(Routes.SCREEN_CLIENT_INVOICE_GET
          .replace(':clientId', auth.loggedClient.id as string)
          .replace(':id', row.id as string));
  };

  return (
    <div>
      <DataTable
        title="Lista de pedidos"
        responsive={false}

        columns={columns}
        data={invoices}
        defaultSortAsc={true}
        sortIcon={<SortIcon />}
        pagination
        noContextMenu
        striped
        onRowClicked={handleRowClick}
      />

    </div>
  );
};

export default CheckoutssListTable;