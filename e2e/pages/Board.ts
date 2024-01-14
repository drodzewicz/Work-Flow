import { Page, expect } from "@playwright/test";
import { test } from "../utils/fixtures";

class Board {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get settingsButton() {
    return this.page.getByRole("button", { name: "Settings" });
  }

  get newColumnInput() {
    return this.page.getByRole("textbox", { name: "Add New Column..." });
  }

  get taskDeleteButton() {
    return this.page.getByRole("dialog").getByRole("button", { name: "Delete" });
  }

  get taskEditButton() {
    return this.page.getByRole("dialog").getByRole("button", { name: "Edit" });
  }

  get taskTitleInput() {
    return this.page.getByRole("dialog").getByRole("textbox", { name: "title" });
  }

  get taskDescriptionInput() {
    return this.page.getByRole("dialog").getByRole("textbox", { name: "description" });
  }

  get taskSaveChangesButton() {
    return this.page.getByRole("dialog").getByRole("button", { name: "Save Changes" });
  }

  get taskAssigneeSearch() {
    return this.page.getByRole("dialog").getByRole("textbox", { name: "Assignees" });
  }

  get taskTagSearch() {
    return this.page.getByRole("dialog").getByRole("textbox", { name: "Tags" });
  }

  getTaskAssigneeCard(username: string) {
    return this.page.getByRole("dialog").getByTestId("user-card").filter({ hasText: username });
  }

  getTask(name: string) {
    return this.page.getByTestId("task-card").filter({ hasText: name });
  }

  getColumn(name: string) {
    return this.page.getByTestId("column").filter({ hasText: name });
  }

  getColumnByIndex(index: number) {
    return this.page.getByTestId("column").nth(index);
  }

  async moveColumn(sourceColumnName: string, destinationColumnName: string) {
    const sourceColumn = this.getColumn(sourceColumnName).getByRole("banner");
    const destinationColumn = this.getColumn(destinationColumnName).getByRole("banner");

    const box = await destinationColumn.boundingBox();
    if (box) {
      await sourceColumn.hover();
      await this.page.mouse.down();
      await this.page.mouse.move(box.x + box.width / 2 + 100, box.y + box.height / 2, {
        steps: 10,
      });
      await this.page.mouse.up();
    }
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
  }

  async updateColumnName(columnName: string, newName: string) {
    await this.getColumn(columnName).getByLabel("column-title").dblclick();
    await this.page.getByRole("textbox", { name: "column-title" }).fill(newName);
    await this.page.keyboard.press("Enter");
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
      await this.getColumn(columnName).getByTestId("add-task-btn").click();
      await expect(this.page.getByRole("dialog")).toHaveText(/Create new Task/);
    });
    await test.step("fill title and description", async () => {
      await this.taskTitleInput.fill(taskData.title);
      await this.taskDescriptionInput.fill(taskData.description);
    });

    if (!!taskData.tags) {
      await test.step("select tags", async () => {
        for (let i = 0; i < taskData.tags.length; i++) {
          const tag = taskData.tags[i];
          await test.step(`selecting tag '${tag}'`, async () => {
            await this.taskTagSearch.click();
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
            await this.taskAssigneeSearch.click();
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
  }

  async deleteColumn(columnName: string) {
    await this.getColumn(columnName).getByTestId("column-option-btn").click();

    await this.page
      .getByRole("list", { name: "dropdown" })
      .getByRole("listitem")
      .filter({ hasText: "Delete" })
      .click();
  }
}

export default Board;
