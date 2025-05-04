import { cookies } from 'next/headers';
import { API_URL } from '../constants/api';
import { getErrorMessage } from './errors';

// Return the headers object with the authentication cookie
export const getHeaders = async() => ({
    Cookie: (await cookies()).toString(),
  });

export const post = async (path: string, data: FormData | object) => {
  const body = data instanceof FormData ? Object.fromEntries(data) : data;
  
  const response = await fetch(`${API_URL}/${path}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json", ...(await getHeaders()),
      },
      body: JSON.stringify(body),
    });
  
    const parsedResponse = await response.json();
  
    if (!response.ok) {
      return {error: getErrorMessage(parsedResponse), data: parsedResponse};
    }

    return { error: "", data: parsedResponse};
}

export const get = async<T>(path: string, tags?: string[], params?: URLSearchParams) => {
  const url = params ? `${API_URL}/${path}?${params}` : `${API_URL}/${path}`;
  const response = await fetch(url, {
    headers: { ...(await getHeaders())},
    next: { tags }
  });
  return response.json() as T;
}