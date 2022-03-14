import React from 'react';
import { Box, Toolbar } from '@mui/material';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Cart from './components/Cart';

import useStates from './states';

const drawerWidth = 240;

interface INavigationProps {
  children?: React.ReactNode;
};

const Navigation: React.FC<INavigationProps> = ({ children }) => {
  const states = useStates();

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar {...states} />

      <Sidebar states={states} />
      <Cart {...states} />
      
      <Box
        component="main"
        sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)`, xs: '100%' } }}
      >
        <Toolbar />

        {children}

      </Box>
    </Box>
  );
};

export default Navigation;