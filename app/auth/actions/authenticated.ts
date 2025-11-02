import { cookies } from 'next/headers';
import { AUTHENTICATION_COOKIE } from '../auth-cookie';

export default async function authenticated() {
  // .value should be used because logout() action sets the cookie value to an empty string
  return !!(await cookies()).get(AUTHENTICATION_COOKIE)?.value;
}