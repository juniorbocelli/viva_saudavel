import { makeStyles, Theme, createStyles } from '@mui/material';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop: theme.spacing(1.5),
    },
    breadcrumbs: {
      marginBottom: theme.spacing(0.9),
    }
  }),
);

export default useStyles;