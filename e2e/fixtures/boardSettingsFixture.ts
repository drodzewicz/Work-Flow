import { test as baseTest } from "@playwright/test";
import BoardSettings from "@/pages/BoardSettings";

type Fixtures = {
  boardSettingsPage: BoardSettings;
};

export const test = baseTest.extend<Fixtures>({
  boardSettingsPage: async ({ page }, use) => {
    await use(new BoardSettings(page));
  },
});
