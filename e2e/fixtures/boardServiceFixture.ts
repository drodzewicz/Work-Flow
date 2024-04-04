import { test as baseTest } from "@playwright/test";
import crypto from "crypto";
import BoardService from "../api/board.service";

type Fixtures = {
  testBoard: BoardService;
};

export const test = baseTest.extend<Fixtures>({
  testBoard: [
    async ({}, use) => {
      const board = new BoardService();

      const testHashCode = crypto.randomBytes(4).toString("hex");
      const newBoardData = {
        name: "E2E testing - title " + testHashCode,
        description: "E2E testing - description",
      };

      await board.create(newBoardData);

      await use(board);

      await board.delete();
    },
    { timeout: 100000 },
  ],
});
