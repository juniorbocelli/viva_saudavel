import React from 'react';
import { ThemeProvider } from '@mui/material';

import defaultThemme from './ui/theme/defaultTheme';

import Navigation from './features/navigation/Navigation';
import Router from './features/router/Router';

function App() {
  return (
    <ThemeProvider theme={defaultThemme}>
      <Navigation>
        <Router />
      </Navigation>
    </ThemeProvider>
  );
};

export default App;