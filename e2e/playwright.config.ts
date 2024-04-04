import "dotenv/config";

import { defineConfig, devices } from "@playwright/test";

import AppConfig from "@/utils/AppConfig";

AppConfig.getInstance().initialize();

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
        baseURL: AppConfig.getInstance().appURL,
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
            use: {
                ...devices["Desktop Chrome"],
                storageState: "./.auth-storage.json",
            },
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
