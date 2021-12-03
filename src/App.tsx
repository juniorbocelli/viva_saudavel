import React from 'react';
import { ThemeProvider } from '@mui/material';

import defaultThemme from './ui/theme/defaultTheme';

import Router from './features/router/Router';

function App() {
  return (
    <ThemeProvider theme={defaultThemme}>
      <Router />
    </ThemeProvider>
  );
};

export default App;