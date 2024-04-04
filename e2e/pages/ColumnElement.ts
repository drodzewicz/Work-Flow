import { expect } from "@playwright/test";
import BasePage from "@/pages/BasePage";

class ColumnElement extends BasePage {
  getByName(name: string) {
    return this.page.getByTestId("column").filter({ hasText: name });
  }

  getByIndex(index: number) {
    return this.page.getByTestId("column").nth(index);
  }

  async updateName(columnName: string, newName: string) {
    await this.getByName(columnName).getByLabel("column-title").dblclick();
    await this.page.getByRole("textbox", { name: "column-title" }).fill(newName);
    await this.page.keyboard.press("Enter");
  }

  async delete(columnName: string) {
    await this.getByName(columnName).getByTestId("column-option-btn").click();

    await this.page
      .getByRole("list", { name: "dropdown" })
      .getByRole("listitem")
      .filter({ hasText: "Delete" })
      .click();
  }

  async move(sourceColumnName: string, destinationColumnName: string) {
    const sourceColumn = this.getByName(sourceColumnName).getByRole("banner");
    const destinationColumn = this.getByName(destinationColumnName).getByRole("banner");

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

  async hasTask(columnName: string, taskName: string) {
    await expect(
      this.getByName(columnName).getByTestId("task-card").filter({ hasText: taskName })
    ).toBeVisible();
  }
}

export default ColumnElement;
