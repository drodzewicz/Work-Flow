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

    await expect(boardPage.columnElement.getByName(newColumnName)).toBeVisible();
  });

  test("should delete column", async ({ boardPage, page }) => {
    const newColumnName = "Test New Column";
    await boardPage.createColumn(newColumnName);
    await expect(boardPage.columnElement.getByName(newColumnName)).toBeVisible();

    page.on("dialog", async (dialog) => await dialog.accept());
    await boardPage.columnElement.delete(newColumnName);

    await expect(boardPage.columnElement.getByName(newColumnName)).not.toBeVisible();
  });

  test("should update column name", async ({ boardPage }) => {
    const newColumnName = "Test New Column";
    const updatedName = "Updated title";

    await boardPage.createColumn(newColumnName);
    await expect(boardPage.columnElement.getByIndex(0)).toContainText(newColumnName);

    await boardPage.columnElement.updateName(newColumnName, updatedName);

    await expect(boardPage.columnElement.getByIndex(0)).not.toContainText(newColumnName);
    await expect(boardPage.columnElement.getByIndex(0)).toContainText(updatedName);
  });

  test("should move columns", async ({ boardPage, page }) => {
    const firstColumn = "first";
    const secondColumn = "second";
    const thirdColumn = "third";

    await boardPage.createColumn(firstColumn);
    await boardPage.createColumn(secondColumn);
    await boardPage.createColumn(thirdColumn);

    await expect(boardPage.columnElement.getByIndex(0)).toContainText(firstColumn);
    await expect(boardPage.columnElement.getByIndex(1)).toContainText(secondColumn);
    await expect(boardPage.columnElement.getByIndex(2)).toContainText(thirdColumn);

    page.on("dialog", async (dialog) => await dialog.accept());
    await boardPage.columnElement.move(firstColumn, thirdColumn);

    await expect(boardPage.columnElement.getByIndex(0)).toContainText(secondColumn);
    await expect(boardPage.columnElement.getByIndex(1)).toContainText(thirdColumn);
    await expect(boardPage.columnElement.getByIndex(2)).toContainText(firstColumn);
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

  test("should create new task and add it the column", async ({ boardPage }) => {
    await boardPage.columnElement.hasTask(firstColumn, taskData.title);

    await expect(boardPage.taskCardElement.getTags(taskData.title)).toHaveCount(2);
    await expect(
      boardPage.taskCardElement.getTags(taskData.title).filter({ hasText: taskData.tags[0] })
    ).toBeVisible();
    await expect(
      boardPage.taskCardElement.getTags(taskData.title).filter({ hasText: taskData.tags[1] })
    ).toBeVisible();

    await expect(boardPage.taskCardElement.getAssignees(taskData.title)).toHaveCount(1);
  });

  test("should delete task", async ({ boardPage, page }) => {
    await boardPage.taskCardElement.getByName(taskData.title).click();

    page.on("dialog", async (dialog) => await dialog.accept());
    await boardPage.taskDialogElement.deleteButton.click();

    await expect(page.getByRole("dialog")).not.toBeVisible();
    await expect(boardPage.taskCardElement.getByName(taskData.title)).not.toBeVisible();
  });

  test("should edit task title and description", async ({ boardPage, testBoard, page }) => {
    const updatedTask = {
      title: "updated title",
      description: "updated description",
    };

    await boardPage.taskCardElement.getByName(taskData.title).click();
    await boardPage.taskDialogElement.editButton.click();

    await boardPage.taskDialogElement.titleInput.fill(updatedTask.title);
    await boardPage.taskDialogElement.descriptionInput.fill(updatedTask.description);

    await boardPage.taskDialogElement.saveChangesButton.click();

    await expect(
      page.getByRole("dialog").getByRole("heading", { name: updatedTask.title })
    ).toBeVisible();
    await expect(page.getByRole("dialog").getByRole("article")).toContainText(
      updatedTask.description
    );
  });

  test("should edit task assignee", async ({ boardPage, testBoard, page }) => {
    await boardPage.taskCardElement.getByName(taskData.title).click();
    await boardPage.taskDialogElement.editButton.click();

    await boardPage.taskDialogElement
      .getTaskAssigneeCard(taskData.assignees[0])
      .getByRole("button")
      .click();
    await boardPage.taskDialogElement.assigneeSearch.click();
    await page
      .getByTestId("async-search-option")
      .filter({ hasText: testBoard.members[0].user.username })
      .click();

    await boardPage.taskDialogElement.saveChangesButton.click();
  });
});

test.describe("Test task moving", () => {
  const firstColumn = "first column";
  const secondColumn = "second column";
  const thirdColumn = "third column";

  let firstColumnTasks: any[] = [];
  let secondColumnTasks: any[] = [];

  test.beforeEach(async ({ boardPage, testBoard }) => {
    test.setTimeout(120000);

    await boardPage.createColumn(firstColumn);
    await boardPage.createColumn(secondColumn);
    await boardPage.createColumn(thirdColumn);

    firstColumnTasks = [
      {
        title: "First task",
        description: "task description",
        tags: [testBoard.tags[0].name],
        assignees: [testBoard.members[1].user.username],
      },
    ];

    secondColumnTasks = [
      {
        title: "Second task",
        description: "task description",
        tags: [testBoard.tags[1].name],
        assignees: [testBoard.members[1].user.username],
      },
      {
        title: "Third task",
        description: "task description",
        tags: [testBoard.tags[2].name],
        assignees: [],
      },
      {
        title: "Fourth task",
        description: "task description",
        tags: [],
        assignees: [testBoard.members[0].user.username],
      },
    ];

    for (const task of firstColumnTasks) {
      await boardPage.createTask(firstColumn, task);
    }

    for (const task of secondColumnTasks) {
      await boardPage.createTask(secondColumn, task);
    }
  });

  test("Move task from first column to the first", async ({ boardPage }) => {
    await boardPage.taskCardElement.move(firstColumnTasks[0].title, secondColumn, 0);

    await expect(boardPage.taskCardElement.getByIndex(secondColumn, 0)).toContainText(
      firstColumnTasks[0].title
    );
    await expect(boardPage.taskCardElement.getByIndex(secondColumn, 1)).toContainText(
      secondColumnTasks[0].title
    );
    await expect(boardPage.taskCardElement.getByIndex(secondColumn, 2)).toContainText(
      secondColumnTasks[1].title
    );
    await expect(boardPage.taskCardElement.getByIndex(secondColumn, 3)).toContainText(
      secondColumnTasks[2].title
    );
  });

  test("Move task from first column to the second", async ({ boardPage }) => {
    await boardPage.taskCardElement.move(firstColumnTasks[0].title, secondColumn, 1);

    await expect(boardPage.taskCardElement.getByIndex(secondColumn, 0)).toContainText(
      secondColumnTasks[0].title
    );
    await expect(boardPage.taskCardElement.getByIndex(secondColumn, 1)).toContainText(
      firstColumnTasks[0].title
    );
    await expect(boardPage.taskCardElement.getByIndex(secondColumn, 2)).toContainText(
      secondColumnTasks[1].title
    );
    await expect(boardPage.taskCardElement.getByIndex(secondColumn, 3)).toContainText(
      secondColumnTasks[2].title
    );
  });

  test("Move task from first column to the last", async ({ boardPage }) => {
    await boardPage.taskCardElement.move(firstColumnTasks[0].title, secondColumn, 3);

    await expect(boardPage.taskCardElement.getByIndex(secondColumn, 0)).toContainText(
      secondColumnTasks[0].title
    );
    await expect(boardPage.taskCardElement.getByIndex(secondColumn, 1)).toContainText(
      secondColumnTasks[1].title
    );
    await expect(boardPage.taskCardElement.getByIndex(secondColumn, 2)).toContainText(
      secondColumnTasks[2].title
    );
    await expect(boardPage.taskCardElement.getByIndex(secondColumn, 3)).toContainText(
      firstColumnTasks[0].title
    );
  });

  test("Move task to empty column", async ({ boardPage }) => {
    await boardPage.taskCardElement.move(firstColumnTasks[0].title, thirdColumn, 0);

    await expect(boardPage.taskCardElement.getByIndex(thirdColumn, 0)).toContainText(
      firstColumnTasks[0].title
    );
  });
});
