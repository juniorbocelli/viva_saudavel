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

import { CartItem as CartItemType } from '../../../features/globalContext/types';
import { useGlobalContext } from '../../../features/globalContext/context';
import * as MaskApply from '../../../features/validation/maskApply';

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
        <Grid item md={9}>
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
                  width: '20%',
                  ml: theme.spacing(1)
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
                    fontSize: { md: '1.4rem' }
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
                      fontSize: { md: '1.5rem' },
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

        <Grid md={3} item>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Button variant='contained' color='primary' sx={{ width: '100%' }} endIcon={<EditIcon />}>
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

            <Box sx={{ display: 'flex', mt: theme.spacing(0.3) }}>
              <IconButton onClick={() => globalContext.removeItemByKey(itemKey)}>
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
                    fontSize: { md: '1.5rem' },
                    textAlign: 'center'
                  }
                }
              >
                {cartItem.quantity}
              </Typography>

              <IconButton onClick={() => globalContext.addItemByKey(itemKey)}>
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