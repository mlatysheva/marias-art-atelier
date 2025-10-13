import { cookies } from 'next/headers';
import { AUTHENTICATION_COOKIE, REFRESH_COOKIE } from '../auth-cookie';
import { hasTokenExpired } from './get-authentication';

export default async function authenticated() {
  const cookie = await cookies();
  const authentication = cookie.get(AUTHENTICATION_COOKIE);

  if (authentication?.value && !hasTokenExpired(authentication.value)) {
    return true;
  }

  return !!cookie.get(REFRESH_COOKIE)?.value;
}
