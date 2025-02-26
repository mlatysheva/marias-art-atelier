import { API_URL } from '../constants/api';
import { getErrorMessage } from './errors';

export const post = async (path: string, formData: FormData) => {
  const response = await fetch(`${API_URL}/${path}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    });
  
    const parsedResponse = await response.json();
  
    if (!response.ok) {
      return {error: getErrorMessage(parsedResponse)};
    }

    return { error: ""};
}