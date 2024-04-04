import { test as baseTest } from "@playwright/test";

import Board from "@/pages/Board";

type Fixtures = {
    boardPage: Board;
};

export const test = baseTest.extend<Fixtures>({
    boardPage: async ({ page }, use) => {
        await use(new Board(page));
    },
});
