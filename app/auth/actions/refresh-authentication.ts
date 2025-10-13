"use server";

import { cookies } from 'next/headers';
import { AUTHENTICATION_COOKIE, REFRESH_COOKIE } from '../auth-cookie';
import { API_URL } from '../../shared/constants/api';

interface RefreshResponse {
  accessToken: string;
  accessTokenExpiresAt: string;
  refreshToken: string;
  refreshTokenExpiresAt: string;
}

export default async function refreshAuthentication() {
  const cookie = await cookies();
  const refreshCookie = cookie.get(REFRESH_COOKIE);

  if (!refreshCookie?.value) {
    cookie.delete(AUTHENTICATION_COOKIE);
    return null;
  }

  try {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        Cookie: cookie.toString(),
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      cookie.delete(AUTHENTICATION_COOKIE);
      cookie.delete(REFRESH_COOKIE);
      return null;
    }

    const {
      accessToken,
      accessTokenExpiresAt,
      refreshToken,
      refreshTokenExpiresAt,
    } = (await response.json()) as RefreshResponse;

    const secure = process.env.NODE_ENV === 'production';
    const sameSite = secure ? 'strict' : 'lax';

    cookie.set({
      name: AUTHENTICATION_COOKIE,
      value: accessToken,
      httpOnly: true,
      secure,
      sameSite,
      path: '/',
      expires: new Date(accessTokenExpiresAt),
    });

    cookie.set({
      name: REFRESH_COOKIE,
      value: refreshToken,
      httpOnly: true,
      secure,
      sameSite,
      path: '/',
      expires: new Date(refreshTokenExpiresAt),
    });

    return cookie.get(AUTHENTICATION_COOKIE) ?? null;
  } catch (error) {
    cookie.delete(AUTHENTICATION_COOKIE);
    cookie.delete(REFRESH_COOKIE);
    return null;
  }
}
