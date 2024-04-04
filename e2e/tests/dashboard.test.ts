import crypto from "crypto";

import BoardService from "@/api/board.service";
import { expect, test } from "@/fixtures/fixtures";

test("should create new board", async ({ boardPage, dashboardPage }) => {
    const testHashCode = crypto.randomBytes(4).toString("hex");
    const newBoardData = {
        name: "E2E testing - title " + testHashCode,
        description: "E2E testing - description",
    };

    const board = new BoardService();
    await board.create(newBoardData);

    await dashboardPage.goToPage();

    await expect(dashboardPage.getBoardCard(newBoardData.name)).toBeVisible();

    await board.delete();
});

// eslint-disable-next-line playwright/expect-expect
test("should go to board page when clicked on board card", async ({
    boardPage,
    dashboardPage,
    testBoard,
}) => {
    await dashboardPage.goToPage();

    await dashboardPage.getBoardCard(testBoard.board.name).click();

    await boardPage.pageLoaded({ boardName: testBoard.board.name });
});

test("should pin board to favourites", async ({ dashboardPage, testBoard }) => {
    await dashboardPage.goToPage();

    await expect(
        dashboardPage.getBoardCard(testBoard.board.name)
    ).toBeVisible();
    await expect(
        dashboardPage.getPinnedBoardCard(testBoard.board.name)
    ).not.toBeVisible();

    await dashboardPage
        .getBoardCard(testBoard.board.name)
        .getByRole("button", { name: "unpinned" })
        .click();

    await expect(
        dashboardPage.getPinnedBoardCard(testBoard.board.name)
    ).toBeVisible();
    await expect(
        dashboardPage.getBoardCard(testBoard.board.name)
    ).toBeVisible();

    await expect(
        dashboardPage
            .getPinnedBoardCard(testBoard.board.name)
            .getByRole("button", { name: "pinned" })
    ).toBeVisible();
    await expect(
        dashboardPage
            .getBoardCard(testBoard.board.name)
            .getByRole("button", { name: "pinned" })
    ).toBeVisible();
});

test("should unpin board from favourites", async ({
    dashboardPage,
    testBoard,
}) => {
    await dashboardPage.goToPage();

    await expect(
        dashboardPage.getBoardCard(testBoard.board.name)
    ).toBeVisible();
    await expect(
        dashboardPage.getPinnedBoardCard(testBoard.board.name)
    ).not.toBeVisible();

    await dashboardPage
        .getBoardCard(testBoard.board.name)
        .getByRole("button", { name: "unpinned" })
        .click();

    await expect(
        dashboardPage.getPinnedBoardCard(testBoard.board.name)
    ).toBeVisible();
    await expect(
        dashboardPage.getBoardCard(testBoard.board.name)
    ).toBeVisible();

    await dashboardPage
        .getPinnedBoardCard(testBoard.board.name)
        .getByRole("button", { name: "pinned" })
        .click();

    await expect(
        dashboardPage.getBoardCard(testBoard.board.name)
    ).toBeVisible();
    await expect(
        dashboardPage.getPinnedBoardCard(testBoard.board.name)
    ).not.toBeVisible();

    await expect(
        dashboardPage
            .getBoardCard(testBoard.board.name)
            .getByRole("button", { name: "unpinned" })
    ).toBeVisible();
});
