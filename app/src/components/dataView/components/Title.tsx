import React from 'react';
import {
  Typography,
} from '@mui/material';

const Title: React.FC<React.ReactFragment> = ({ children }) => {
  return (
    <Typography
      variant='h6'
      component='div'

      sx={
        {
          fontSize: { xs: '1rem', md: '1.5rem' },
          fontWeight: 'bold',
        }
      }
    >
      {children}
    </Typography>
  );
};

export default Title;