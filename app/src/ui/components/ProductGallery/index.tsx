import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider, { CustomArrowProps } from "react-slick";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box, useTheme } from '@mui/material';

import { Product, ProductCard } from '../../../globals/interfaces/product';
import ProductCardComponent from '../../../ui/components/ProductCard';

interface IProductGalleryProps {
  productCards: Array<ProductCard>;
  setProduct: React.Dispatch<React.SetStateAction<Product | null>>;
  filters?: Array<string>;
};

const SlickButtonFix: React.FC<CustomArrowProps> = ({ currentSlide, slideCount, children, ...props }) => (
  <span  {...props}> {children} </span>
);

const ProductGallery: React.FC<IProductGalleryProps> = ({ productCards, setProduct, filters }) => {
  const theme = useTheme();

  const settings_xl = {
    dots: false,
    arrrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    nextArrow: <SlickButtonFix><ArrowForwardIosIcon sx={{ color: theme.palette.primary.main }} /></SlickButtonFix>,
    prevArrow: <SlickButtonFix><ArrowBackIosIcon sx={{ color: theme.palette.primary.main }} /></SlickButtonFix>,
  };

  const settings_sx = {
    dots: false,
    arrrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SlickButtonFix><ArrowForwardIosIcon sx={{ color: theme.palette.primary.main }} /></SlickButtonFix>,
    prevArrow: <SlickButtonFix><ArrowBackIosIcon sx={{ color: theme.palette.primary.main }} /></SlickButtonFix>,
  };

  const settings_md = {
    dots: false,
    arrrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <SlickButtonFix><ArrowForwardIosIcon sx={{ color: theme.palette.primary.main }} /></SlickButtonFix>,
    prevArrow: <SlickButtonFix><ArrowBackIosIcon sx={{ color: theme.palette.primary.main }} /></SlickButtonFix>,
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mb: { xs: theme.spacing(2), md: 0 } }}>
      <Box sx={{ width: '90%', display: { xs: 'block', md: 'none', xl: 'none' } }}>
        <Slider {...settings_sx}>
          {
            productCards.map((card, key) => {
              return (
                <ProductCardComponent productCard={card} setProduct={setProduct} key={key} />
              );
            })
          }
        </Slider>
      </Box>

      <Box sx={{ width: '90%', display: { xs: 'none', md: 'block', xl: 'none' } }}>
        <Slider {...settings_md}>
          {
            productCards.map((card, key) => {
              return (
                <ProductCardComponent productCard={card} setProduct={setProduct} key={key} />
              );
            })
          }
        </Slider>
      </Box>

      <Box sx={{ width: '90%', display: { xs: 'none', md: 'none', xl: 'block' } }}>
        <Slider {...settings_xl}>
          {
            productCards.map((card, key) => {
              return (
                <ProductCardComponent productCard={card} setProduct={setProduct} key={key} />
              );
            })
          }
        </Slider>
      </Box>
    </Box>
  );
};

export default ProductGallery;