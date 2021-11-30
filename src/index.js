import './res/index.css';

import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import { indigo } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: indigo[500],
    },
    secondary: {
      main: '#f44336',
    },
  },
  typography: {
    fontFamily: ['CMU Serif', 'sans-serif'].join(','),
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <CssBaseline />
      <App />
    </React.StrictMode>
  </ThemeProvider>,
  document.getElementById('root')
);
