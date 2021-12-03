import React from 'react';
import {
  Grid,
  Typography,
  Avatar,

  useTheme,
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { COMPANY_NAME } from '../../../../globals/strings';

interface IProps {
  userName: string | null;
}

export default function TopFormAvatar({...props}: IProps) {
  const { userName } = props;
  const theme = useTheme();

  const getInitials = (): string => {
    if (userName !== null) {
      let nameParts = userName.split(' ');

      return String(nameParts[0][0] + nameParts[1][0]).toUpperCase();
    }

    return '';
  }

  return (
    <Grid direction="column" alignItems="center" container sx={{flexGrow: 1, mb: theme.spacing(3)}}>
      <Grid item>
        <Avatar sx={{m: theme.spacing(1), backgroundColor: theme.palette.secondary.main}}>
          {userName === null ? <LockOutlinedIcon /> : getInitials()}
        </Avatar>
      </Grid>
      <Grid item>
        <Typography component="h1" variant="h5">
          {userName === null ? `${COMPANY_NAME}` : userName}
        </Typography>
      </Grid>
    </Grid>
  );
}