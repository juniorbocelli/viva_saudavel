import { createTheme } from '@mui/material/styles';

const defaultThemme = createTheme({
  palette: {
    primary: {
      main: '#016239',
    },
    secondary: {
      main: '#eb6e00',
    },
    info: {
      main: '#8dd40e',
    },
  },
  typography: {
    fontFamily: [
      'Raleway',
    ].join(','),
  },
});

export default defaultThemme;