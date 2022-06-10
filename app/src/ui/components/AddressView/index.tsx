import React from 'react';
import {
  Box,
  Typography,
  IconButton,

  useTheme
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../../features/auth/context';
import MaskApply from '../../../features/utils/MaskApply';
import * as Routes from '../../../globals/routes';

const AddressView: React.FC<React.ReactFragment> = () => {
  const theme = useTheme();
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    auth.loggedClient ?
      <Box
        sx={
          {
            backgroundColor: theme.palette.grey['300'],
            p: theme.spacing(2),
            ml: { xs: 0, md: theme.spacing(2), },

            display: 'flex',
          }
        }
      >

        <Box
          sx={
            {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mr: { xs: theme.spacing(1.5), md: theme.spacing(2) },
            }
          }
        >
          <HomeIcon sx={{ fontSize: { xs: '2.5rem', md: '3rem' } }} />
        </Box>

        <Typography
          variant='body1'
          component='div'

          sx={
            {
              fontWeight: 500,
              fontSize: { xs: '0.9rem', md: '1.4rem' },
              lineHeight: '2rem',
              flexGrow: 1,
            }
          }
        >
          {auth.loggedClient.address.street}, {auth.loggedClient.address.number}
          <br />
        CEP: {MaskApply.maskCep(auth.loggedClient.address.cep)}
          <br />
        Bairro: {auth.loggedClient.address.district}
          <br />
          {auth.loggedClient.address.city}-{auth.loggedClient.address.state}
        </Typography>

        <IconButton sx={{ width: '40px', height: '40px', ml: '10px' }} onClick={() => navigate(Routes.SCREEN_CLIENT_GET)}>
          <EditIcon />
        </IconButton>
      </Box>
      :
      null
  );
};

export default AddressView;