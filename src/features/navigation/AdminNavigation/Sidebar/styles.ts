import { makeStyles } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  menuItem: {
    width: drawerWidth - 1,
  },
  menuItemIcon: {

  },
  listItemText: {
    fontSize: '1.0rem',
  },
  listSubItemText: {
    fontSize: '0.9rem',
    //color: theme.palette.text.secondary,
    marginLeft: 15,
  },
  listItemLink: {
    fontSize: '0.9rem',
    //color: theme.palette.text.secondary,
    paddingLeft: 35,
    width: drawerWidth - 1,
  },
  companyName: {
    marginBottom: theme.spacing(1)
  },
}));

export default useStyles;