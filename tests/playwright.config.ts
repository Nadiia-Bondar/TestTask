import { defineConfig } from 'playwright/test';

export default defineConfig({
  // Look for test files in the "tests" directory, relative to this configuration file.
  testMatch: [`**/tests/**/**/**.spec.ts`],
  // Run all tests in parallel.
  fullyParallel: false,
  // Retry on CI only.
  retries: process.env.CI ? 2 : 0,
  // Opt out of parallel tests on CI.
  workers: 1,
  use: {
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    locale: 'en-GB',
    headless: process.env.HEADLESS === '1'
  },
  timeout: 120000
});
