import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

interface IConfirmationDialogProps {
  id?: string;
  title: string;
  content: React.ReactFragment;
  size?: 'lg' | 'md' | 'sm' | 'xl' | 'xs' | false;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  closeAfterConfirm?: boolean;
  disabledOkButton?: boolean;
};

export default function ConfirmationDialog(props: IConfirmationDialogProps) {
  const {
    id,
    title,
    content,
    size,
    open,
    onClose,
    onConfirm,
    closeAfterConfirm,
    disabledOkButton,
  } = props;

  const _closeAfterConfirm = typeof (closeAfterConfirm) === "undefined" ? true : closeAfterConfirm;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      id={id}
      open={open}
      onClose={handleClose}
      maxWidth={size || 'sm'}
      fullWidth={true}
    >
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <DialogContentText component="div">
          {content}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={
            () => {
              onConfirm();
              if (_closeAfterConfirm) onClose();
            }
          }
          color='primary'
          disabled={!!disabledOkButton}
        >
          Executar
        </Button>

        <Button onClick={handleClose} color='primary'>
          Cancelar
        </Button>
      </DialogActions>

    </Dialog>
  );
};