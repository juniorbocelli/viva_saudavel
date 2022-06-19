import React from 'react';

import ProductsListTable from './components/ProductsListTable';
import AdminMainContentBox from '../../../ui/components/pages/AdminMainContentBox';

import useStates from './states';
import useAPIs from './apis';
import useEffects from './effects';

const ProductsList: React.FC<React.ReactFragment> = () => {
  const states = useStates();
  const apis = useAPIs(states);
  const effects = useEffects(apis);

  effects.useComponentDidMount();

  return (
    <AdminMainContentBox primary="Produtos" states={states} pageTitle="Dashboard Produtos">
      <ProductsListTable products={states.products} />
    </AdminMainContentBox>
  );
};

export default ProductsList;