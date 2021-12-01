import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
);

export default useStyles;