import { Page } from "@playwright/test";

class NavbarElement {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get navbar() {
        return this.page.getByRole("navigation", { name: "navbar" });
    }

    get loginNavButton() {
        return this.navbar.getByRole("button", { name: "Login" });
    }

    get registerNavButton() {
        return this.navbar.getByRole("button", { name: "Register" });
    }

    get homeNavButton() {
        return this.navbar.getByRole("button", { name: "home" });
    }

    get profileNavButton() {
        return this.navbar.getByRole("button", { name: "profile" });
    }

    get notificationNavButton() {
        return this.navbar.getByRole("button", { name: "notifications" });
    }

    async login({ username, password }: { username: string; password: string }) {
        await this.page.getByRole("textbox", { name: "username" }).fill(username);
        await this.page.getByRole("textbox", { name: "password" }).fill(password);
        await this.page.getByRole("button", { name: "Log In" }).click();
    }

    async isLoggedIn() {
        return await this.profileNavButton.isVisible();
    }
}

export default NavbarElement;
