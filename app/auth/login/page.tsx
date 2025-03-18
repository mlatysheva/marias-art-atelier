"use client";

import { Alert, Button, Link, Stack, TextField } from '@mui/material';
import NextLink from 'next/link';
import { useActionState } from 'react';
import login from './login';

export default function Login() {
  const [state, formAction] = useActionState(login, {error: ""});

  return (
    <form action={formAction} className='w-full max-w-xs'>
      <Stack spacing={2} >
        <TextField name="email" label='Email' variant='outlined' type='email' />
        <TextField name="password" label='Password' variant='outlined' type='password' />
        <Button type="submit" variant='contained'>Login</Button>
        <Link component={NextLink} href='/auth/signup' className='self-center'>Signup</Link>
        {state?.error && (
          <Alert severity="error">
            {state.error.split(',').map((msg: string, index: number) => (
              <div key={index}>{msg}</div>
            ))}
          </Alert>
        )}
      </Stack>
    </form>
    
  );
}