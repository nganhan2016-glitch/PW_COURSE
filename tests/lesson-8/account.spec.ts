import { test, expect, Page } from '@playwright/test';

test.describe("ACCOUNT - Account", async () => {
    const admin = {
        userName: "betterbytes.academy.admin",
        password: "StrongPass@BetterBytesAcademy"
    }
    const xpath = {
        userName: "//input[@id='user_login']",
        password: "//input[@id='user_pass']",
        btnLogin: "//input[@id='wp-submit']"
    }
    const user = {
        userName: "k20-nga",
        email: "nga123@company.com",
        password: "",
        firstName: "K20 PW",
        lastName: "Nga",
        role: "Editor"
    }
    async function login(page: Page, username: string, password: string) {
        page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin");
        await page.locator(xpath.userName).fill(username);
        await page.locator(xpath.password).fill(password);
        await page.locator(xpath.btnLogin).click();
    }
    async function logout(page: Page) {
        page.locator("//a[contains(@class,'ab-item')]//img[contains(@class,'avatar')]").hover();
        await page.locator("//a[text()='Log Out']").click();
    }

    test.beforeEach(async ({ page }) => {
        await login(page, admin.userName, admin.password);
    });
    test.afterEach(async ({ page }) => {
        await login(page, admin.userName, admin.password);
        page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin/users.php");
        await page.locator("//input[@id='user-search-input']").fill(user.userName);
        await page.locator("//input[@id='search-submit']").click();
        //await page.locator("//a[text()='${user.userName}']").hover();
        //const searchedUser = `//table[contains(@class,'users')]//tbody//tr[1]//td[contains(@class,'column-username')]//a[normalize-space()='${user.userName}']`;
        const searchedUser = `//table[contains(@class,'users')]//a[normalize-space(.)='${user.userName}']`;
        await page.locator(searchedUser).hover();
        await page.locator("//a[text()='Delete']").click();
        await page.locator("//input[@id='delete_option0']").click();
        await page.locator("//input[@id='submit']").click();
        await page.locator("//input[@id='user-search-input']").fill(user.userName);
        await page.locator("//input[@id='search-submit']").click();
        await expect(page.locator("//table[contains(@class,'users')]//td[text() = 'No users found.']")).toBeVisible();

    });
    /*
    test("temp", async ({ page }) => {
        await login(page, admin.userName, admin.password);
        page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin/users.php");
        await page.locator("//input[@id='user-search-input']").fill(user.userName);
        await page.locator("//input[@id='search-submit']").click();
        //await page.locator("//a[text()='${user.userName}']").hover();
        //const searchedUser = `//table[contains(@class,'users')]//tbody//tr[1]//td[contains(@class,'column-username')]//a[normalize-space()='${user.userName}']`;
        const searchedUser = `//table[contains(@class,'users')]//a[normalize-space(.)='${user.userName}']`;
        await page.locator(searchedUser).hover();
        await page.locator("//a[text()='Delete']").click();
        await page.locator("//input[@id='delete_option0']").click();
        await page.locator("//input[@id='submit']").click();
        await page.locator("//input[@id='user-search-input']").fill(user.userName);
        await page.locator("//input[@id='search-submit']").click();
        await expect(page.locator("//table[contains(@class,'users')]//td[text() = 'No users found.']")).toBeVisible();
    })*/

    test("Create account with editor permission", async ({ page }) => {

        await test.step("Đi tới màn quản lý user", async () => {
            page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin/users.php");
            /* Màn hình user hiển thị:
            - Heading "Users" visible
            - Button "Add User" được enable */
            await expect(page.locator("//h1[normalize-space() = 'Users']")).toBeVisible();
            await expect(page.locator("//a[text()='Add User' and @class ='page-title-action']")).toBeEnabled();
        });
        await test.step("Thực hiện thêm mới user", async () => {
            /*  - username: ${khoá-học}_${tên-bạn} (VD: k18-phong)
                - email: email của bạn
                - password: tuỳ ý
                - First name: ${khoá-học}
                - Last name: ${tên-bạn}
                - Role: Editor */

            page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin/user-new.php");
            await page.locator("//input[@id='user_login']").pressSequentially(user.userName);
            await page.locator("//input[@id='email']").pressSequentially(user.email);
            await page.locator("//input[@id='first_name']").pressSequentially(user.firstName);
            await page.locator("//input[@id='last_name']").pressSequentially(user.lastName);
            await page.locator("//select[@id='role']").selectOption({ label: user.role });
            await expect(page.locator("//input[@id='pass1']")).not.toHaveValue('');
            user.password = await page.locator("//input[@id='pass1']").inputValue();
            await page.locator("//input[@id='createusersub']").click();

            // Hiển thị thông báo tạo mới user thành công: New user created.
            await expect(page.locator("//p[contains(normalize-space(),'New user created. ')]")).toBeVisible();

        });
        await test.step("Thực hiện đăng xuất và đăng nhập lại với user name vừa tạo", async () => {
            //await page.locator("//span[text()='Better Bytes Academy Admin']").first().hover();
            //await page.locator("//a[contains(@class,'ab-item')]//img[contains(@class,'avatar')]")
            //await page.locator("//a[text()='Log Out']").click();
            await logout(page);
            await login(page, user.userName, user.password);
            /*
                Đăng nhập thành công
                Hiển thị các menu:
                - Dashboard
                - Posts
                - Media
                - Pages
                - Comments
                - Profile
                - Tools*/
            await expect(page.locator("//li[@id='menu-dashboard']")).toBeVisible();
            await expect(page.locator("//div[text()='Posts']")).toBeVisible();
            await expect(page.locator("//div[text()='Media']")).toBeVisible();
            await expect(page.locator("//div[text()='Pages']")).toBeVisible();
            await expect(page.locator("//div[contains(@class,'wp-menu-name') and contains(normalize-space(),'Comments')]")).toBeVisible();
            await expect(page.locator("//div[text()='Profile']")).toBeVisible();
            await expect(page.locator("//div[text()='Tools']")).toBeVisible();
            /*            
                Không hiển thị các menu:
                - Appearance
                - Uses
                - Plugins
            */
            await expect(page.locator("//div[text()='Appearance']")).not.toBeVisible();
            await expect(page.locator("//div[text()='Users']")).not.toBeVisible();
            await expect(page.locator("//div[contains(@class,'wp-menu-name') and contains(normalize-space(),'Plugins')]")).not.toBeVisible();
            await logout(page);
        });
    })
    test("Create account with subscriber permission", async ({ page }) => {

    });
})