import React from 'react';
import {
  Box,
  
  useTheme,
} from '@mui/material';

import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface Props {
  children?: React.ReactNode;
}

const AdminNavigation: React.FC<Props> = ({ children }) => {
  const theme = useTheme();

  return (
    <Box
      component='div'
      sx={
        {
          display: 'flex',
          width: '100%',
          flexGrow: 1,
        }
      }
    >
      <Navbar />
      <Sidebar />
      <Box
        component='main'
        sx={
          {
            display: 'block',
            mt: theme.spacing(6),
            width: { sm: `calc(100% - ${240}px)` },
          }
        }
      >
        {children}
      </Box>
    </Box>
  );
}

export default AdminNavigation;