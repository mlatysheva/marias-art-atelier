"use client";

import { Alert, Button, Link, Stack, TextField } from '@mui/material';
import NextLink from 'next/link';
import createUser from './create-user';
import { useActionState } from 'react';

export default function Signup() {
  const [state, formAction] = useActionState(createUser, {error: ""});

  return (
    <form action={formAction} className='w-full max-w-xs'>
      <Stack spacing={2}>
        <TextField name="firstName" label='First Name' variant='outlined' />
        <TextField name="lastName" label='Last Name' variant='outlined' />
        <TextField name="username" label='Username' variant='outlined' required />
        <TextField name="email" label='Email' variant='outlined' type='email' required />
        <TextField name="password" label='Password' variant='outlined' type='password' />
        <Button variant='contained' type="submit">Signup</Button>
        <Link component={NextLink} href='/auth/login' className='self-center'>Login</Link>
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