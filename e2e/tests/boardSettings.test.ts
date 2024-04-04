import crypto from "crypto";

import BoardService from "@/api/board.service";
import { expect, test } from "@/fixtures/fixtures";
import AppConfig from "@/utils/AppConfig";

test("should open settings page when clicked on settings button", async ({
    testBoard,
    boardPage,
    boardSettingsPage,
}) => {
    await boardPage.goToPage(testBoard.board._id);
    await boardPage.settingsButton.click();
    await boardSettingsPage.pageLoaded();
});

test("should redirect to board page when clicking 'back to board' button", async ({
    boardPage,
    testBoard,
    boardSettingsPage,
}) => {
    await boardSettingsPage.goToPage(testBoard.board._id);

    await boardSettingsPage.backToBoarddButton.click();
    await boardPage.pageLoaded({ boardName: testBoard.board.name });
});

test("should be able to remove current board when clicking 'Delete Board' button", async ({
    page,
    boardSettingsPage,
    dashboardPage,
}) => {
    const testHashCode = crypto.randomBytes(4).toString("hex");
    const newBoardData = {
        name: "E2E testing - title " + testHashCode,
        description: "E2E testing - description",
    };

    const boardService = new BoardService();
    await boardService.create(newBoardData);

    await boardSettingsPage.goToPage(boardService.board._id);

    page.on("dialog", async (dialog) => await dialog.accept());
    await boardSettingsPage.deleteButton.click();

    await dashboardPage.pageLoaded();

    await expect(
        dashboardPage.getBoardCard(newBoardData.name)
    ).not.toBeVisible();
});

test("should be able to leave current board when clicking 'Leave Board' button", async ({
    page,
    boardSettingsPage,
    dashboardPage,
}) => {
    const testHashCode = crypto.randomBytes(4).toString("hex");
    const newBoardData = {
        name: "E2E testing - title " + testHashCode,
        description: "E2E testing - description",
    };

    const boardService = new BoardService();
    await boardService.create(newBoardData);

    await boardSettingsPage.goToPage(boardService.board._id);

    page.on("dialog", async (dialog) => await dialog.accept());
    await boardSettingsPage.leaveBoardButton.click();

    await dashboardPage.pageLoaded();
    await expect(
        dashboardPage.getBoardCard(newBoardData.name)
    ).not.toBeVisible();
});

test("should update board name and description", async ({
    boardSettingsPage,
    page,
    testBoard,
}) => {
    const testHashCode = crypto.randomBytes(4).toString("hex");
    const updatedBoard = {
        name: "updated title " + testHashCode,
        description: "updated description",
    };

    await boardSettingsPage.goToPage(testBoard.board._id);

    await boardSettingsPage.boardNameInput.fill(updatedBoard.name);
    await boardSettingsPage.boardDescriptionInput.fill(
        updatedBoard.description
    );
    await boardSettingsPage.saveChangesButton.click();

    await page.reload();

    await expect(boardSettingsPage.boardNameInput).toHaveValue(
        updatedBoard.name
    );
    await expect(boardSettingsPage.boardDescriptionInput).toHaveValue(
        updatedBoard.description
    );
});

test("should add new members to the board", async ({
    boardSettingsPage,
    testBoard,
}) => {
    const newMemberUser = AppConfig.getInstance().supplementaryUser.username;

    await boardSettingsPage.goToPage(testBoard.board._id);

    await boardSettingsPage.inviteMembersButton.click();
    await boardSettingsPage.selectUserToInvite(newMemberUser);
    await boardSettingsPage.addUserToBoardButton.click();

    await expect(boardSettingsPage.getMember(newMemberUser)).toBeVisible();
});

test("should remove user from the board", async ({
    testBoard,
    page,
    boardSettingsPage,
}) => {
    const newMemberUser = AppConfig.getInstance().supplementaryUser.username;

    await boardSettingsPage.goToPage(testBoard.board._id);

    await boardSettingsPage.inviteMembersButton.click();
    await boardSettingsPage.selectUserToInvite(newMemberUser);
    await boardSettingsPage.addUserToBoardButton.click();

    page.on("dialog", async (dialog) => await dialog.accept());
    await boardSettingsPage.getMemberRemoveButton(newMemberUser).click();

    await expect(boardSettingsPage.getMember(newMemberUser)).not.toBeVisible();
});

test("should change user role to admin", async ({
    testBoard,
    boardSettingsPage,
}) => {
    const newMemberUser = AppConfig.getInstance().supplementaryUser.username;

    await boardSettingsPage.goToPage(testBoard.board._id);

    await boardSettingsPage.inviteMembersButton.click();
    await boardSettingsPage.selectUserToInvite(newMemberUser);
    await boardSettingsPage.addUserToBoardButton.click();

    await boardSettingsPage.changeMemberRole(newMemberUser, "ADMIN");
});

test("should filter users when typing users username in the search input", async ({
    testBoard,
    boardSettingsPage,
}) => {
    const newMemberUser = AppConfig.getInstance().supplementaryUser.username;
    const testUser = AppConfig.getInstance().testUser.username;

    await boardSettingsPage.goToPage(testBoard.board._id);

    await boardSettingsPage.inviteMembersButton.click();
    await boardSettingsPage.selectUserToInvite(newMemberUser);
    await boardSettingsPage.addUserToBoardButton.click();

    await boardSettingsPage.memberSearchInput.fill(newMemberUser);

    await expect(boardSettingsPage.getMember(newMemberUser)).toBeVisible();
    await expect(boardSettingsPage.getMember(testUser)).not.toBeVisible();

    await boardSettingsPage.memberSearchInput.fill(testUser);

    await expect(boardSettingsPage.getMember(newMemberUser)).not.toBeVisible();
    await expect(boardSettingsPage.getMember(testUser)).toBeVisible();
});

test("should not be able to edit user role of logged in user", async ({
    page,
    testBoard,
    boardSettingsPage,
}) => {
    const testUser = AppConfig.getInstance().testUser.username;
    await boardSettingsPage.goToPage(testBoard.board._id);

    await boardSettingsPage
        .getMember(testUser)
        .getByTestId("async-search")
        .click();

    await expect(page.getByTestId("async-search-dropdown")).not.toBeVisible();
});

test("should not be able to remove logged in user", async ({
    testBoard,
    boardSettingsPage,
}) => {
    const testUser = AppConfig.getInstance().testUser.username;
    await boardSettingsPage.goToPage(testBoard.board._id);

    await expect(
        boardSettingsPage
            .getMember(testUser)
            .getByRole("button", { name: "remove" })
    ).toBeDisabled();
});
