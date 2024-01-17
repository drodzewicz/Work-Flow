import BasePage from "./BasePage";

class BoardSettings extends BasePage {
  get backToBoarddButton() {
    return this.page.getByRole("button", { name: "back to board" });
  }

  get deleteButton() {
    return this.page.getByRole("button", { name: "Delete Board" });
  }

  get leaveBoardButton() {
    return this.page.getByRole("button", { name: "Leave board" });
  }

  get inviteMembersButton() {
    return this.page
      .getByRole("region", { name: "Members" })
      .getByRole("button", { name: "Invite new members" });
  }

  get saveChangesButton() {
    return this.page
      .getByRole("region", { name: "General" })
      .getByRole("button", { name: "save changes" });
  }

  get boardNameInput() {
    return this.page
      .getByRole("region", { name: "General" })
      .getByRole("textbox", { name: "name" });
  }

  get boardDescriptionInput() {
    return this.page
      .getByRole("region", { name: "General" })
      .getByRole("textbox", { name: "description" });
  }

  get addUserToBoardButton() {
    return this.page.getByRole("dialog").getByRole("button", { name: "Add to the board" });
  }

  get createTagButton() {
    return this.page.getByRole("dialog").getByRole("button", { name: "Create" });
  }

  get memberSearchInput() {
    return this.page
      .getByRole("region", { name: "Members" })
      .getByRole("textbox", { name: /Search/ });
  }

  getMember(username: string) {
    return this.page
      .getByRole("region", { name: "Members" })
      .getByTestId("user-card")
      .filter({ hasText: username });
  }

  getMemberRemoveButton(username: string) {
    return this.getMember(username).getByRole("button", { name: "remove" });
  }

  async selectUserToInvite(username: string) {
    await this.page.getByRole("dialog").getByRole("textbox", { name: "Search" }).click();
    await this.page.getByRole("dialog").getByRole("textbox", { name: "Search" }).fill(username);
    await this.page.getByTestId("async-search-option").filter({ hasText: username }).click();
  }

  async changeMemberRole(username: string, role: string) {
    await this.getMember(username).getByTestId("async-search").click();
    await this.page.getByTestId("async-search-option").filter({ hasText: role }).click();
  }

  pageURL(id: string) {
    return `/board/${id}/settings`;
  }

  async goToPage(id: string) {
    await this.page.goto(this.pageURL(id));
  }

  async pageLoaded(id = "**") {
    await this.page.waitForURL(this.pageURL(id));
  }
}

export default BoardSettings;
