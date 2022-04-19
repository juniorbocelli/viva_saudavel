import React from 'react';
import {
  ListItem,

  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';


interface IChildItemProps {
  to: string;
  label: string;
  drawerWidth: number;
};

const ChildItem: React.FC<IChildItemProps> = ({ to, label, drawerWidth }) => {
  const theme = useTheme();
  const navigation = useNavigate();

  return (
    <ListItem
      sx={
        {
          fontSize: '0.9rem',
          paddingLeft: theme.spacing(2),
          width: `${drawerWidth - 1}px`,
          cursor: 'pointer',
        }
      }

      onClick={() => navigation(to)}
    >
      {label}
    </ListItem>
  );
};

export default ChildItem;