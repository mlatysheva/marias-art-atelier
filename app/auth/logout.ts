"use server";

import { cookies } from 'next/headers';
import { AUTHENTICATION_COOKIE, REFRESH_COOKIE } from './auth-cookie';
import { redirect } from 'next/navigation';

export default async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTHENTICATION_COOKIE);
  cookieStore.delete(REFRESH_COOKIE);
  redirect("/auth/login");
}
