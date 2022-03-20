import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider, { CustomArrowProps } from "react-slick";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {
  Box,

  useTheme,
} from '@mui/material';

interface Props {
  images: Array<string>
}

const SlickButtonFix: React.FC<CustomArrowProps> = ({ currentSlide, slideCount, children, ...props }) => (
  <span  {...props}> {children} </span>
);

const ProductImageGallery: React.FC<Props> = ({ images }) => {
  const theme = useTheme();
  const settings = {
    dots: true,
    arrrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SlickButtonFix><ArrowForwardIosIcon sx={{ color: theme.palette.primary.main }} /></SlickButtonFix>,
    prevArrow: <SlickButtonFix><ArrowBackIosIcon sx={{ color: theme.palette.primary.main }} /></SlickButtonFix>,
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mb: { xs: theme.spacing(2), md: 0 } }}>
      <Box sx={{ width: '90%', }}>
        <Slider {...settings}>
          {
            images.map((item, key) => {
              return (
                <div key={key}>
                  <img width='100%' src={item} alt={`Foto ${key} do produto`} />
                </div>
              );
            })
          }
        </Slider>
      </Box>
    </Box>
  );
};

export default ProductImageGallery;