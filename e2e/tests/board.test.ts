import { envConfig } from "../playwright.config";
import Board from "../pages/Board";
import BoardSettings from "../pages/BoardSettings";
import Dashboard from "../pages/Dashboard";
import { test, expect } from "../utils/fixtures";

test.beforeEach(async ({ testBoard, boardPage }) => {
  await Promise.all([
    testBoard.addMember(envConfig.SUPPLEMENTARY_USER.username),
    testBoard.addTag({ name: "tag_1", color: "#ff0000" }),
    testBoard.addTag({ name: "tag_2", color: "#00ff00" }),
    testBoard.addTag({ name: "tag_3", color: "#0000ff" }),
  ]);

  await boardPage.goToPage(testBoard.board._id);
});

test.describe("Board column test", () => {
  test("should create new column", async ({ boardPage }) => {
    const newColumnName = "Test New Column";
    await boardPage.createColumn(newColumnName);

    await expect(boardPage.getColumn(newColumnName)).toBeVisible();
  });

  test("should delete column", async ({ boardPage, page }) => {
    const newColumnName = "Test New Column";
    await boardPage.createColumn(newColumnName);
    await expect(boardPage.getColumn(newColumnName)).toBeVisible();

    page.on("dialog", async (dialog) => await dialog.accept());
    await boardPage.deleteColumn(newColumnName);

    await expect(boardPage.getColumn(newColumnName)).not.toBeVisible();
  });

  test("should update column name", async ({ boardPage }) => {
    const newColumnName = "Test New Column";
    const updatedName = "Updated title";

    await boardPage.createColumn(newColumnName);
    await expect(boardPage.getColumnByIndex(0)).toContainText(newColumnName);

    await boardPage.updateColumnName(newColumnName, updatedName);

    await expect(boardPage.getColumnByIndex(0)).not.toContainText(newColumnName);
    await expect(boardPage.getColumnByIndex(0)).toContainText(updatedName);
  });

  test("should move columns", async ({ boardPage, page }) => {
    const firstColumn = "first";
    const secondColumn = "second";
    const thirdColumn = "third";

    await boardPage.createColumn(firstColumn);
    await boardPage.createColumn(secondColumn);
    await boardPage.createColumn(thirdColumn);

    await expect(boardPage.getColumnByIndex(0)).toContainText(firstColumn);
    await expect(boardPage.getColumnByIndex(1)).toContainText(secondColumn);
    await expect(boardPage.getColumnByIndex(2)).toContainText(thirdColumn);

    page.on("dialog", async (dialog) => await dialog.accept());
    await boardPage.moveColumn(firstColumn, thirdColumn);

    await expect(boardPage.getColumnByIndex(0)).toContainText(secondColumn);
    await expect(boardPage.getColumnByIndex(1)).toContainText(thirdColumn);
    await expect(boardPage.getColumnByIndex(2)).toContainText(firstColumn);
  });
});

test.describe("Board task test", () => {
  const firstColumn = "first";
  const secondColumn = "second";
  let taskData: any;

  test.beforeEach(async ({ boardPage, testBoard }) => {
    await boardPage.createColumn(firstColumn);
    await boardPage.createColumn(secondColumn);

    taskData = {
      title: "new task",
      description: "task description",
      tags: [testBoard.tags[0].name, testBoard.tags[1].name],
      assignees: [testBoard.members[1].user.username],
    };

    await boardPage.createTask(firstColumn, taskData);
  });

  test("should create new task and add it in the column", async ({ boardPage }) => {
    const taskElement = boardPage
      .getColumn(firstColumn)
      .getByTestId("task-card")
      .filter({ hasText: taskData.title });

    await expect(taskElement).toBeVisible();

    await expect(taskElement.getByTestId("task-tag")).toHaveCount(2);
    await expect(
      taskElement.getByTestId("task-tag").filter({ hasText: taskData.tags[0] })
    ).toBeVisible();
    await expect(
      taskElement.getByTestId("task-tag").filter({ hasText: taskData.tags[1] })
    ).toBeVisible();

    await expect(taskElement.getByRole("img", { name: "task-assignee" })).toHaveCount(1);
  });

  test("should delete task", async ({ boardPage, page }) => {
    await boardPage.getTask(taskData.title).click();

    page.on("dialog", async (dialog) => await dialog.accept());
    await boardPage.taskDeleteButton.click();

    await expect(page.getByRole("dialog")).not.toBeVisible();
    await expect(boardPage.getTask(taskData.title)).not.toBeVisible();
  });

  test("should edit task title and description", async ({ boardPage, testBoard, page }) => {
    const updatedTask = {
      title: "updated title",
      description: "updated description",
    };

    await boardPage.getTask(taskData.title).click();
    await boardPage.taskEditButton.click();

    await boardPage.taskTitleInput.fill(updatedTask.title);
    await boardPage.taskDescriptionInput.fill(updatedTask.description);

    await boardPage.taskSaveChangesButton.click();

    await expect(
      page.getByRole("dialog").getByRole("heading", { name: updatedTask.title })
    ).toBeVisible();
    await expect(page.getByRole("dialog").getByRole("article")).toContainText(
      updatedTask.description
    );
  });

  test("should edit task assignee", async ({ boardPage, testBoard, page }) => {
    await boardPage.getTask(taskData.title).click();
    await boardPage.taskEditButton.click();

    await boardPage.getTaskAssigneeCard(taskData.assignees[0]).getByRole("button").click();
    await boardPage.taskAssigneeSearch.click();
    await page
      .getByTestId("async-search-option")
      .filter({ hasText: testBoard.members[0].user.username })
      .click();

    await boardPage.taskSaveChangesButton.click();

    // await expect(boardPage.getTaskAssigneeCard(taskData.assignees[0])).toBeVisible();
    // await expect(boardPage.getTaskAssigneeCard(taskData.assignees[1])).not.toBeVisible();
  });
});
