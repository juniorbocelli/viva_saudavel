import React from 'react';
import { ThemeProvider } from '@mui/material';

import defaultThemme from './ui/theme/defaultTheme';

import { GlobalContextProvider } from './features/globalContext/context';
import { AuthContextProvider } from './features/auth/context';
import Router from './features/router/Router';

function App() {

  return (
    <ThemeProvider theme={defaultThemme}>
      <GlobalContextProvider>
        <AuthContextProvider>
          <Router />
        </AuthContextProvider>
      </GlobalContextProvider>
    </ThemeProvider>
  );
};

export default App;