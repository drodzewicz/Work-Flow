import { Page, expect } from "@playwright/test";
import { test } from "../fixtures/fixtures";
import ColumnElement from "./ColumnElement";
import TaskDialogElement from "./TaskDialogElement";
import TaskCardElement from "./TaskCardElement";
import BasePage from "./BasePage";

class Board extends BasePage {
  columnElement: ColumnElement;
  taskCardElement: TaskCardElement;
  taskDialogElement: TaskDialogElement;

  constructor(page: Page) {
    super(page);
    this.columnElement = new ColumnElement(page);
    this.taskCardElement = new TaskCardElement(page);
    this.taskDialogElement = new TaskDialogElement(page);
  }

  get settingsButton() {
    return this.page.getByRole("button", { name: "Settings" });
  }

  get newColumnInput() {
    return this.page.getByRole("textbox", { name: "Add New Column..." });
  }

  pageURL(id: string) {
    return `/board/${id}`;
  }

  async goToPage(id: string) {
    await this.page.goto(this.pageURL(id));
  }

  async createColumn(name: string) {
    await test.step("Create new column", async () => {
      await this.newColumnInput.fill(name);
      await this.page.keyboard.press("Enter");
    });
    await test.step("remove alert", async () => {
      await this.page.getByRole("alert").click();
      await expect(this.page.getByRole("alert")).not.toBeVisible();
    });
  }

  async pageLoaded(options?: { id?: string; boardName?: string }) {
    await this.page.waitForURL(this.pageURL(options?.id || "**"));

    if (options?.boardName) {
      await expect(this.page.getByRole("heading", { name: options.boardName })).toBeVisible();
    }
  }

  async createTask(
    columnName: string,
    taskData: { title: string; description: string; tags: string[]; assignees: string[] }
  ) {
    await test.step("open column add task form dialog", async () => {
      await this.columnElement.getByName(columnName).getByTestId("add-task-btn").click();
      await expect(this.page.getByRole("dialog")).toHaveText(/Create new Task/);
    });
    await test.step("fill title and description", async () => {
      await this.taskDialogElement.titleInput.fill(taskData.title);
      await this.taskDialogElement.descriptionInput.fill(taskData.description);
    });

    if (!!taskData.tags) {
      await test.step("select tags", async () => {
        for (let i = 0; i < taskData.tags.length; i++) {
          const tag = taskData.tags[i];
          await test.step(`selecting tag '${tag}'`, async () => {
            await this.taskDialogElement.tagSearch.click();
            await this.page.getByTestId("async-search-option").filter({ hasText: tag }).click();
          });
        }
      });
    }

    if (!!taskData.assignees) {
      await test.step("select assignees", async () => {
        for (let i = 0; i < taskData.assignees.length; i++) {
          const assignee = taskData.assignees[i];
          await test.step(`selecting assignee '${assignee}'`, async () => {
            await this.taskDialogElement.assigneeSearch.click();
            await this.page
              .getByTestId("async-search-option")
              .filter({ hasText: assignee })
              .click();
          });
        }
      });
    }

    await test.step("submit form", async () => {
      await this.page
        .getByRole("dialog")
        .getByRole("button", { name: /Create/ })
        .click();
      await expect(this.page.getByRole("dialog")).toBeHidden();
    });
    await test.step("remove alert", async () => {
      await this.page.getByRole("alert").click();
      await expect(this.page.getByRole("alert")).not.toBeVisible();
    });
  }
}

export default Board;
