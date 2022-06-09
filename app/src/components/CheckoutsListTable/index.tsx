import React from 'react';
import {
  Chip,

  useTheme,
} from '@mui/material';
import DataTable from "react-data-table-component";
import SortIcon from "@mui/icons-material/ArrowDownward";
import { useNavigate } from 'react-router-dom';

import { CheckoutAPI } from '../../globals/interfaces/checkout';
import { Client } from '../../globals/interfaces/client';
import { CartItemAPI } from '../../globals/interfaces/cart';
import { Product } from '../../globals/interfaces/product';

import { IUseStates } from '../../screens/admin/AdminCheckoutsList/states';
import MaskApply from '../../features/utils/MaskApply';
import * as Routes from '../../globals/routes';

import { useAuth } from '../../features/auth/context';

const getValue = (frequency: CartItemAPI['frequency'], items: CheckoutAPI['items']): number => {
  let total: number = 0.00;

  items.forEach(item => {
    if (item.frequency === frequency)
      total = total + (item.product as Product).price;
  });

  return total;
};

const columnsAdmin: Array<any> = [
  {
    name: "Cliente",
    selector: (row: CheckoutAPI) => (row.client as Client).name,
    sortable: true,
    width: "350px",
    wrap: true,
  },

  {
    name: "Dia de entrega",
    selector: (row: CheckoutAPI) => MaskApply.getPTWeekDayFromEN(row.deliveryDay),
    sortable: true,
  },

  {
    name: "Criada em",
    selector: (row: CheckoutAPI) => MaskApply.printDateFromTimestamp(row.createdAt!),
    sortable: true,
    wrap: true,
  },

  {
    name: "Ativa?",
    cell: (row: CheckoutAPI) => {
      if (row.isActive)
        return (
          <Chip
            label='Ativa'
            color='primary'
            size='small'
          />
        );
      else
        return (
          <Chip
            label='Inativa'
            color='secondary'
            size='small'
          />
        );
    },
    sortable: true,
    compact: true,
  },
];

const columnsClient: Array<any> = [
  {
    name: "Criada em",
    selector: (row: CheckoutAPI) => MaskApply.printDateFromTimestamp(row.createdAt!),
    sortable: true,
    wrap: true,
  },

  {
    name: "Dia de entrega",
    selector: (row: CheckoutAPI) => MaskApply.getPTWeekDayFromEN(row.deliveryDay),
    sortable: true,
  },

  {
    name: "Uma vez",
    cell: (row: CheckoutAPI) => {

      return `R$ ${MaskApply.maskMoney(getValue('once', row.items))}`;
    },
    sortable: true,
    compact: true,
  },

  {
    name: "Mensal",
    cell: (row: CheckoutAPI) => {

      return `R$ ${MaskApply.maskMoney(getValue('weekly', row.items))}`;
    },
    sortable: true,
    compact: true,
  },

  {
    name: "Quinzenal",
    cell: (row: CheckoutAPI) => {

      return `R$ ${MaskApply.maskMoney(getValue('biweekly', row.items))}`;
    },
    sortable: true,
    compact: true,
  },

  {
    name: "Mensal",
    cell: (row: CheckoutAPI) => {

      return `R$ ${MaskApply.maskMoney(getValue('monthly', row.items))}`;
    },
    sortable: true,
    compact: true,
  },

  {
    name: "Ativa?",
    cell: (row: CheckoutAPI) => {
      if (row.isActive)
        return (
          <Chip
            label='Ativa'
            color='primary'
            size='small'
          />
        );
      else
        return (
          <Chip
            label='Inativa'
            color='secondary'
            size='small'
          />
        );
    },
    sortable: true,
    compact: true,
  },
];

interface ICheckoutsListTableProps {
  checkouts: IUseStates['checkouts'];
};

const CheckoutssListTable: React.FC<ICheckoutsListTableProps> = ({ checkouts }) => {
  const navigation = useNavigate();
  const auth = useAuth();

  const handleRowClick = (row: CheckoutAPI) => {
    if (auth.isAdmin())
      navigation(Routes.SCREEN_ADMIN_CHECKOUT_GET.replace(':id', row.id as string));
    else
      navigation(Routes.SCREEN_CLIENT_CHECKOUT_GET.replace(':id', row.id as string));
  };

  return (
    <div>
      <DataTable
        title="Lista de cestas"
        responsive={false}

        columns={auth.isAdmin() ? columnsAdmin : columnsClient}
        data={checkouts}
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