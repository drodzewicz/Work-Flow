import { test as setup, expect } from "@/fixtures/fixtures";
import path from "node:path";
import axios from "axios";
import AppConfig from "@/utils/AppConfig";

setup("authenticate", async ({ page, navbar }) => {
  await page.goto("/");

  await navbar.loginNavButton.click();

  await expect(page.getByRole("dialog")).toBeVisible();

  await navbar.login(AppConfig.getInstance().testUser);

  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(navbar.isLoggedIn()).toBeTruthy();

  await page.context().storageState({ path: path.join(process.cwd(), ".auth-storage.json") });
  const cookies = await page.context().cookies();

  const res = await axios.get(`${AppConfig.getInstance().apiURL}/auth/refreshToken`, {
    headers: { Cookie: `${cookies[0].name}=${cookies[0].value}` },
  });
  process.env.TEST_USER_ACCESS_TOKEN = res.data.accessToken;
});
