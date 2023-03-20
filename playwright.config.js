
const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './playwright/tests',
  globalSetup: require.resolve('./playwright/tests/api/global-setup'),
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  projects: [
    {
      name: 'e2e',
      use: { ...devices['Desktop Chrome'],
      baseURL: 'http://localhost:3000'},
      headless: false,
    },

    {
      name: 'api',
      use: { ...devices['Desktop Chrome'], 
      storageState: 'storageState.json',
      baseURL: 'http://localhost:3002',
      },
    },
  ],
});

