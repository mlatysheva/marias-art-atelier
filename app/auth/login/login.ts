"use server";

import { redirect } from 'next/navigation';
import { API_URL } from '../../shared/constants/api';
import { FormResponse } from '../../shared/interfaces/form-response.interface';
import { getErrorMessage } from '../../shared/utils/errors';
import { cookies } from 'next/headers';
import { AUTHENTICATION_COOKIE, REFRESH_COOKIE } from '../auth-cookie';
import { revalidatePath } from 'next/cache';
import { loginSchema } from './login-validation-schema';
import z from 'zod';

export default async function login(_prevState: FormResponse, formData: FormData) {

  const loginFormData = Object.fromEntries(formData.entries());
  
  const validatedLoginFormData = loginSchema.safeParse(loginFormData);

  // Validate on the client side
  if (!validatedLoginFormData.success) {
    
    const formFieldErrors = z.treeifyError(validatedLoginFormData.error);
    return {
      errors: {
        email: formFieldErrors?.properties?.email?.errors,
        password: formFieldErrors?.properties?.password?.errors,
      },
      error: ''
    };
  }

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    });

    const parsedResponse = await response.json();

    if (!response.ok) {
      return { error: getErrorMessage(parsedResponse) };
    }

    const {
      accessToken,
      accessTokenExpiresAt,
      refreshToken,
      refreshTokenExpiresAt,
    } = parsedResponse as {
      accessToken: string;
      accessTokenExpiresAt: string;
      refreshToken: string;
      refreshTokenExpiresAt: string;
    };

    const secure = process.env.NODE_ENV === 'production';
    const sameSite = secure ? 'strict' : 'lax';
    const cookie = await cookies();

    cookie.set({
      name: AUTHENTICATION_COOKIE,
      value: accessToken,
      secure,
      httpOnly: true,
      sameSite,
      path: '/',
      expires: new Date(accessTokenExpiresAt),
    });

    cookie.set({
      name: REFRESH_COOKIE,
      value: refreshToken,
      secure,
      httpOnly: true,
      sameSite,
      path: '/',
      expires: new Date(refreshTokenExpiresAt),
    });
  } catch (err) {
    console.error("Login error:", err);
    return { error: "Could not reach the server. Please try again later." };
  }

  revalidatePath('/');
  redirect('/');
}
