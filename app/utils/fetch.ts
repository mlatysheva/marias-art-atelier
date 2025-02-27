import { cookies } from 'next/headers';
import { API_URL } from '../constants/api';
import { getErrorMessage } from './errors';

// Return the headers object with the authentication cookie
export const getHeaders = () => ({
    Cookie: (cookies()).toString(),
  });

export const post = async (path: string, formData: FormData) => {
  const response = await fetch(`${API_URL}/${path}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json", ...getHeaders(),
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    });
  
    const parsedResponse = await response.json();
  
    if (!response.ok) {
      return {error: getErrorMessage(parsedResponse)};
    }

    return { error: ""};
}

export const get = async(path: string) => {
  const response = await fetch(`${API_URL}/${path}`, {
    headers: { ...getHeaders()},
  });
  return response.json();
}