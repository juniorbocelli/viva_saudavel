import React from 'react';
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import * as GlobalRoutes from '../../../../../globals/routes';

interface IDrawerContentProps {
  handleDrawerToggle: () => void;
};

const DrawerContent: React.FC<IDrawerContentProps> = ({ handleDrawerToggle }) => {
  const navigate = useNavigate();

  const handlerOnclick = (to: string) => {
    handleDrawerToggle();
    navigate(to);
  }

  return (
    <div>
      <Divider />
      {/* Producers */}
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handlerOnclick(GlobalRoutes.SCREEN_PRODUCER_SELECT)}>
            <ListItemIcon>
              🏛️
            </ListItemIcon>
            <ListItemText primary='Marcas' />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />

      {/* Filters */}
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handlerOnclick(GlobalRoutes.SCREEN_FILTER_SELECT)}>
            <ListItemIcon>
              🎛️
            </ListItemIcon>
            <ListItemText primary='Filtros' />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />

      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handlerOnclick(GlobalRoutes.SCREEN_CATEGORY.replace(':category', 'leite-e-derivados'))}>
            <ListItemIcon>
              🍶
            </ListItemIcon>
            <ListItemText primary='Leite e derivados' />
          </ListItemButton>
        </ListItem>


        <ListItem disablePadding>
          <ListItemButton onClick={() => handlerOnclick(GlobalRoutes.SCREEN_CATEGORY.replace(':category', 'queijos'))}>
            <ListItemIcon>
              🧀
            </ListItemIcon>
            <ListItemText primary='Queijos' />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => handlerOnclick(GlobalRoutes.SCREEN_CATEGORY.replace(':category', 'frios'))}>
            <ListItemIcon>
              🥓
            </ListItemIcon>
            <ListItemText primary='Frios' />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => handlerOnclick(GlobalRoutes.SCREEN_CATEGORY.replace(':category', 'hortifruti'))}>
            <ListItemIcon>
              🥗
            </ListItemIcon>
            <ListItemText primary='Hortifruti' />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => handlerOnclick(GlobalRoutes.SCREEN_CATEGORY.replace(':category', 'bebidas'))}>
            <ListItemIcon>
              🧃
            </ListItemIcon>
            <ListItemText primary='Bebidas' />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => handlerOnclick(GlobalRoutes.SCREEN_CATEGORY.replace(':category', 'doces-e-geleias'))}>
            <ListItemIcon>
              🧁
            </ListItemIcon>
            <ListItemText primary='Doces e Geléias' />
          </ListItemButton>
        </ListItem>

      </List>
    </div>
  );
};

export default DrawerContent;