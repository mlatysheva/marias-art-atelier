"use client";

import { createTheme } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFC0CB'
    },
    secondary: {
      main: '#47a6a6'
    }
  },
});

export default darkTheme;