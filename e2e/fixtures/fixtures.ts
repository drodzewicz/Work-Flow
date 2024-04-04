import { mergeTests } from "@playwright/test";

import { test as boardFixture } from "./boardFixture";
import { test as boardServiceFixture } from "./boardServiceFixture";
import { test as boardSettingsFixture } from "./boardSettingsFixture";
import { test as dashboardFixture } from "./dashboardFixture";
import { test as navbarFixture } from "./navbarFixture";

export const test = mergeTests(
    boardFixture,
    boardServiceFixture,
    boardSettingsFixture,
    dashboardFixture,
    navbarFixture
);

export { expect } from "@playwright/test";
