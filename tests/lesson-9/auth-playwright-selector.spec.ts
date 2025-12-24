import { test, expect } from '@playwright/test';

test.describe("AUTH - Authentication", async () => {
    test.beforeEach(async ({ page }) => {
        await test.step("Đi tới trang login: https://pw-practice-dev.playwrightvn.com/wp-admin", async () => {
            await page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin");
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
    test("@AUTH_001: Login fail", async ({ page }) => {
        await test.step("Nhập vào thông tin username, password bị sai", async () => {
            await page.getByRole('textbox', { name: 'Username or Email Address' }).fill(invalidUser.userName);
            await page.getByRole('textbox', { name: 'Password' }).fill(invalidUser.password);

            //  Giá trị của username, password được điền vào  ô input
            await expect(page.getByRole('textbox', { name: 'Username or Email Address' })).toHaveValue(invalidUser.userName);
            await expect(page.getByRole('textbox', { name: 'Password' })).toHaveValue(invalidUser.password);
        });

        await test.step("Click button login", async () => {
            await page.getByRole('button', { name: 'Log In' }).click();

            /* Hiển thị lỗi: "Error: The username <username> is not registered on this site. 
            If you are unsure of your username, try your email address instead." */
            await expect(page.locator("//div[@id='login_error']")).toContainText(`Error: The username ${invalidUser.userName} is not registered on this site. If you are unsure of your username, try your email address instead.`);
        });
    })
    test("@AUTH_002: Login success", async ({ page }) => {
        await test.step("Nhập vào thông tin username, password đúng", async () => {
            await page.getByRole('textbox', { name: 'Username or Email Address' }).fill(validUser.userName);
            await page.getByRole('textbox', { name: 'Password' }).fill(validUser.password);

            //  Giá trị của username, password được điền vào  ô input
            await expect(page.getByRole('textbox', { name: 'Username or Email Address' })).toHaveValue(validUser.userName);
            await expect(page.getByRole('textbox', { name: 'Password' })).toHaveValue(validUser.password);

        })
        await test.step("Click button login", async () => {
            await page.getByRole('button', { name: 'Log In' }).click();

            /* Login thành công
            Chuyển tới trang có url là /wp-admin
            Có heading h1 "Dashboard" hiển thị
            Có 2 heading h2 là "At a Glance" và "Activity" hiển thị */
            expect(page).toHaveURL(/wp-admin/);
            await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
            await expect(page.getByRole('heading', { name: 'At a Glance' })).toBeVisible();
            await expect(page.getByRole('heading', { name: 'Activity' })).toBeVisible();
        })
    })
})