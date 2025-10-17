import { cookies } from 'next/headers';
import refreshAuthentication from '../../auth/actions/refresh-authentication';
import { API_URL } from '../constants/api';
import { getErrorMessage } from './errors';

const UNAUTHORIZED_STATUS = 401;

/**
 * Error thrown when a request finishes with a 401 after any optional retry.
 * Makes it possible to handle unauthorized error cases without the need to inspect the raw response.
 */
export class UnauthorizedError extends Error {
  constructor() {
    super('Unauthorized');
    this.name = 'UnauthorizedError';
  }
}

/**
 * Returns the headers object containing the serialized cookies for the current request.
 */
export const getHeaders = async () => ({
  Cookie: (await cookies()).toString(),
});

/**
 * Executes the provided request and, if `onUnauthorized` is provided, retries after running the `onUnauthorized` handler.
 * POST routes use this to perform a token refresh and retry transparently. 
 * GET routes pass no handler, which ensures that RSCs do not attempt to mutate cookies.
 */
const requestWithRefresh = async (
  request: () => Promise<Response>,
  { onUnauthorized }: { onUnauthorized?: () => Promise<{ value?: string } | null> } = {},
) => {
  let response = await request();

  if (response.status !== UNAUTHORIZED_STATUS) {
    return response;
  }

  if (!onUnauthorized) {
    return response;
  }

  const refreshed = await onUnauthorized();

  if (!refreshed?.value) {
    return response;
  }

  response = await request();

  return response;
};

/**
 * Performs an authenticated POST request. A failed authentication attempt
 * triggers a refresh via the provided server action `refreshAuthentication` before retrying. 
 */
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

  const response = await requestWithRefresh(request, { onUnauthorized: refreshAuthentication });
  const parsedResponse = await response.json();

  if (!response.ok) {
    return { error: getErrorMessage(parsedResponse), data: parsedResponse };
  }

  return { error: '', data: parsedResponse };
};

/**
 * Performs an authenticated GET request. When the backend responds with 401,
 * the function throws an UnauthorizedError so the caller can render, for example, the client-side AuthRefresher
 * without attempting to set cookies during server rendering.
 */
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

  if (response.status === UNAUTHORIZED_STATUS) {
    throw new UnauthorizedError();
  }

  return response.json() as T;
};
