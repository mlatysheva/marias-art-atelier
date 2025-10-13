import { cookies } from 'next/headers';
import refreshAuthentication from '../../auth/actions/refresh-authentication';
import { API_URL } from '../constants/api';
import { getErrorMessage } from './errors';

const UNAUTHORIZED_STATUS = 401;

// Return the headers object with the authentication cookie
export const getHeaders = async () => ({
  Cookie: (await cookies()).toString(),
});

const requestWithRefresh = async (request: () => Promise<Response>) => {
  let response = await request();

  if (response.status !== UNAUTHORIZED_STATUS) {
    return response;
  }

  const refreshed = await refreshAuthentication();

  if (!refreshed?.value) {
    return response;
  }

  response = await request();

  return response;
};

export const post = async (path: string, data: FormData | object) => {
  const body = data instanceof FormData ? Object.fromEntries(data) : data;

  const request = async () => {
    const headers = await getHeaders();
    return fetch(`${API_URL}/${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(body),
    });
  };

  const response = await requestWithRefresh(request);
  const parsedResponse = await response.json();

  if (!response.ok) {
    return { error: getErrorMessage(parsedResponse), data: parsedResponse };
  }

  return { error: '', data: parsedResponse };
};

export const get = async <T>(
  path: string,
  tags?: string[],
  params?: URLSearchParams,
) => {
  const url = params ? `${API_URL}/${path}?${params}` : `${API_URL}/${path}`;

  const request = async () => {
    const headers = await getHeaders();
    return fetch(url, {
      headers,
      next: { tags },
    });
  };

  const response = await requestWithRefresh(request);

  return response.json() as T;
};
