import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box, useTheme } from '@mui/material';

import { Products, Product } from '../../../features/globalContext/types';
import ProductCard from '../../../ui/components/ProductCard';

interface IProductGalleryProps {
  products: Products;
  setProduct: React.Dispatch<React.SetStateAction<Product | null>>;
  filters?: Array<string>;
};



const ProductGallery: React.FC<IProductGalleryProps> = ({ products, setProduct, filters }) => {
  const theme = useTheme();

  const settings_md = {
    dots: false,
    arrrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <ArrowForwardIosIcon sx={{ color: theme.palette.primary.main }} />,
    prevArrow: <ArrowBackIosIcon sx={{ color: theme.palette.primary.main }} />,
  };

  const settings_sx = {
    dots: false,
    arrrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <ArrowForwardIosIcon sx={{ color: theme.palette.primary.main }} />,
    prevArrow: <ArrowBackIosIcon sx={{ color: theme.palette.primary.main }} />,
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mb: { xs: theme.spacing(2), md: 0 } }}>
      <Box sx={{ width: '90%', display: { xs: 'block', md: 'none' } }}>
        <Slider {...settings_sx}>
          {
            products.map((product, key) => {
              return (
                <ProductCard product={product} setProduct={setProduct} key={key} />
              );
            })
          }
        </Slider>
      </Box>

      <Box sx={{ width: '90%', display: { xs: 'none', md: 'block' } }}>
        <Slider {...settings_md}>
          {
            products.map((product, key) => {
              return (
                <ProductCard product={product} setProduct={setProduct} key={key} />
              );
            })
          }
        </Slider>
      </Box>
    </Box>
  );
};

export default ProductGallery;