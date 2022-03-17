import React from 'react';

import MainContentBox from '../../ui/components/pages/MainContentBox';
import ProductCard from '../../ui/components/ProductCard';
import ProductModal from '../../ui/components/ProductModal';

import { useGlobalContext } from '../../features/globalContext/context';
import { Product } from '../../features/globalContext/types';
import useStates from './states';

const Home: React.FC<React.ReactFragment> = (props) => {
  const globalContext = useGlobalContext();
  const states = useStates();

  return (
    <MainContentBox primary="Título da Página">
      <ProductModal product={states.selectedProduct} setProduct={states.setSelectedProduct} />

      {
        globalContext.products.map((product, key) => {
          return (<ProductCard product={product} setProduct={states.setSelectedProduct} key={key} />);
        })
      }
    </MainContentBox>
  );
};

export default Home;