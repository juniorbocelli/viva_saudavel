import React from 'react';
import {
  Stack,
  Box,
  Paper,
  Typography,

  styled,
  useTheme,
} from '@mui/material';

import { IUseStates } from '../states';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,

  height: '100px',
}));

interface ICardsListProps {
  cards: IUseStates['cards'];

  creditCardId: IUseStates['creditCardId'];
  setCreditCardId: IUseStates['setCreditCardId'];
};

const CardsList: React.FC<ICardsListProps> = ({ cards, creditCardId, setCreditCardId }) => {
  const theme = useTheme();

  return (
    <Box sx={{ width: '100%' }}>
      <Stack spacing={2}>
        {
          cards.map(card => {
            return (
              <Item key={`${card.number.join()}`}>
                {card.name}
              </Item>
            )
          })
        }
      </Stack>
    </Box>
  );
};

export default CardsList;