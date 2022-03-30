import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

interface IAlertDialogProps {
  id?: string;
  title?: string;
  content: React.ReactFragment;
  size?: 'lg' | 'md' | 'sm' | 'xl' | 'xs' | false;
  open: boolean;
  onClose: () => void;
};

export default function AlertDialog(props: IAlertDialogProps) {
  const {
    id,
    title,
    content,
    size,
    open,
    onClose
  } = props;

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
        <Button onClick={handleClose} color='primary'>
          Fechar
        </Button>
      </DialogActions>

    </Dialog>
  );
};