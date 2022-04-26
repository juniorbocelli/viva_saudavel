import React from 'react';
import {
  Button,
} from '@mui/material';
import DataTable from "react-data-table-component";
import SortIcon from "@mui/icons-material/ArrowDownward";
import { useNavigate } from 'react-router-dom';

import { Product } from '../../types';
import { IUseStates } from '../../states';
import MaskApply from '../../../../../features/utils/MaskApply';
import * as Routes from '../../../../../globals/routes';

const columns: any = [
  {
    name: "Imagem",
    cell: (row: Product) => {
      return (<img src={row.thumb} alt={`Thumb de ${row.id}`} height='80px' />);
    },
  },
  {
    name: "Nome",
    selector: (row: Product) => row.name,
    sortable: true,
    width: "350px",
    wrap: true,
  },
  {
    name: "Quantidade",
    selector: (row: Product) => row.measure,
    sortable: true,

  },
  {
    name: "Produtor",
    selector: (row: Product) => row.producer,
    sortable: true,
    wrap: true,

  },
  {
    name: "Preço",
    selector: (row: Product) => `R$ ${MaskApply.maskMoney(row.price)}`,
    sortable: true,
    wrap: true
  },
  {
    name: "Estoque",
    selector: (row: Product) => row.quantity,
    sortable: true,
    wrap: true
  },
  {
    name: "Ações",
    cell: (row: Product) => {

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
  products: IUseStates['products'];
};

const ProductsListTable: React.FC<IProductsListTableProps> = ({ products }) => {
  const navigation = useNavigate();

  const handleRowClick = (row: Product) => {
    console.log("Row data", row);
    navigation(Routes.SCREEN_ADMIN_PRODUCT_EDIT.replace(':id', row.id as string));
  };

  return (
    <div>
      <DataTable
        title="Lista de produtos"
        responsive={false}

        columns={columns}
        data={products}
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

export default ProductsListTable;