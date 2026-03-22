import path from 'path';

export const authFile = path.resolve(__dirname, '..', '.auth', 'user.json');

export function getRequiredCredentials() {
  const user = process.env.PLAYWRIGHT_USER;
  const password = process.env.PLAYWRIGHT_PASSWORD;

  if (!user || !password) {
    throw new Error(
      'Missing PLAYWRIGHT_USER or PLAYWRIGHT_PASSWORD in playwright/.env',
    );
  }

  return { user, password };
}
