import { test as baseTest } from "@playwright/test";
import Dashboard from "../pages/Dashboard";
import Board from "../pages/Board";
import BoardSettings from "../pages/BoardSettings";
import Navbar from "../pages/Navbar";
import crypto from "crypto";
import BoardService, { Board as BoardType } from "../api/board.service";

type Fixtures = {
  dashboardPage: Dashboard;
  boardPage: Board;
  boardSettingsPage: BoardSettings;
  navbar: Navbar;
  testBoard: BoardService;
};

const test = baseTest.extend<Fixtures>({
  dashboardPage: async ({ page }, use) => {
    await use(new Dashboard(page));
  },
  boardPage: async ({ page }, use) => {
    await use(new Board(page));
  },
  boardSettingsPage: async ({ page }, use) => {
    await use(new BoardSettings(page));
  },
  navbar: async ({ page }, use) => {
    await use(new Navbar(page));
  },
  testBoard: async ({ page }, use) => {
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
});

export { test };

export { expect } from "@playwright/test";
