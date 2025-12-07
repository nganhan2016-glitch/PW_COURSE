import { test } from "@playwright/test";
/*
Truy cập trang https://material.playwrightvn.com/, click vào “Bài
học 3: Todo page”.
a. Thêm mới 100 todo item có nội dung “Todo <i>”
b. Xoá các todo có số lẻ
*/

test("To do Page", async ({ page }) => {
    await test.step("Truy cập https://material.playwrightvn.com, click vào “Bài học 3: Todo page”", async () => {
        await page.goto("https://material.playwrightvn.com/");
        await page.locator("//a[@href='03-xpath-todo-list.html']").click();
    })
    await test.step("Thêm mới 100 todo item có nội dung “Todo <i>", async () => {
        for (let i = 1; i <= 100; i++) {
            await page.locator("//input[@id='new-task']").fill(`Todo ${i}`);
            await page.locator("//button[@id='add-task']").click();
        }
    })
    await test.step("Xoá các todo có số lẻ", async () => {
        page.on('dialog', async dialog => dialog.accept());
        for (let i = 99; i >=1; i -= 2) {
            await page.locator(`(//button[text()='Delete'])[${i}]`).click();
        }
        /* tại sao viet nhu nay thi lai bi loi timeout mac du van xoa duoc cac todo số lẻ?
        for (let i = 1; i <=9; i += 1) {
            console.log(i);
            await page.locator(`(//button[text()='Delete'])[${i}]`).click();
        } 
        */
    })
})