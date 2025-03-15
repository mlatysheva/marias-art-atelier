"use server";

import { redirect } from 'next/navigation';
import { API_URL } from '../../shared/constants/api';
import { FormResponse } from '../../shared/interfaces/form-response.interface';
import { getErrorMessage } from '../../shared/utils/errors';
import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';
import { AUTHENTICATION_COOKIE } from '../auth-cookie';

export default async function login(_prevState: FormResponse, formData: FormData) {
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

  // Set the authentication cookie received from the server
  setAuthCookie(response);
  redirect('/');
}

export const setAuthCookie = async (response: Response) => {
  const setCookieHeader = response.headers.get('Set-Cookie');
  if (setCookieHeader) {
    // Parse the token from the Set-Cookie header
    const token = setCookieHeader.split(';')[0].split('=')[1];
    (await cookies()).set({
      name: AUTHENTICATION_COOKIE,
      value: token,
      secure: false,
      httpOnly: true,
      expires: new Date(jwtDecode(token).exp! * 1000),
    });
  }
}