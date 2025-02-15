"use server";

import { redirect } from 'next/navigation';
import { API_URL } from '../../constants/api';
import { getErrorMessage } from '../../utils/errors';

export default async function createUser( _prevState: any, formData: FormData) {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    body: formData,
  });

  const parsedResponse = await response.json();

  if (!response.ok) {
    console.log(parsedResponse);
    return {error: getErrorMessage(parsedResponse)};
  }

  redirect('/');
}