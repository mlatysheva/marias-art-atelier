'use client'; // In order to use the Context API available only on the client side

import React, { ReactElement } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material';
import darkTheme from './dark.theme';
import { AuthContext } from './auth/auth-context';

interface ProvidersProps {
  children: ReactElement[];
  authenticated: boolean;
}

export default function Providers({ children, authenticated }: ProvidersProps) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={darkTheme}>
        <AuthContext.Provider value={authenticated}>
          {children}
        </AuthContext.Provider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
