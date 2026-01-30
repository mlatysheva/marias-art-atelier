import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Prevent exessive logs by dotenv
process.env.DOTENV_CONFIG_QUIET = 'true';

// Provide access to .evn file
dotenv.config({ path: path.resolve(__dirname, 'playwright', '.env') });

const authFile = path.resolve(__dirname, 'playwright', '.auth', 'user.json');

export default defineConfig({
  testDir: './playwright',
  testMatch: '**/*.test.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'off',
    screenshot: 'off',
    video: 'off',
  },

  projects: [
    {
      name: 'setup',
      testMatch: /login\.test\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'chromium',
      testIgnore: /login\.test\.ts/,
      dependencies: ['setup'],
      use: { ...devices['Desktop Chrome'], storageState: authFile },
    },

    {
      name: 'Mobile Safari',
      testIgnore: /login\.test\.ts/,
      dependencies: ['setup'],
      use: { ...devices['iPhone 12'], storageState: authFile },
    },
  ],
});
