import React from 'react';
import {
  Typography,

  useTheme,
} from '@mui/material';

const Paragraph: React.FC<React.ReactFragment> = ({ children }) => {
  const theme = useTheme();

  return (
    <Typography
      variant='body1'
      component='div'

      sx={
        {
          fontSize: { xs: '1.0rem', md: '1.4rem' },
          fontWeight: 'medium',
          fontStyle: 'italic',
          ml: theme.spacing(2.0),
          mb: theme.spacing(1.5),
        }
      }
    >
      {children}
    </Typography>
  );
};

export default Paragraph;