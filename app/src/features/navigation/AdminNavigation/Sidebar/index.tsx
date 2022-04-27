import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Toolbar,
  Collapse,
  Box,
} from '@mui/material';
import { matchPath, useLocation } from 'react-router-dom';

import IconExpandLess from '@mui/icons-material/ExpandLess'
import IconExpandMore from '@mui/icons-material/ExpandMore'
import DescriptionIcon from '@mui/icons-material/Description';

import ChildItem from './components/ChildItem';
import * as Routes from '../../../../globals/routes';

const drawerWidth = 240;

interface MenuItem {
  label: string;
  to: string;
}
const clientMenu: Array<MenuItem> = [
  {
    label: "Todos os clientes",
    to: Routes.SCREEN_ADMIN_CLIENTS,
  },
];

const productMenu: Array<MenuItem> = [
  {
    label: "Todos os produtos",
    to: Routes.SCREEN_ADMIN_PRODUCTS,
  },
  {
    label: "Novo produto",
    to: Routes.SCREEN_ADMIN_PRODUCT_CREATE,
  }
];

export default function Navbar() {
  const location = useLocation();
  const buceta = matchPath(Routes.SCREEN_ADMIN_CLIENTS, location.pathname);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  console.log('buceta', buceta);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (isOpen(event.currentTarget.getAttribute('data-control')))
      setAnchorEl(null);
    else
      setAnchorEl(event.currentTarget);
  };

  const isOpen = (dataControl: string | null): boolean => {
    if (anchorEl !== null)
      return anchorEl.getAttribute('data-control') === dataControl;
    else
      return false;
  };

  const isActive = (list: Array<MenuItem>): boolean => {
    for (let i = 0; i < list.length; i++)
      if (!!matchPath(list[i].to, location.pathname))
        return true;

    return false;
  };

  return (
    <Drawer
      sx={
        {
          width: drawerWidth,
          flexShrink: 0,
        }
      }
      variant="permanent"
    >
      <Toolbar />

      <Box sx={{ overflow: 'auto', }}
      >
        <List sx={{ width: `${drawerWidth}px`, }}>

          {/**
           * Clients
           */}
          <ListItem
            button onClick={handlePopoverOpen}
            sx={{ width: `${drawerWidth - 1}px`, }}
            data-control='client'
            selected={isOpen('client') || isActive(clientMenu)}
          >
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary="Clientes" sx={{ fontSize: '1.0rem', }} />
            {isOpen('client') ? <IconExpandLess /> : <IconExpandMore />}
          </ListItem>

          <Collapse in={isOpen('client')} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
              {
                clientMenu.map((item, key) => {
                  return (<ChildItem key={key} label={item.label} to={item.to} drawerWidth={drawerWidth} />)
                })
              }
              <Divider />
            </List>
          </Collapse>

          {/**
           * Products
           */}
          <ListItem
            button onClick={handlePopoverOpen}
            sx={{ width: `${drawerWidth - 1}px`, }}
            data-control='product'
            selected={isOpen('product') || isActive(productMenu)}
          >
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary="Produtos" sx={{ fontSize: '1.0rem', }} />
            {isOpen('product') ? <IconExpandLess /> : <IconExpandMore />}
          </ListItem>

          <Collapse in={isOpen('product')} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
              {
                productMenu.map((item, key) => {
                  return (<ChildItem key={key} label={item.label} to={item.to} drawerWidth={drawerWidth} />)
                })
              }
              <Divider />
            </List>
          </Collapse>

        </List>
      </Box>
    </Drawer>
  );
}