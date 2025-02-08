import { Box } from '@mui/material';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box className="h-screen flex justify-center items-center">
      {children}
    </Box>
  );
}