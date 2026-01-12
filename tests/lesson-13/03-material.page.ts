import { Page } from "@playwright/test";

export class MaterialPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto("https://material.playwrightvn.com");
    }

    async selectLesson(lessonName: string) {
        await this.page.getByText(lessonName).click();
    }
}