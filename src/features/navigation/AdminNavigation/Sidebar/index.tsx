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
  Typography,
} from '@mui/material';

import IconExpandLess from '@mui/icons-material/ExpandLess'
import IconExpandMore from '@mui/icons-material/ExpandMore'
import DescriptionIcon from '@mui/icons-material/Description';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ListIcon from '@mui/icons-material/List';
import SettingsIcon from '@mui/icons-material/Settings';

interface IOpenMenu {
  [index: string]: boolean;
}

export default function Navbar() {
  const drawerWidth = 240;
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
      classes={{
        paper: { with: drawerWidth }
      }}
    >
      <Toolbar />
      <Typography align="center" className={classes.companyName}>
        {company?.name}
      </Typography>
      <div className={classes.drawerContainer}>
        <List>

          {/**
           * NFSe - Prestador
           */}
          <ListItem
            button onClick={handleClick}
            className={classes.menuItem}
            data-control='nfTakerMenu'
            selected={computedMatch?.path === Endpoints.SCREEN_COMPANY_DOCUMENTS_PROVIDER_INVOICES_LIST}
          >
            <ListItemIcon className={classes.menuItemIcon}>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary="NFSe - Prestador" classes={{ primary: classes.listItemText }} />
            {open.nfTakerMenu ? <IconExpandLess /> : <IconExpandMore />}
          </ListItem>

          <Collapse in={open.nfTakerMenu} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
              <ListItemLink
                classes={classes.listItemLink}
                primary='Visualizar notas'
                to={getUrl(Endpoints.SCREEN_COMPANY_DOCUMENTS_PROVIDER_INVOICES_LIST)}
                selected={computedMatch?.path === Endpoints.SCREEN_COMPANY_DOCUMENTS_PROVIDER_INVOICES_LIST}
              />
              <Divider />
            </List>
          </Collapse>
        </List>
      </div>
    </Drawer>
  );
}