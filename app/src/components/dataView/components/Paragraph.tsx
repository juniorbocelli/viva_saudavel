import React from 'react';
import {
  Typography,

  useTheme,

  SxProps,
} from '@mui/material';

interface IParagraphProps {
  children: React.ReactNode;
  sx?: SxProps;
};

const Paragraph: React.FC<IParagraphProps> = ({ children, sx }) => {
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
          ...sx,
        }
      }
    >
      {children}
    </Typography>
  );
};

export default Paragraph;