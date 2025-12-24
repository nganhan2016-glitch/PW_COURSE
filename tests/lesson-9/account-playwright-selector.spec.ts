import { test, expect, Page } from '@playwright/test';

test.describe("ACCOUNT - Account", async () => {
    const admin = {
        userName: "betterbytes.academy.admin",
        password: "StrongPass@BetterBytesAcademy"
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
        await page.getByRole('textbox', { name: 'Username or Email Address' }).fill(username);
        await page.getByRole('textbox', { name: 'Password' }).fill(password);
        await page.getByRole('button', { name: 'Log In' }).click();
    }
    async function logout(page: Page) {
        await page.locator("//img[contains(@class,'avatar-26')]").hover();
        await page.locator("//a[text()='Log Out']").click();
        //await page.getByRole('img',{name: /avatar-26/i}).hover();
        //await page.getByRole('link', {name: 'Log Out'}).click();

    }
    async function addUser(page: Page, role: string) {
        await page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin/user-new.php");
        await page.getByRole('textbox', { name: 'Username' }).pressSequentially(user.userName);
        await page.getByRole('textbox', { name: 'Email' }).pressSequentially(user.email);
        await page.getByRole('textbox', { name: 'First Name' }).pressSequentially(user.firstName);
        await page.getByRole('textbox', { name: 'Last Name' }).pressSequentially(user.lastName);
        await page.getByRole('combobox', { name: 'Role' }).selectOption({ label: role });
        await expect(page.getByRole('textbox', { name: 'Password' })).not.toHaveValue('');
        user.password = await page.getByRole('textbox', { name: 'Password' }).inputValue();
        user.role = role;
        await page.getByRole('button', { name: 'Add User' }).click();
    }

    test.beforeEach(async ({ page }) => {
        await login(page, admin.userName, admin.password);
    });
    test.afterEach(async ({ page }) => {
        await login(page, admin.userName, admin.password);
        await page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin/users.php");

        //await page.getByRole('textbox', {name: 'Search'}).fill(user.userName);
        await page.locator("//input[@id='user-search-input']").fill(user.userName);
        await page.getByRole('button', { name: 'Search Users' }).click();
        await page.getByRole('link', { name: user.userName }).hover();
        await page.getByRole('link', { name: 'Delete' }).click();
        if (user.role === "Editor") {
            await page.getByRole('radio', { name: 'Delete all content.' }).click();
            await page.getByRole('button', { name: 'Confirm Deletion' }).click();
        } else if (user.role === "Subscriber") {
            await page.getByRole('button', { name: 'Confirm Deletion' }).click();
        }
        await page.locator("//input[@id='user-search-input']").fill(user.userName);
        await page.getByRole('button', { name: 'Search Users' }).click();
        await expect(page.getByText('No users found.')).toBeVisible();
        page.close();
    });

    test("@ACC_001: Create account with editor permission", async ({ page }) => {
        await test.step("Đi tới màn quản lý user", async () => {
            await page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin/users.php");
            /* Màn hình user hiển thị:
            - Heading "Users" visible
            - Button "Add User" được enable */
            await expect(page.getByRole('heading', { name: 'Users', exact: true })).toBeVisible();
            await expect(page.getByRole('link', { name: 'Add User' }).last()).toBeEnabled();
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
            //await expect(page.locator("//p[contains(normalize-space(),'New user created. ')]")).toBeVisible();
            await expect(page.getByText('New user created. ')).toBeVisible();
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
            await expect(page.getByText('Dashboard').first()).toBeVisible();
            await expect(page.getByText('Posts').first()).toBeVisible();
            await expect(page.getByText('Media').first()).toBeVisible();
            await expect(page.getByText('Pages').first()).toBeVisible();
            await expect(page.getByText('Comments').first()).toBeVisible();
            await expect(page.getByText('Profile').first()).toBeVisible();
            await expect(page.getByText('Tools').first()).toBeVisible();
            /*            
                Không hiển thị các menu:
                - Appearance
                - Uses
                - Plugins
            */
            await expect(page.getByText('Appearance')).not.toBeVisible();
            await expect(page.getByText('Users')).not.toBeVisible();
            await expect(page.getByText('Plugins')).not.toBeVisible();
            await logout(page);
        });
    });

    test("@ACC_002: Create account with subscriber permission", async ({ page }) => {
        await test.step("Đi tới màn quản lý user", async () => {
            await page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin/users.php");
            /* Màn hình user hiển thị:
            - Heading "Users" visible
            - Button "Add User" được enable */
            await expect(page.getByRole('heading', { name: 'Users', exact: true })).toBeVisible();
            await expect(page.getByRole('link', { name: 'Add User' }).last()).toBeEnabled();
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
            await expect(page.getByText('New user created. ')).toBeVisible();

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
            await expect(page.getByText('Dashboard').first()).toBeVisible();
            await expect(page.getByText('Profile').first()).toBeVisible();
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
            await expect(page.getByText('Appearance')).not.toBeVisible();
            await expect(page.getByText('Users')).not.toBeVisible();
            await expect(page.getByText('Plugins')).not.toBeVisible();
            await expect(page.getByText('Posts')).not.toBeVisible();
            await expect(page.getByText('Media')).not.toBeVisible();
            await expect(page.getByText('Pages')).not.toBeVisible();
            await expect(page.getByText('Comments')).not.toBeVisible();
            await expect(page.getByText('Tools')).not.toBeVisible();
            await logout(page);
        });
    });
})