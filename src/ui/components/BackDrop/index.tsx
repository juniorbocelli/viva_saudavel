import React from 'react';
import {
  Backdrop,
  CircularProgress,

  useTheme,
} from '@mui/material';

interface IBackDropProps {
  open: boolean;
};

const BackDrop: React.FC<IBackDropProps> = (props) => {
  const theme = useTheme();

  return (
    <Backdrop open={props.open} sx={{ zIndex: theme.zIndex.drawer + 1, color: '#fff', }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default BackDrop;