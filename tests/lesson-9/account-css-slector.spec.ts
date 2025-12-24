import { test, expect, Page } from '@playwright/test';

test.describe("ACCOUNT - Account", async () => {
    const admin = {
        userName: "betterbytes.academy.admin",
        password: "StrongPass@BetterBytesAcademy"
    }
    const xpath = {
        userName: "#user_login",
        password: "#user_pass",
        btnLogin: "#wp-submit"
    }
    const user = {
        userName: "k20-nga",
        email: "nga123@company.com",
        password: "",
        firstName: "K20 PW",
        lastName: "Nga",
        role: ""
    }
    async function login(page: Page, username: string, password: string) {
        await page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin");
        await page.locator(xpath.userName).fill(username);
        await page.locator(xpath.password).fill(password);
        await page.locator(xpath.btnLogin).click();
    }
    async function logout(page: Page) {
        await page.locator(".avatar-26").hover();
        await page.locator("//a[text()='Log Out']").click();
    }
    async function addUser(page: Page, role: string) {
        await page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin/user-new.php");
        await page.locator("#user_login").pressSequentially(user.userName);
        await page.locator("#email").pressSequentially(user.email);
        await page.locator("#first_name").pressSequentially(user.firstName);
        await page.locator("#last_name").pressSequentially(user.lastName);
        await page.locator("#role").selectOption({ label: role });
        await expect(page.locator("#pass1")).not.toHaveValue('');
        user.password = await page.locator("#pass1").inputValue();
        user.role = role;
        await page.locator("#createusersub").click();
    }

    test.beforeEach(async ({ page }) => {
        await login(page, admin.userName, admin.password);
    });
    test.afterEach(async ({ page }) => {
        await login(page, admin.userName, admin.password);
        await page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin/users.php");
        await page.locator("#user-search-input").fill(user.userName);
        await page.locator("#search-submit").click();
        const searchedUser = `//table[contains(@class,'users')]//a[normalize-space(.)='${user.userName}']`;
        await page.locator(searchedUser).hover();
        await page.locator("//a[text()='Delete']").click();
        if (user.role === "Editor") {
            await page.locator("#delete_option0").click();
            await page.locator("#submit").click();
        } else if (user.role === "Subscriber") {
            await page.locator("#submit").click();
        }      
        await page.locator("#user-search-input").fill(user.userName);
        await page.locator("#search-submit").click();
        await expect(page.locator("//table[contains(@class,'users')]//td[text() = 'No users found.']")).toBeVisible();
        page.close();
    });

    test("@ACC_001: Create account with editor permission", async ({ page }) => {
        await test.step("Đi tới màn quản lý user", async () => {
            await page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin/users.php");
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
            await addUser(page, "Editor");
            
            // Hiển thị thông báo tạo mới user thành công: New user created.
            await expect(page.locator("//p[contains(normalize-space(),'New user created. ')]")).toBeVisible();

        });
        await test.step("Thực hiện đăng xuất và đăng nhập lại với user name vừa tạo", async () => {
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
            await expect(page.locator("#menu-dashboard")).toBeVisible();
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
    });

    test("@ACC_002: Create account with subscriber permission", async ({ page }) => {
        await test.step("Đi tới màn quản lý user", async () => {
            await page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin/users.php");
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
                - Role: Subscriber */

            await addUser(page, "Subscriber");
            // Hiển thị thông báo tạo mới user thành công: New user created.
            await expect(page.locator("//p[contains(normalize-space(),'New user created. ')]")).toBeVisible();

        });
        await test.step("Thực hiện đăng xuất và đăng nhập lại với user name vừa tạo", async () => {
            await logout(page);
            await login(page, user.userName, user.password);
            /*
                Đăng nhập thành công
                Hiển thị các menu:
                - Dashboard
                - Profile
            */
            await expect(page.locator("#menu-dashboard")).toBeVisible();
            await expect(page.locator("//div[text()='Profile']")).toBeVisible();
            /*            
                Không hiển thị các menu:
                - Appearance
                - Uses
                - Plugins
                - Posts
                - Media
                - Pages
                - Comments
                - Tools
            */
            await expect(page.locator("//div[text()='Appearance']")).not.toBeVisible();
            await expect(page.locator("//div[text()='Users']")).not.toBeVisible();
            await expect(page.locator("//div[contains(@class,'wp-menu-name') and contains(normalize-space(),'Plugins')]")).not.toBeVisible();
            await expect(page.locator("//div[text()='Posts']")).not.toBeVisible();
            await expect(page.locator("//div[text()='Media']")).not.toBeVisible();
            await expect(page.locator("//div[text()='Pages']")).not.toBeVisible();
            await expect(page.locator("//div[contains(@class,'wp-menu-name') and contains(normalize-space(),'Comments')]")).not.toBeVisible();
            await expect(page.locator("//div[text()='Tools']")).not.toBeVisible();
            await logout(page);
        });
    });
})