"use server";

import { redirect } from 'next/navigation';
import { API_URL } from '../../constants/api';
import { FormError } from '../../shared/form-error.interface';
import { getErrorMessage } from '../../utils/errors';

export default async function login(_prevState: FormError, formData: FormData) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  });

  const parsedResponse = await response.json();

  if (!response.ok) {
    return {error: getErrorMessage(parsedResponse)};
  }

  redirect('/');
}