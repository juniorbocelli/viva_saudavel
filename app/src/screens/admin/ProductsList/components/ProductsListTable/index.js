import React from 'react';
import {
  Button,
} from '@mui/material';
import DataTable from "react-data-table-component";
import SortIcon from "@mui/icons-material/ArrowDownward";

import useAPIs from '../../../../../services/products/apis';

const columns = [
  {
    name: "Nome",
    selector: "name",
    sortable: true,
    width: "350px",
    wrap: true,
  },
  {
    name: "Quantidade",
    selector: "measure",
    sortable: true,
    width: "90px",
  },
  {
    name: "Produtor",
    selector: "producer",
    sortable: true,
    wrap: true,
  },
  {
    name: "Preço",
    selector: "price",
    sortable: true,
    wrap: true
  },
  {
    name: "Ações",
    cell: (row) => {

      return (
        <div>
          <Button
            variant="contained"
            size="small"
            key={row.id}
            color="error"
            sx={
              {
                mr: '5px'
              }
            }
          >
            {true? "Desativar" : "Reativar"}
          </Button>
          <Button
            variant="contained"
            size="small"
            key={row.id}
            color="primary"
            disabled={false}
          >
            Editar
          </Button>
        </div>
      );
    },
    sortable: false,
    compact: true,
  },
];


const ProductsListTable = () => {
  const apis =  useAPIs();
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    setProducts(apis.getAllProducts());
  }, [])
  

  const handleRowClick = (row) => {
    console.log("Row data", row);
  };

  return (
    <div>
      <DataTable
        title="Lista de produtos"
        responsive={false}

        columns={columns}
        data={products}
        defaultSortField="id"
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