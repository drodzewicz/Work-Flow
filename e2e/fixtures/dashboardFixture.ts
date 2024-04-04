import { test as baseTest } from "@playwright/test";
import Dashboard from "@/pages/Dashboard";

type Fixtures = {
  dashboardPage: Dashboard;
};

export const test = baseTest.extend<Fixtures>({
  dashboardPage: async ({ page }, use) => {
    await use(new Dashboard(page));
  },
});
