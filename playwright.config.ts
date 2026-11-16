import { defineConfig, devices } from '@playwright/test';

const ci = (globalThis as typeof globalThis & { process?: { env?: { CI?: string } } }).process?.env?.CI;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!ci,
  retries: ci ? 2 : 0,
  workers: ci ? 2 : undefined,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: 'https://www.saucedemo.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
