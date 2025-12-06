'use client';

import { Alert, Button, Link, Stack, TextField } from '@mui/material';
import NextLink from 'next/link';
import createUser from './create-user';
import { useActionState } from 'react';
import { SignupState } from '../../shared/interfaces/signup-state.interface';
import { capitaliseErrorMessage } from '../../shared/utils/errors';

const initialState = {
  errors: {},
  error: '',
} as SignupState;

export default function Signup() {
  const [state, formAction] = useActionState(createUser, initialState);

  const convertErrorsToString = (errors: string[] | undefined) => {
    if (errors === undefined) {
      return '';
    }
    return errors.map(capitaliseErrorMessage).join(',');
  };

  return (
    <form action={formAction} className="w-full max-w-xs">
      <Stack spacing={2}>
        <TextField
          name="firstName"
          label="First Name"
          variant="outlined"
          helperText={convertErrorsToString(state.errors?.firstName)}
          error={!!state.errors?.firstName}
        />
        <TextField
          name="lastName"
          label="Last Name"
          variant="outlined"
          helperText={convertErrorsToString(state.errors?.lastName)}
          error={!!state.errors?.lastName}
        />
        <TextField
          name="username"
          label="Username"
          variant="outlined"
          required
          helperText={convertErrorsToString(state.errors?.username)}
          error={!!state.errors?.username}
        />
        <TextField
          name="email"
          label="Email"
          variant="outlined"
          type="email"
          required
          helperText={convertErrorsToString(state.errors?.email)}
          error={!!state.errors?.email}
        />
        <TextField
          name="password"
          label="Password"
          variant="outlined"
          type="password"
          helperText={convertErrorsToString(state.errors?.password)}
          error={!!state.errors?.password}
        />
        <Button variant="contained" type="submit">
          Signup
        </Button>
        <Link component={NextLink} href="/auth/login" className="self-center">
          Login
        </Link>
        {state?.error && (
          <Alert severity="error">
            {state.error.split(',').map((msg: string, index: number) => (
              <div key={index}>{msg}</div>
            ))}
          </Alert>
        )}
        {!state?.error && !state?.errors && (
          <Alert severity="success">Your data has been successfully sent</Alert>
        )}
      </Stack>
    </form>
  );
}
