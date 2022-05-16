import React from 'react';
import {
  Stack,
  Box,
  Typography,

  useTheme,
} from '@mui/material';

import { IUseStates } from '../states';
import CardItemList from './CardItemList';
import ConfirmationDialog from '../../../../ui/components/ConfirmationDialog';

interface ICardsListProps {
  cards: IUseStates['cards'];

  selectedCard: IUseStates['selectedCard'];
  setSelectedCard: IUseStates['setSelectedCard'];
};

const CardsList: React.FC<ICardsListProps> = ({ cards, selectedCard, setSelectedCard }) => {
  const [payload, setPayload] = React.useState<{ cardNumber: string, cardId: string, action: 'activate' | 'remove' } | null>(null);
  const theme = useTheme();

  const handleConfirmDialog = () => {
    switch (payload?.cardId) {
      case 'activate':
        break;

      case 'remove':
        break;

      default:
        return;
    }
  };

  const handleCloseDialog = () => {
    setPayload(null);
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <ConfirmationDialog
        open={Boolean(payload)}

        title='Confirme a ação'
        content={
          payload?.action === 'activate'
            ?
            `Deseja ativar o cartão final ${payload.cardNumber}?`
            :
            payload?.action === 'remove'
              ?
              `Deseja excluir o cartão final ${payload.cardNumber}`
              :
              ''
        }

        onClose={handleCloseDialog}
        onConfirm={handleConfirmDialog}
      />

      {
        cards.length === 0 ?
          <Typography variant='h6' component='span' color={theme.palette.grey['400']}>
            Ainda não há cartões cadastrados
        </Typography>
          :
          <Stack spacing={2}>
            {
              cards.map(card => {
                return (
                  <CardItemList key={card.number.join()} card={card} selectedCard={selectedCard} setSelectedCard={setSelectedCard} setPayload={setPayload} />
                );
              })
            }
          </Stack>
      }
    </Box>
  );
};

export default CardsList;