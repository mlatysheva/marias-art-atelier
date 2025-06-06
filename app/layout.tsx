import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Container, CssBaseline } from '@mui/material';
import Header from './header/header';
import Providers from './providers';
import authenticated from './auth/actions/authenticated';
import logout from './auth/logout';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maria's Atelier",
  description: "Art Gallery of Maria Latysheva",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuthenticated = await authenticated();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers authenticated={isAuthenticated}>
          <CssBaseline />
          <Header logout={logout} />
          <Container className={isAuthenticated ? 'mt-10' : ''}>
            {children}
          </Container>
        </Providers>
      </body>
    </html>
  );
}
