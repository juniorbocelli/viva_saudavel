import React from 'react';
import {
  Button,
} from '@mui/material';
import DataTable from "react-data-table-component";
import SortIcon from "@mui/icons-material/ArrowDownward";
import { useNavigate } from 'react-router-dom';

import { Client } from '../../../../../globals/interfaces/client';
import { IUseStates } from '../../states';
import MaskApply from '../../../../../features/utils/MaskApply';
import * as Routes from '../../../../../globals/routes';

const columns: any = [
  {
    name: "Nome",
    selector: (row: Client) => row.name,
    sortable: true,
    width: "200px",
    wrap: true,
  },
  {
    name: "CPF",
    selector: (row: Client) => row.cpf,
    sortable: false,

  },
  {
    name: "E-mail",
    selector: (row: Client) => row.email,
    sortable: true,
    wrap: false,

  },
  {
    name: "Celular",
    selector: (row: Client) => MaskApply.maskCellPhone(row.cellPhone),
    sortable: true,
    wrap: false
  },
  {
    name: "CEP",
    selector: (row: Client) => MaskApply.maskCep(row.address.cep),
    sortable: true,
    wrap: false
  },
  {
    name: "Ações",
    cell: (row: Client) => {

      return (
        <div key={row.id}>
          <Button
            variant="outlined"
            size="small"
            color="error"
            sx={
              {
                mr: '5px'
              }
            }
          >
            {true ? "Desativar" : "Reativar"}
          </Button>
        </div>
      );
    },
    sortable: false,
    compact: true,
  },
];

interface IProductsListTableProps {
  clients: IUseStates['clients'];
};

const ClientsListTable: React.FC<IProductsListTableProps> = ({ clients }) => {
  const navigation = useNavigate();

  const handleRowClick = (row: Client) => {
    console.log("Row data", row);
    navigation(Routes.SCREEN_ADMIN_PRODUCT_EDIT.replace(':id', row.id as string));
  };

  return (
    <div>
      <DataTable
        title="Lista de clientes"
        responsive={false}

        columns={columns}
        data={clients}
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

export default ClientsListTable;