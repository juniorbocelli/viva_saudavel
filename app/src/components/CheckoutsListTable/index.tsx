import React from 'react';
import DataTable from "react-data-table-component";
import SortIcon from "@mui/icons-material/ArrowDownward";
import { useNavigate } from 'react-router-dom';

import { Checkout } from '../../globals/interfaces/checkout';
import { Client } from '../../globals/interfaces/client';
import { CartItem } from '../../globals/interfaces/cart';

import { IUseStates } from '../../screens/admin/AdminCheckoutsList/states';
import MaskApply from '../../features/utils/MaskApply';
import * as Routes from '../../globals/routes';

const getValue = (frequency: CartItem['frequency'], items: Checkout['items']): number => {
  let total: number = 0.00;

  items.forEach(item => {
    if (item.frequency === frequency)
      total = total + item.price;
  });

  return total;
};

const columns: any = [
  {
    name: "Cliente",
    selector: (row: Checkout) => (row.client as Client).name,
    sortable: true,
    width: "350px",
    wrap: true,
  },
  {
    name: "Dia de entrega",
    selector: (row: Checkout) => MaskApply.getPTWeekDayFromEN(row.deliveryDay),
    sortable: true,
  },

  {
    name: "Única",
    cell: (row: Checkout) => {

      return `R$ ${MaskApply.maskMoney(getValue('once', row.items))}`;
    },
    sortable: true,
    compact: true,
  },

  {
    name: "Mensal",
    cell: (row: Checkout) => {

      return `R$ ${MaskApply.maskMoney(getValue('weekly', row.items))}`;
    },
    sortable: true,
    compact: true,
  },

  {
    name: "Quinzenal",
    cell: (row: Checkout) => {

      return `R$ ${MaskApply.maskMoney(getValue('biweekly', row.items))}`;
    },
    sortable: true,
    compact: true,
  },

  {
    name: "Mensal",
    cell: (row: Checkout) => {

      return `R$ ${MaskApply.maskMoney(getValue('monthly', row.items))}`;
    },
    sortable: true,
    compact: true,
  },

  {
    name: "Criada",
    selector: (row: Checkout) => MaskApply.printDateFromTimestamp(row.createdAt!),
    sortable: true,
    wrap: true,
  },
];

interface ICheckoutsListTableProps {
  checkouts: IUseStates['checkouts'];
};

const CheckoutssListTable: React.FC<ICheckoutsListTableProps> = ({ checkouts }) => {
  const navigation = useNavigate();

  const handleRowClick = (row: Checkout) => {
    console.log("Row data", row);
    navigation(Routes.SCREEN_ADMIN_PRODUCT_EDIT.replace(':id', row.id as string));
  };

  return (
    <div>
      <DataTable
        title="Lista de cestas"
        responsive={false}

        columns={columns}
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