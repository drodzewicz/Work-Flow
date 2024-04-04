import { test as baseTest } from "@playwright/test";

import NavbarElement from "@/pages/NavbarElement";

type Fixtures = {
    navbar: NavbarElement;
};

export const test = baseTest.extend<Fixtures>({
    navbar: async ({ page }, use) => {
        await use(new NavbarElement(page));
    },
});
