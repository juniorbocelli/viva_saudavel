import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  IconButton,

  useTheme,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import DeleteIcon from '@mui/icons-material/Delete';

import { CartItem as CartItemType } from '../../../globals/interfaces/cart';
import { useGlobalContext } from '../../../features/globalContext/context';
import MaskApply from '../../../features/utils/MaskApply';

interface ICartItemProps {
  cartItem: CartItemType;
  itemKey: number;
};

const CartItem: React.FC<ICartItemProps> = ({ cartItem, itemKey }) => {
  const theme = useTheme();
  const globalContext = useGlobalContext();

  return (
    <Box>
      <Grid container>
        <Grid item xs={12} md={9}>
          <Box
            sx={
              {
                display: 'flex',
              }
            }
          >
            <Box
              sx={
                {
                  width: { xs: '17%', md: '20%' },
                  ml: { xs: theme.spacing(0.5), md: theme.spacing(1) }
                }
              }
            >
              <img width='100%' src={cartItem.image} alt={`Imagem de produto ${itemKey} do carrinho`} />
            </Box>

            <Box
              sx={
                {
                  p: theme.spacing(0.5)
                }
              }
            >
              <Typography
                variant='h6'
                component='div'
                sx={
                  {
                    fontSize: { xs: '1.0rem', md: '1.4rem' }
                  }
                }
              >
                {cartItem.name}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                <Typography
                  variant='h5'
                  component='div'
                  sx={
                    {
                      fontSize: { xs: '1.1rem', md: '1.5rem' },
                      fontWeight: 600
                    }
                  }
                  color='text.secondary'
                >
                  {`R$ ${MaskApply.maskMoney(cartItem.price)}`}
                </Typography>

                <Typography variant='body1' color='text.secondary'>
                  /item
                </Typography>
              </Box>
            </Box>

          </Box>
        </Grid>

        <Grid xs={12} md={3} item>
          <Box
            sx={
              {
                display: 'flex',
                flexDirection: { xs: 'row', md: 'column' },
                mb: { xs: theme.spacing(2.0) },
                mt: { xs: theme.spacing(-0.5) }
              }
            }
          >
            <Button
              variant='contained'
              color='primary'
              sx={
                {
                  width: { xs: '50%', md: '100%' },
                  height: { xs: '30px' },
                  p: { xs: theme.spacing(0.2), md: 0 }
                }
              }
              endIcon={<EditIcon />}
            >
              {
                cartItem.frequency === 'once'
                  ?
                  'Uma vez'
                  :
                  cartItem.frequency === 'weekly'
                    ?
                    'Semanal'
                    :
                    cartItem.frequency === 'biweekly'
                      ?
                      'Quinzenal'
                      :
                      cartItem.frequency === 'monthly'
                        ?
                        'Mensal'
                        :
                        null
              }
            </Button>

            <Box
              sx={
                {
                  display: 'flex',
                  mt: theme.spacing(0.3),
                  width: { xs: '50%', md: '100%' },
                  height: { xs: '30px' },
                }
              }
            >
              <IconButton onClick={() => globalContext['cart'].removeItemByKey(itemKey)}>
                {
                  cartItem.quantity === 1 ?
                    <DeleteIcon color='error' />
                    :
                    <RemoveCircleIcon color='error' />
                }
              </IconButton>

              <Typography
                sx={
                  {
                    fontWeight: 600,
                    flexGrow: 1,
                    fontSize: { xs: '1.3rem', md: '1.3rem' },
                    textAlign: 'center'
                  }
                }
              >
                {cartItem.quantity}
              </Typography>

              <IconButton onClick={() => globalContext['cart'].addItemByKey(itemKey)}>
                <AddCircleIcon color='primary' />
              </IconButton>
            </Box>

          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartItem;