import React from 'react';
import {
  Box,
  Toolbar,
  Paper,
  InputBase,
  IconButton,

  useTheme,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search'

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Cart from './components/Cart';

import useStates from './states';

interface INavigationProps {
  children?: React.ReactNode;
};

const Navigation: React.FC<INavigationProps> = ({ children }) => {
  const states = useStates();
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar {...states} />

      <Sidebar states={states} />
      <Cart {...states} />

      <Box
        component="main"
        sx={
          {
            flexGrow: 1,
            width: '100%',
            mt: { xs: 0, md: '70px' },
            backgroundColor: theme.palette.grey[50]
          }
        }
      >
        <Toolbar />

        <Box sx={
          {
            flexGrow: 1,
            justifyContent: 'center',
            display: { xs: 'flex', md: 'none' },
            mt: theme.spacing(1)
          }
        }
        >
          <Paper
            component="form"
            sx={
              {
                alignItems: 'center',
              }
            }
          >
            <InputBase
              sx={{ ml: 1, flexGrow: 1, }}
              placeholder="Busque seu produto..."
              inputProps={{ 'aria-label': 'campo de busca principal' }}
              size="small"
            />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>

        {children}

      </Box>
    </Box>
  );
};

export default Navigation;