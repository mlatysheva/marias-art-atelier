'use client';

import { createTheme } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFC0CB',
    },
    secondary: {
      main: '#47a6a6',
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& input:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 100px #121212 inset !important', // Autofill background
            WebkitTextFillColor: '#fff !important',
            caretColor: '#fff !important',
            borderRadius: 'inherit',
          },
        },
      },
    },
  },
});

export default darkTheme;
