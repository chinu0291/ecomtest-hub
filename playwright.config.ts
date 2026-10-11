import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env
dotenv.config({
  path: path.resolve(__dirname, '.env'),
});

export default defineConfig({

  // Location of test files
  testDir: './tests',

  // Run independent tests in parallel
  fullyParallel: true,

  // Prevent accidentally committing test.only in CI
  forbidOnly: !!process.env.CI,

  // Retry failed tests twice in CI
  retries: process.env.CI ? 2 : 0,

  // Maximum number of parallel workers
  workers: 2,

  // Generate HTML report
  reporter: 'html',

  use: {

    // Website URL
baseURL:
    process.env.BASE_URL ||
    'https://www.automationexercise.com',
    // Take screenshot when test fails
    screenshot: 'only-on-failure',

    // Record video when test fails
    video: 'retain-on-failure',

    // Save trace when retrying failed tests
    trace: 'on-first-retry',

    // Maximum time for an individual action
    actionTimeout: 10000,

    // Maximum time for navigation
    navigationTimeout: 45000,
  },

  // Maximum time allowed for each test
  timeout: 60000,

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],

});