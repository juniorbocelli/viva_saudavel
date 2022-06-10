import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  MenuItem,
  Menu,
  Paper,
  InputBase,

  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MoreIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';

import NavbarMenu from '../NavbarMenu';

import { IUseStates } from '../../states';
import { useGlobalContext } from '../../../../globalContext/context';
import * as GlobalRoutes from '../../../../../globals/routes';
import { useAuth } from '../../../../auth/context';

export default function Navbar(states: IUseStates) {
  const theme = useTheme();
  const globalContext = useGlobalContext();
  const navigate = useNavigate();
  const auth = useAuth();

  const {
    isMobileOpen,
    setIsMobileOpen,

    isMobileCartOpen,
    setIsMobileCartOpen,
  } = states;

  // Control main menu (right) mobile
  const handleDrawerToggle = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  // State of opening account submenu from left menu
  const [accountSubmenuAnchorEl, setAccountSubmenuAnchorEl] = React.useState<null | HTMLElement>(null);

  // State of opening left menu (more button)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(accountSubmenuAnchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // Control mobile left menu
  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  // Control mobile submenu account from left menu
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAccountSubmenuAnchorEl(event.currentTarget);
  };

  // Close mobile left menu
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  // Close mobile and desktop submenu account from left menu
  const handleMenuClose = (to: undefined | string) => {
    setAccountSubmenuAnchorEl(null);
    handleMobileMenuClose();

    if (typeof (to) !== 'undefined')
      navigate(to);
  };

  // Control Cart drawer (from left menu)
  const handleCartDrawerToggle = () => {
    handleMobileMenuClose();
    setIsMobileCartOpen(!isMobileCartOpen);
  };

  const accountMenuId = 'primary-search-account-menu';
  // Account sub-menu
  const renderNotLoggedMenu = (
    <Menu
      anchorEl={accountSubmenuAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={accountMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={() => handleMenuClose(undefined)}
    >
      <MenuItem onClick={() => handleMenuClose(GlobalRoutes.SCREEN_CLIENT_LOGIN)}>Login</MenuItem>
      <MenuItem onClick={() => handleMenuClose(GlobalRoutes.SCREEN_CLIENT_REGISTER)}>Cadastro</MenuItem>
    </Menu>
  );

  const renderLoggedMenu = (
    <Menu
      anchorEl={accountSubmenuAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={accountMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={() => handleMenuClose(undefined)}
    >
      <MenuItem onClick={() => handleMenuClose(GlobalRoutes.SCREEN_CLIENT_PROFILE)}>Meu perfil</MenuItem>
      <MenuItem onClick={() => handleMenuClose(GlobalRoutes.SCREEN_CLIENT_CHECKOUT_GET_ALL)}>Minhas cestas</MenuItem>
      <MenuItem onClick={() => handleMenuClose(GlobalRoutes.SCREEN_CLIENT_INVOICE_GET_ALL)}>Meus pedidos</MenuItem>
      {auth.isAdmin() && <MenuItem onClick={() => handleMenuClose(GlobalRoutes.SCREEN_ADMIN_INDEX)}>Administração</MenuItem>}
      <MenuItem onClick={auth.logout}>Sair</MenuItem>

    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  // Mobile left menu itens
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* Mobile Account */}
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="conta do usuário"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Minha conta</p>
      </MenuItem>

      {/* Mobile Cart */}
      <MenuItem onClick={handleCartDrawerToggle}>
        <IconButton
          size="large"
          aria-label="carrinho"
          color="inherit"
        >
          {/* Mobile cart icon */}
          <Badge badgeContent={0} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Carrinho</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
      >
        <Toolbar>
          {/* Open main menu (right) button */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Typography
            sx={{ fontSize: { md: '2.2rem' }, ml: { md: theme.spacing(2) }, cursor: 'pointer' }}
            variant="h6"
            noWrap component="div"
            onClick={() => navigate(GlobalRoutes.SCREEN_INDEX)}
          >
            viva saudável
          </Typography>

          <Paper
            component="form"
            sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', flexGrow: 1, ml: theme.spacing(4) }}
          >
            <InputBase
              sx={{ ml: 1, flexGrow: 1, }}
              placeholder="Busque seu produto..."
              inputProps={{ 'aria-label': 'campo de busca principal' }}
              size="small"
            />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>

          <Box sx={{ flexGrow: 1 }} />

          {/* Desktop left menu */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {/* Desktop Account */}
            <IconButton
              size="large"
              edge="end"
              aria-label="conta do usuário"
              aria-controls={accountMenuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle sx={{ fontSize: '2.2rem' }} />
              <Typography
                sx={
                  {
                    ml: theme.spacing(2),
                    fontWeight: 'bold',
                    fontSize: '1.1rem'
                  }
                }
                component="span"
              >
                Minha conta
              </Typography>
            </IconButton>

            {/* Desktop Cart */}
            <IconButton
              size="large"
              aria-label="carrinho do usuário"
              color="inherit"
              sx={{ ml: theme.spacing(4) }}
              onClick={handleCartDrawerToggle}
            >
              {/* Desktop cart icon */}
              <Badge badgeContent={0} color="error">
                <ShoppingCartIcon sx={{ fontSize: '2.2rem' }} />
              </Badge>
              <Typography
                sx={
                  {
                    ml: theme.spacing(2),
                    fontWeight: 'bold',
                    fontSize: '1.1rem'
                  }
                }
                component="span"
              >
                Carrinho
              </Typography>
            </IconButton>
          </Box>

          {/* Mobile left menu */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            {/* Button that open mobile left menu */}
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>

        {/* Menu */}
        <Toolbar
          sx={{ display: { xs: 'none', md: 'flex' } }}
        >
          <NavbarMenu />
        </Toolbar>
      </AppBar>

      {renderMobileMenu}
      {auth.isSignedIn() ? renderLoggedMenu : renderNotLoggedMenu}
    </Box>
  );
};