import { test, expect } from '@playwright/test';

test.describe("AUTH - Authentication", async () => {
    test.beforeEach(async ({ page }) => {
        await test.step("Đi tới trang login: https://pw-practice-dev.playwrightvn.com/wp-admin", async () => {
            page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin");
        })
    })
    const invalidUser = {
        userName: "Nga",
        password: "123"
    }
    const validUser = {
        userName: "betterbytes.academy.admin",
        password: "StrongPass@BetterBytesAcademy"
    }
    const xpath = {
        userName: "//input[@id='user_login']",
        password: "//input[@id='user_pass']",
        btnLogin: "//input[@id='wp-submit']",
        errMsg: "//div[@id='login_error']"
    }
    test("@AUTH_001: Login fail", async ({ page }) => {
        await test.step("Nhập vào thông tin username, password bị sai", async () => {
            await page.locator(xpath.userName).pressSequentially(invalidUser.userName);
            await page.locator(xpath.password).fill(invalidUser.password);

            //  Giá trị của username, password được điền vào  ô input
            const actualUsername = await page.locator(xpath.userName).inputValue();
            const actualPassword = await page.locator(xpath.password).inputValue();
            expect(actualUsername).toBe(invalidUser.userName);
            expect(actualPassword).toBe(invalidUser.password);
        });

        await test.step("Click button login", async () => {
            await page.locator(xpath.btnLogin).click();

            /* Hiển thị lỗi: "Error: The username <username> is not registered on this site. 
            If you are unsure of your username, try your email address instead." */
            await expect(page.locator(xpath.errMsg)).toContainText(`Error: The username ${invalidUser.userName} is not registered on this site. If you are unsure of your username, try your email address instead.`);
        });
    })
    test("@AUTH_002: Login success", async ({ page }) => {
        await test.step("Nhập vào thông tin username, password đúng", async () => {
            await page.locator(xpath.userName).fill(validUser.userName);
            await page.locator(xpath.password).fill(validUser.password);

            //  Giá trị của username, password được điền vào  ô input
            const actualUsername = await page.locator(xpath.userName).inputValue();
            const actualPassword = await page.locator(xpath.password).inputValue();
            expect(actualUsername).toBe(validUser.userName);
            expect(actualPassword).toBe(validUser.password);

        })
        await test.step("Click button login", async () => {
            await page.locator(xpath.btnLogin).click();

            /* Login thành công
            Chuyển tới trang có url là /wp-admin
            Có heading h1 "Dashboard" hiển thị
            Có 2 heading h2 là "At a Glance" và "Activity" hiển thị */
            expect(page).toHaveURL(/wp-admin/);
            await expect(page.locator("//h1[text()='Dashboard']")).toBeVisible();
            await expect(page.locator("//h2[text()='At a Glance']")).toBeVisible();
            await expect(page.locator("//h2[text()='Activity']")).toBeVisible();
        })
    })
})