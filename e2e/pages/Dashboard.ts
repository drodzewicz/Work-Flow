import { Page } from "@playwright/test";

class Dashboard {
  private page: Page;

  pageURL = "/dashboard";

  constructor(page: Page) {
    this.page = page;
  }

  // GETTERS
  // getBoardPagination() {
  //   const paginationElement = this.page.getByRole("navigation", { name: "pagination" });
  //   return {
  //     next: () => paginationElement.getByRole("button", { name: "next-page-navigation" }),
  //     previous: () => paginationElement.getByRole("button", { name: "previous-page-navigation" }),
  //   };
  // }

  get newBoardButton() {
    return this.page.getByRole("button", { name: "New Board" });
  }

  getBoardCard(name: string) {
    return this.page
      .locator(".board-container-section")
      .filter({ hasText: "Boards" })
      .getByTestId("board-card")
      .filter({ hasText: name });
  }

  getPinnedBoardCard(name: string) {
    return this.page
      .locator(".board-container-section")
      .filter({ hasText: "Pinned" })
      .getByTestId("board-card")
      .filter({ hasText: name });
  }

  // ACTIONS

  async goToPage() {
    await this.page.goto(this.pageURL);
  }

  async pageLoaded() {
    await this.page.waitForURL(this.pageURL);
  }

  async createNewBoard(name: string, description: string) {
    await this.page.getByRole("textbox", { name: "name" }).fill(name);
    await this.page.getByRole("textbox", { name: "description" }).fill(description);

    await this.page.getByRole("button", { name: "Create" }).click();
  }
}

export default Dashboard;
