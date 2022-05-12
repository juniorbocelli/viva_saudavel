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
import Card from './Card';
import ConfirmationDialog from '../../../../ui/components/ConfirmationDialog';

interface ICardsListProps {
  cards: IUseStates['cards'];

  selectedCard: IUseStates['selectedCard'];
  setSelectedCard: IUseStates['setSelectedCard'];
};

const CardsList: React.FC<ICardsListProps> = ({ cards, selectedCard, setSelectedCard }) => {
  const theme = useTheme();

  const [payload, setPayload] = React.useState<{ cardNumber: string, cardId: string, action: 'activate' | 'remove' } | null>(null);

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

      <Stack spacing={2}>
        {
          cards.map(card => {
            return (
              <Card card={card} selectedCard={selectedCard} setSelectedCard={setSelectedCard} setPayload={setPayload} />
            );
          })
        }
      </Stack>
    </Box>
  );
};

export default CardsList;