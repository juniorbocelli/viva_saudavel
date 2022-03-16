import React from 'react';

import MainContentBox from '../../../ui/components/pages/MainContentBox';
import ProductCard from '../../../ui/components/ProductCard';

import { useGlobalContext } from '../../../features/globalContext/context';

const ModelOne: React.FC<React.ReactFragment> = (props) => {
  const globalContext = useGlobalContext();
  return (
    <MainContentBox primary="Título da Página">
      {
        globalContext.products.map((product, key) => {
          return (<ProductCard {...product} />);
        })
      }
    </MainContentBox>
  );
};

export default ModelOne;