import { test, expect } from "@playwright/test";
import { TodoPage } from "./page/01-pom.ts";

test.describe("Exercise 3: To do Page", () => {
    test("To do page", async ({ page }) => {
        const todoPage = new TodoPage(page);
        // Truy cập https://material.playwrightvn.com, click vào “Bài học 3: Todo page"
        await todoPage.openMaterialPage();
        await todoPage.goToPage(todoPage.xpathTodoPage);

        // Thêm mới 100 todo item có nội dung “Todo <i>"
        for (let i = 1; i <= 100; i++) {
            await todoPage.addTask(`Todo ${i}`);
        }

        // Xoá các todo có số lẻ
        page.on('dialog', async dialog => dialog.accept());
        for (let i = 1; i < 100; i += 2) {
            await page.locator(`//button[@id='todo-${i}-delete']`).click();
        }

        // Kiem tra todo co so thu tu 90 nam trong viewport
        await expect(page.locator("//span[text()='Todo 90']")).toBeVisible();

        // Kiem tra todo co so thu tu 21 bi an (khong nam trong DOM)
        await expect(page.locator("//span[text()='Todo 21']")).not.toBeVisible();

        await page.close();
    })
})