import { alpha, createStyles, makeStyles, Theme } from '@mui/material/styles';
import { deepPurple } from '@mui/material/colors';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // flexGrow: 1,
      // padding: 0,
      // marginBottom: theme.spacing(1),
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    title: {
      display: 'block',
      marginRight: theme.spacing(3),
    },
    grow: {
      flexGrow: 1,
    },
    
    menuItemButton: {
      margin: theme.spacing(0, 0.5)
    },
    avatar: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
      width: theme.spacing(4),
      height: theme.spacing(4),
      fontSize: 17,
    }
  }),
);

export default useStyles;