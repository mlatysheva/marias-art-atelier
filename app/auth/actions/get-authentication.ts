"use server";

import { cookies } from 'next/headers';
import { AUTHENTICATION_COOKIE } from '../auth-cookie';
import refreshAuthentication from './refresh-authentication';
import { jwtDecode } from 'jwt-decode';

export default async function getAuthentication() {
  const cookie = await cookies();
  const authentication = cookie.get(AUTHENTICATION_COOKIE);

  if (authentication?.value && !hasTokenExpired(authentication.value)) {
    return authentication;
  }

  return refreshAuthentication();
}

export async function hasTokenExpired(token: string) {
  try {
    const decoded = jwtDecode<{ exp?: number }>(token);
    if (!decoded.exp) {
      return false;
    }

    return decoded.exp * 1000 <= Date.now();
  } catch (error) {
    return true;
  }
}
