import React from 'react';

import {
  Box,
  Typography,
  Popover,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import {
  useNavigate,
} from 'react-router-dom';

import * as GlobalRouters from '../../../../../globals/routes';

const NavbarMenu: React.FC<React.ReactFragment> = (props) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlerClickNavigate = (to: string) => {
    handlePopoverClose();
    navigate(to);
  };

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const getActiveMenu = (): string | null => {
    if (anchorEl === null)
      return null;
    else
      return anchorEl.getAttribute('data-id');
  };

  const companyMenu = <Popover
    id="company-menu"
    open={getActiveMenu() === 'company-menu'}
    anchorEl={anchorEl}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    onClose={handlePopoverClose}
    disableRestoreFocus
  >
    <Box display='flex'>
      <Box>
        <ListItemButton
          onClick={() => handlerClickNavigate(GlobalRouters.SCREEN_PRODUCER.replace(':producer', 'aviacao'))}
        >
          <ListItemText primary="Aviação" />
        </ListItemButton>

        <ListItemButton
          onClick={() => handlerClickNavigate(GlobalRouters.SCREEN_PRODUCER.replace(':producer', 'agua-na-caixa'))}
        >
          <ListItemText primary="Água na Caixa" />
        </ListItemButton>

        <ListItemButton
          onClick={() => handlerClickNavigate(GlobalRouters.SCREEN_PRODUCER.replace(':producer', 'beta-mel'))}
        >
          <ListItemText primary="Beta Mel" />
        </ListItemButton>

        <ListItemButton
          onClick={() => handlerClickNavigate(GlobalRouters.SCREEN_PRODUCER.replace(':producer', 'bufala-almeida-prado'))}
        >
          <ListItemText primary="Búfala Almeida Prado" />
        </ListItemButton>

        <ListItemButton
          onClick={() => handlerClickNavigate(GlobalRouters.SCREEN_PRODUCER.replace(':producer', 'capril-do-bosque'))}
        >
          <ListItemText primary="Capril do Bosque" />
        </ListItemButton>

        <ListItemButton
          onClick={() => handlerClickNavigate(GlobalRouters.SCREEN_PRODUCER.replace(':producer', 'fazenda-do-bem'))}
        >
          <ListItemText primary="Fazenda do Bem" />
        </ListItemButton>

        <ListItemButton
          onClick={() => handlerClickNavigate(GlobalRouters.SCREEN_PRODUCER.replace(':producer', 'goldy'))}
        >
          <ListItemText primary="Goldy" />
        </ListItemButton>

        <ListItemButton
          onClick={() => handlerClickNavigate(GlobalRouters.SCREEN_PRODUCER.replace(':producer', 'jaguacy'))}
        >
          <ListItemText primary="Jaguacy" />
        </ListItemButton>

        <ListItemButton
          onClick={() => handlerClickNavigate(GlobalRouters.SCREEN_PRODUCER.replace(':producer', 'keiff'))}
        >
          <ListItemText primary="Keiff" />
        </ListItemButton>

        <ListItemButton
          onClick={() => handlerClickNavigate(GlobalRouters.SCREEN_PRODUCER.replace(':producer', 'letti'))}
        >
          <ListItemText primary="Letti A²" />
        </ListItemButton>

        <ListItemButton
          onClick={() => handlerClickNavigate(GlobalRouters.SCREEN_PRODUCER.replace(':producer', 'la-ferme-moderne'))}
        >
          <ListItemText primary="La Ferme Moderne" />
        </ListItemButton>
      </Box>

      <Box>
        <ListItemButton
          onClick={() => handlerClickNavigate(GlobalRouters.SCREEN_PRODUCER.replace(':producer', 'mister-rabbit'))}
        >
          <ListItemText primary="Mister Rabbit" />
        </ListItemButton>

        <ListItemButton
          onClick={() => handlerClickNavigate(GlobalRouters.SCREEN_PRODUCER.replace(':producer', 'naturegg'))}
        >
          <ListItemText primary="Naturegg" />
        </ListItemButton>

        <ListItemButton
          onClick={() => handlerClickNavigate(GlobalRouters.SCREEN_PRODUCER.replace(':producer', 'pardinho-artesanal'))}
        >
          <ListItemText primary="Pardinho Artesanal" />
        </ListItemButton>

        <ListItemButton
          onClick={() => handlerClickNavigate(GlobalRouters.SCREEN_PRODUCER.replace(':producer', 'piracanjuba'))}
        >
          <ListItemText primary="Piracanjuba" />
        </ListItemButton>

        <ListItemButton
          onClick={() => handlerClickNavigate(GlobalRouters.SCREEN_PRODUCER.replace(':producer', 'ralston'))}
        >
          <ListItemText primary="Ralston" />
        </ListItemButton>

        <ListItemButton
          onClick={() => handlerClickNavigate(GlobalRouters.SCREEN_PRODUCER.replace(':producer', 'urakami'))}
        >
          <ListItemText primary="Urakami" />
        </ListItemButton>

        <ListItemButton
          onClick={() => handlerClickNavigate(GlobalRouters.SCREEN_PRODUCER.replace(':producer', 'verde-campo'))}
        >
          <ListItemText primary="Verde Campo" />
        </ListItemButton>

        <ListItemButton
          onClick={() => handlerClickNavigate(GlobalRouters.SCREEN_PRODUCER.replace(':producer', 'villa-piva'))}
        >
          <ListItemText primary="Villa Piva" />
        </ListItemButton>

        <ListItemButton
          onClick={() => handlerClickNavigate(GlobalRouters.SCREEN_PRODUCER.replace(':producer', 'xando'))}
        >
          <ListItemText primary="Xandô" />
        </ListItemButton>

        <ListItemButton
          onClick={() => handlerClickNavigate(GlobalRouters.SCREEN_PRODUCER.replace(':producer', 'yorgus'))}
        >
          <ListItemText primary="Yorgus" />
        </ListItemButton>
      </Box>
    </Box>
  </Popover>

  const filterMenu = <Popover
    id="filter-menu"
    open={getActiveMenu() === 'filter-menu'}
    anchorEl={anchorEl}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    onClose={handlePopoverClose}
    disableRestoreFocus
  >
    <ListItemButton
      onClick={() => handlerClickNavigate(GlobalRouters.SCREEN_FILTER.replace(':filter', 'kosher'))}
    >
      <ListItemText primary="Kosher" />
    </ListItemButton>

    <ListItemButton
      onClick={() => handlerClickNavigate(GlobalRouters.SCREEN_FILTER.replace(':filter', 'sem-lactose'))}
    >
      <ListItemText primary="Zero lactose" />
    </ListItemButton>

    <ListItemButton
      onClick={() => handlerClickNavigate(GlobalRouters.SCREEN_FILTER.replace(':filter', 'a2a2'))}
    >
      <ListItemText primary="A2A2" />
    </ListItemButton>

    <ListItemButton
      onClick={() => handlerClickNavigate(GlobalRouters.SCREEN_FILTER.replace(':filter', 'sem-gluten'))}
    >
      <ListItemText primary="Sem glúten" />
    </ListItemButton>

    <ListItemButton
      onClick={() => handlerClickNavigate(GlobalRouters.SCREEN_FILTER.replace(':filter', 'sem-adicao-de-acucar'))}
    >
      <ListItemText primary="Sem adição de açúcar" />
    </ListItemButton>

    <ListItemButton
      onClick={() => handlerClickNavigate(GlobalRouters.SCREEN_FILTER.replace(':filter', 'natural'))}
    >
      <ListItemText primary="Natural" />
    </ListItemButton>
  </Popover>

  return (
    <Box
      sx={
        {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          flexGrow: 1,
        }
      }
    >
      <Typography
        data-id='company-menu'
        aria-owns={getActiveMenu() === 'company-menu' ? 'company-menu' : undefined}
        aria-haspopup="true"
        onClick={handlePopoverOpen}
        sx={{ cursor: 'pointer' }}
      >
        🏛️ Marcas
      </Typography>

      <Typography
        data-id='filter-menu'
        aria-owns={getActiveMenu() === 'filter-menu' ? 'filter-menu' : undefined}
        aria-haspopup="true"
        onClick={handlePopoverOpen}
        sx={{ cursor: 'pointer' }}
      >
        🎛️ Filtros
      </Typography>

      <Typography
        onClick={() => handlerClickNavigate(GlobalRouters.SCREEN_CATEGORY.replace(':category', 'leite-e-derivados'))}
        sx={{ cursor: 'pointer' }}
      >
        🍶 Leite e derivados
      </Typography>

      <Typography
        onClick={() => handlerClickNavigate(GlobalRouters.SCREEN_CATEGORY.replace(':category', 'queijos'))}
        sx={{ cursor: 'pointer' }}
      >
        🧀 Queijos
      </Typography>

      <Typography
        onClick={() => handlerClickNavigate(GlobalRouters.SCREEN_CATEGORY.replace(':category', 'frios'))}
        sx={{ cursor: 'pointer' }}
      >
        🥓 Frios
      </Typography>

      <Typography
        onClick={() => handlerClickNavigate(GlobalRouters.SCREEN_CATEGORY.replace(':category', 'hortifruti'))}
        sx={{ cursor: 'pointer' }}
      >
        🥗 Hortifruti
      </Typography>

      <Typography
        onClick={() => handlerClickNavigate(GlobalRouters.SCREEN_CATEGORY.replace(':category', 'bebidas'))}
        sx={{ cursor: 'pointer' }}
      >
        🧃 Bebidas
      </Typography>

      <Typography
        onClick={() => handlerClickNavigate(GlobalRouters.SCREEN_CATEGORY.replace(':category', 'doces-e-geleias'))}
        sx={{ cursor: 'pointer' }}
      >
        🧁 Doces e Geléias
      </Typography>

      {companyMenu}
      {filterMenu}
    </Box>
  );
};

export default NavbarMenu;