import React from 'react';

import MainContentBox from '../../ui/components/pages/MainContentBox';
import ProductGallery from '../../ui/components/ProductGallery';
import ProductModal from '../../ui/components/ProductModal';

import { useGlobalContext } from '../../features/globalContext/context';

import useStates from './states';

const Home: React.FC<React.ReactFragment> = (props) => {
  const globalContext = useGlobalContext();
  const states = useStates();

  return (
    <MainContentBox primary="Título da Página">
      <ProductModal product={states.selectedProduct} setProduct={states.setSelectedProduct} />

      <ProductGallery products={globalContext.products} setProduct={states.setSelectedProduct} />
    </MainContentBox>
  );
};

export default Home;