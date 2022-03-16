import React from 'react';
import { ThemeProvider } from '@mui/material';

import defaultThemme from './ui/theme/defaultTheme';

import { GlobalContextProvider } from './features/globalContext/context';
import Router from './features/router/Router';

function App() {

  return (
    <ThemeProvider theme={defaultThemme}>
      <GlobalContextProvider>
        <Router />
      </GlobalContextProvider>
    </ThemeProvider>
  );
};

export default App;