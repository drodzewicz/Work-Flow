import { Page } from "@playwright/test";

abstract class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }
}

export default BasePage;
