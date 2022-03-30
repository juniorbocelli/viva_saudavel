import React from 'react';
import {
  Box,
  Drawer,
  IconButton,
  Typography,

  useTheme,
} from '@mui/material';

import { Close as CloseIcon } from '@mui/icons-material';

import DrawerContent from './content';

import { IUseStates } from '../../states';

interface ISidebarProps {
  states: IUseStates;
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
};

export default function Sidebar(props: ISidebarProps) {
  const theme = useTheme();

  const {
    window,

    states: { isMobileOpen, setIsMobileOpen },
  } = props;

  const container = window !== undefined ? () => window().document.body : undefined;

  const handleDrawerToggle = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <Box
      component="nav"
      sx={{ flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        container={container}
        variant="temporary"
        open={isMobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={
          {
            keepMounted: true, // Better open performance on mobile.
          }
        }
        sx={
          {
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '100%' },
          }
        }
      >

        <Box
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          {/* Close Button */}
          <IconButton
            color="inherit"
            aria-label="close drawer"
            edge="start"
            onClick={handleDrawerToggle}
            size="large"
            sx={{ ml: theme.spacing(1), width: '50px', height: '50px' }}
          >
            <CloseIcon sx={{ fontSize: '2.7rem' }} />
          </IconButton>
          <Typography
            variant='h5'
            component='div'
            color={theme.palette.primary.dark}

            sx={{ fontWeight: 600 }}
          >
            Menu
          </Typography>
        </Box>

        <DrawerContent handleDrawerToggle={handleDrawerToggle} />
      </Drawer>
    </Box>
  );
};