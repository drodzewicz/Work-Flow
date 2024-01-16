import { defineConfig, devices } from "@playwright/test";
import "dotenv/config";
import env from "env-var";

type EnvConfig = {
  APP_URL: string;
  API_URL: string;
  TEST_USER: {
    username: string;
    password: string;
    access_token?: string;
  };
  SUPPLEMENTARY_USER: {
    username: string;
    password: string;
    access_token?: string;
  };
};

export const envConfig: EnvConfig = {
  APP_URL: env.get("APP_BASE_URL").required().asString(),
  API_URL: env.get("API_BASE_URL").required().asString(),
  TEST_USER: {
    username: env.get("TEST_USER_USERNAME").required().asString(),
    password: env.get("TEST_USER_PASSWORD").required().asString(),
    access_token: env.get("TEST_USER_ACCESS_TOKEN").asString(),
  },
  SUPPLEMENTARY_USER: {
    username: env.get("SUPPLEMENTARY_USER_USERNAME").required().asString(),
    password: env.get("SUPPLEMENTARY_USER_PASSWORD").required().asString(),
    access_token: env.get("SUPPLEMENTARY_USER_ACCESS_TOKEN").asString(),
  },
};

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: envConfig.APP_URL,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    launchOptions: {
      // slowMo: 1000,
    },
  },

  /* Configure projects for major browsers */
  projects: [
    { name: "setup", testMatch: /.*\.setup\.ts/ },
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], storageState: "./.auth-storage.json" },
      dependencies: ["setup"],
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
