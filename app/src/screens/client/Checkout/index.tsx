import React from 'react';
import {
  Grid,
  Box,
} from '@mui/material';

const Checkout: React.FC<React.ReactFragment> = () => {
  return (
    <Grid container>
      {/* Cart Items */}
      <Grid item xs={6} sm={12}>
        Buceta
      </Grid>

      {/* Checkout Informations */}
      <Grid item xs={6} sm={12}>
        Xoxóta
      </Grid>
    </Grid>
  );
};

export default Checkout;