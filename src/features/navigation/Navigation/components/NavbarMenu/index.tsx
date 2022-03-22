import React from 'react';

import {
  Box,
  Typography,
  Popover,
  ListItemButton,
  ListItemText,
  Link,
} from '@mui/material';

const NavbarMenu: React.FC<React.ReactFragment> = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

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
  }

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
        <ListItemButton component="a" href="/marca/aviacao/">
          <ListItemText primary="Aviação" />
        </ListItemButton>

        <ListItemButton component="a" href="/marca/agua-na-caixa/">
          <ListItemText primary="Água na Caixa" />
        </ListItemButton>

        <ListItemButton component="a" href="/marca/beta-mel/">
          <ListItemText primary="Beta Mel" />
        </ListItemButton>

        <ListItemButton component="a" href="/marca/bufala-almeida-prado/">
          <ListItemText primary="Búfala Almeida Prado" />
        </ListItemButton>

        <ListItemButton component="a" href="/marca/capril-do-bosque/">
          <ListItemText primary="Capril do Bosque" />
        </ListItemButton>

        <ListItemButton component="a" href="/marca/fazenda-do-bem/">
          <ListItemText primary="Fazenda do Bem" />
        </ListItemButton>

        <ListItemButton component="a" href="/marca/goldy/">
          <ListItemText primary="Goldy" />
        </ListItemButton>

        <ListItemButton component="a" href="/marca/jaguacy/">
          <ListItemText primary="Jaguacy" />
        </ListItemButton>

        <ListItemButton component="a" href="/marca/keiff/">
          <ListItemText primary="Keiff" />
        </ListItemButton>

        <ListItemButton component="a" href="/marca/letti/">
          <ListItemText primary="Letti A²" />
        </ListItemButton>

        <ListItemButton component="a" href="/marca/la-ferme-moderne/">
          <ListItemText primary="La Ferme Moderne" />
        </ListItemButton>
      </Box>

      <Box>
        <ListItemButton component="a" href="/marca/mister-rabbit/">
          <ListItemText primary="Mister Rabbit" />
        </ListItemButton>

        <ListItemButton component="a" href="/marca/naturegg/">
          <ListItemText primary="Naturegg" />
        </ListItemButton>

        <ListItemButton component="a" href="/marca/pardinho-artesanal/">
          <ListItemText primary="Pardinho Artesanal" />
        </ListItemButton>

        <ListItemButton component="a" href="/marca/piracanjuba/">
          <ListItemText primary="Piracanjuba" />
        </ListItemButton>

        <ListItemButton component="a" href="/marca/ralston/">
          <ListItemText primary="Ralston" />
        </ListItemButton>

        <ListItemButton component="a" href="/marca/urakami/">
          <ListItemText primary="Urakami" />
        </ListItemButton>

        <ListItemButton component="a" href="/marca/verde-campo/">
          <ListItemText primary="Verde Campo" />
        </ListItemButton>

        <ListItemButton component="a" href="/marca/villa-piva/">
          <ListItemText primary="Villa Piva" />
        </ListItemButton>

        <ListItemButton component="a" href="/marca/xando/">
          <ListItemText primary="Xandô" />
        </ListItemButton>

        <ListItemButton component="a" href="/marca/yorgus/">
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
    <ListItemButton component="a" href="/filtro/kosher/">
      <ListItemText primary="Kosher" />
    </ListItemButton>

    <ListItemButton component="a" href="/filtro/sem-lactose/">
      <ListItemText primary="Zero lactose" />
    </ListItemButton>

    <ListItemButton component="a" href="/filtro/a2a2/">
      <ListItemText primary="A2A2" />
    </ListItemButton>

    <ListItemButton component="a" href="/filtro/sem-gluten/">
      <ListItemText primary="Sem glúten" />
    </ListItemButton>

    <ListItemButton component="a" href="/filtro/sem-adicao-de-acucar/">
      <ListItemText primary="Sem adição de açúcar" />
    </ListItemButton>

    <ListItemButton component="a" href="/filtro/natural/">
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

      <Link href='/produtos/leite-e-derivados/' underline='none' color='inherit'>
        <Typography>
          🍶 Leite e derivados
        </Typography>
      </Link>

      <Link href='/produtos/queijos/' underline='none' color='inherit'>
        <Typography>
          🧀 Queijos
        </Typography>
      </Link>

      <Link href='/produtos/frios/' underline='none' color='inherit'>
        <Typography>
          🥓 Frios
        </Typography>
      </Link>

      <Link href='/produtos/hortifruti/' underline='none' color='inherit'>
        <Typography>
          🥗 Hortifruti
        </Typography>
      </Link>

      <Link href='/produtos/bebidas/' underline='none' color='inherit'>
        <Typography>
          🧃 Bebidas
        </Typography>
      </Link>

      <Link href='/produtos/doces-e-geleias/' underline='none' color='inherit'>
        <Typography>
          🧁 Doces e Geléias
        </Typography>
      </Link>

      {companyMenu}
      {filterMenu}
    </Box>
  );
};

export default NavbarMenu;