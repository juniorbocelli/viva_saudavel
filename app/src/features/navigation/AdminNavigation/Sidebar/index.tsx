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

  useTheme,
} from '@mui/material';

import IconExpandLess from '@mui/icons-material/ExpandLess'
import IconExpandMore from '@mui/icons-material/ExpandMore'
import DescriptionIcon from '@mui/icons-material/Description';

import ChildItem from './components/ChildItem';
import * as Routes from '../../../../globals/routes';

const drawerWidth = 240;

interface IOpenMenu {
  [index: string]: boolean;
}

export default function Navbar() {
  const [open, setOpen] = React.useState<IOpenMenu>({
    "productMenu": false,
  });

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    let controllerName = event.currentTarget.getAttribute('data-control') || '';
    setOpen({ ...open, [controllerName]: !open[controllerName] });
  }

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
           * NFSe - Prestador
           */}
          <ListItem
            button onClick={handleClick}
            sx={{ width: `${drawerWidth - 1}px`, }}
            data-control='productMenu'
            selected={false}
          >
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary="Produtos" sx={{ fontSize: '1.0rem', }} />
            {open.nfTakerMenu ? <IconExpandLess /> : <IconExpandMore />}
          </ListItem>

          <Collapse in={open.productMenu} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
              <ChildItem label="Lista de Produtos" to={Routes.SCREEN_ADMIN_PRODUCTS} drawerWidth={drawerWidth} />
              <ChildItem label="Novo Produto" to={Routes.SCREEN_ADMIN_PRODUCT_CREATE} drawerWidth={drawerWidth} />
              <Divider />
            </List>
          </Collapse>
        </List>
      </Box>
    </Drawer>
  );
}