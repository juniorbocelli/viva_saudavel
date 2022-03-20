import React from 'react';
import {
  Box,
  Drawer,
  Divider,
  IconButton,

  useTheme,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

import { IUseStates } from '../../states';
import CartItem from '../../../../../ui/components/CartItem';
import { useGlobalContext } from '../../../../globalContext/context';

const Cart: React.FC<IUseStates> = (states) => {
  const theme = useTheme();
  const globalContext = useGlobalContext();
  const {
    isMobileCartOpen,
    setIsMobileCartOpen,
  } = states;

  const toggleDrawer = (open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setIsMobileCartOpen(open);
    };

  return (
    <div>
      <Drawer
        anchor='right'
        open={isMobileCartOpen}
        onClose={toggleDrawer(false)}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={
          {
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: { xs: '100%', md: 700 } },
          }
        }
      >
        {/* Close Button */}
        <IconButton
          color="inherit"
          aria-label="close drawer"
          edge="start"
          onClick={toggleDrawer(false)}
          size="large"
          sx={{ ml: theme.spacing(1), width: '50px', height: '50px' }}
        >
          <CloseIcon sx={{ fontSize: '2.7rem' }} />
        </IconButton>
        <Divider />

        {/* Cart itens */}
        <Box
          sx={{ flexShrink: { sm: 0 } }}
          aria-label="Itens do carrinho de compra"
        >
          {
            globalContext.cart.map((item, key) => {
              return <CartItem cartItem={item} itemKey={key} key={key} />;
            })
          }
        </Box>
      </Drawer>
    </div>
  );
};

export default Cart;