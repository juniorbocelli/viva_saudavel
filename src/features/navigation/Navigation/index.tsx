import React from 'react';
import { Box, Toolbar } from '@mui/material';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

import useStates from './states';

const drawerWidth = 240;

interface INavigationProps {
  children?: React.ReactNode;
};

const Navigation: React.FC<INavigationProps> = ({ children }) => {
  const states = useStates();

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar drawerWidth={drawerWidth} states={states} />
      <Sidebar drawerWidth={drawerWidth} states={states} />

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />

        {children}

      </Box>
    </Box>
  );
};

export default Navigation;