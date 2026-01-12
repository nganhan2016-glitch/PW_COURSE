import { test, expect } from "@playwright/test";

test.describe("Test 1: Login success", () => {
    const baseURL = 'https://material.playwrightvn.com/api/user-management/v1';
    test("Login success", async ({ request }) => {
        const loginURL = `${baseURL}/login.php`;
        await test.step("Login with admin", async () => {
            const loginResponse = await request.post(loginURL, {
                data: {
                    "email": "admin@example.com",
                    "password": "password"
                }
            }
            )
            const loginResponseJSON = await loginResponse.json();
            const token = loginResponseJSON.data.token;
            expect(loginResponse.status()).toBe(200);
            expect(token).toBeTruthy();
        })
        await test.step("Login with user", async () => {
            const loginResponse = await request.post(loginURL, {
                data: {
                    "email": "john@example.com",
                    "password": "password"
                }
            }
            )
            const loginResponseJSON = await loginResponse.json();
            const token = loginResponseJSON.data.token;
            expect(loginResponse.status()).toBe(200);
            expect(token).toBeTruthy();
        })
    })
})
    test.describe("Test 2: create user success", () => {
        const baseURL = 'https://material.playwrightvn.com/api/user-management/v1';
        const loginURL = `${baseURL}/login.php`;
        const userURL = `${baseURL}/users.php`;
        let token = "";
        let userID = "";
        test.beforeAll("Pre-condition: đã đăng nhập vào tài khoản admin", async ({ request }) => {
            const loginResponse = await request.post(loginURL, {
                data: {
                    "email": "admin@example.com",
                    "password": "password"
                }
            });
            const loginResponseJSON = await loginResponse.json();
            token = loginResponseJSON.data.token;
        });
        test.afterAll("Post-condition: xoa user da tao", async ({ request }) => {
            const deleteUserResponse = await request.delete(userURL, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: {
                "id": `${userID}`
            }
            })
            expect(deleteUserResponse.status()).toBe(200);
        });
        test("Create user success", async ({ request }) => {
            await test.step("Thực hiện tạo user.", async () => {
                const createUserResponse = await request.post(userURL, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    data: {
                        "name": "New User NN1",
                        "email": "newuser_nn1@example.com",
                        "password": "password",
                        "facebook": "https://facebook.com/newuser",
                        "avatar": "https://i.pravatar.cc/150?img=20",
                        "hobbies": "Reading, Coding",
                        "role": "user"
                    }
                })
                expect(createUserResponse.status()).toBe(201);
                const createUserResponseJSON = await createUserResponse.json();
                console.log(createUserResponseJSON);
                userID = createUserResponseJSON.user.id;
                expect(createUserResponseJSON.user.name).toContain("New User NN1");
                expect(createUserResponseJSON.user.email).toContain("newuser_nn1@example.com");
            }); // Step 1

            await test.step("Thực hiện lấy danh sách user.", async () => {
                const getUserResponse = await request.get(userURL, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
                })
                const getUserResponseJSON = await getUserResponse.json();
                const users = getUserResponseJSON.users;
                let existed = false;
                for (let i = 0; i < users.length; i++)
                    if (users[i].id === userID) {
                        existed = true;
                    }
                expect(existed).toBe(true);
            }); // Step 2
        })
    })