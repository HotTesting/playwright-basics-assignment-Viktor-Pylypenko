import { defineConfig, devices } from '@playwright/test';

require('dotenv').config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: "80%",
  reporter: 'html',
  use: {
    baseURL: process.env.BASE_URL,
    trace: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ]

});
