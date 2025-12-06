'use server';

import { get } from './shared/utils/fetch';

export default async function getMe() {
  return get('users/me');
}
