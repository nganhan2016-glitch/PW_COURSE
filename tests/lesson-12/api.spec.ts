import { test, expect } from '@playwright/test';
import { AuthenticationApiPage, UserApiPage } from './pom.api.ts';


test.describe("Test 1: Login success", () => {
    test("Login success", async ({ request }) => {
        let loginApiPage: AuthenticationApiPage;
        loginApiPage = new AuthenticationApiPage(request);

        await test.step("Login with admin", async () => {
            const response = await loginApiPage.login("admin@example.com", "password");
            //console.log(response);
            expect(response).toBeTruthy();
            expect(response.success).toEqual(true);
            expect(response.data.token).toBeTruthy();
        })
        await test.step("Login with user", async () => {
            const response = await loginApiPage.login("john@example.com", "password");
            //console.log(response);
            expect(response).toBeTruthy();
            expect(response.success).toEqual(true);
            expect(response.data.token).toBeTruthy();
        })
    })
})

test.describe("Test 2: create user success", () => {
    let token = ""
    let userId = "";
    test.beforeEach("Pre-condition: đã đăng nhập vào tài khoản admin", async ({ request }) => {
        let loginApiPage = new AuthenticationApiPage(request);
        const response = await loginApiPage.login("admin@example.com", "password");
        token = response.data.token;
    });
    test.afterEach("Post-condition: xoa user da tao", async ({ request }) => {
        let userApiPage = new UserApiPage(request, token);
        await userApiPage.deleteUser(userId);
    });
    test("Create user success", async ({ request }) => {
        await test.step("Thực hiện tạo user.", async () => {
            let userApiPage = new UserApiPage(request, token);
            const response = await userApiPage.addUser("New User NN2", "newuser_nn2@example.com", "password", "https://facebook.com/newuser", "https://i.pravatar.cc/150?img=20", "Reading, Coding", "user");
            console.log(response);
            userId = response.user.id;
            expect(response).toBeTruthy()
            expect(response.success).toEqual(true);
            expect(response.user.name).toContain("New User NN2");
            expect(response.user.email).toContain("newuser_nn2@example.com");
        }); // Step 1

        await test.step("Thực hiện lấy danh sách user.", async () => {
            let userApiPage = new UserApiPage(request,token);
            const response = await userApiPage.getUsers();
            console.log(response);
            const users = response.users;
            let existed = false;
            for (let i = 0; i < response.users.length; i++)
                if (response.users[i].id === userId) {
                    existed = true;                     
                    break;  
                }
            expect(existed).toBe(true);
        }); // Step 2
    })
})