import { test, expect } from "@playwright/test";

test.describe('API Test', () => {
    test('Login with admin', async ({ request }) => {
        const baseURL = 'https://material.playwrightvn.com/api/user-management/v1';
        // Step 1: Đăng nhập vào tài khoản admin. Verify đăng nhập thành công (status
        //code = 200 và có access token trả về).
        const loginResponse = await request.post(`${baseURL}/login.php`, {
            data: {
                "email": "admin@example.com",
                "password": "password"
            }
        });
        const loginResponseJSON = await loginResponse.json();
        const token = loginResponseJSON.data.token;
        expect(loginResponse.status()).toBe(200);
        expect(token).toBeTruthy();
    })

    test('Login with user', async ({ request }) => {
        const baseURL = 'https://material.playwrightvn.com/api/user-management/v1';
        //Step2: Đăng nhập vào tài khoản user. Verify đăng nhập thành công (status
        //code = 200 và có access token trả về).
        const loginResponse = await request.post(`${baseURL}/login.php`, {
            data: {
                "email": "john@example.com",
                "password": "password"
            }
        });

        const loginResponseJSON = await loginResponse.json();
        const token = loginResponseJSON.data.token;
        expect(loginResponse.status()).toBe(200);
        expect(token).toBeTruthy();
    })

    test('Create user success', async ({ request }) => {
        const baseURL = 'https://material.playwrightvn.com/api/user-management/v1';
        // Pre-condition: đã đăng nhập vào tài khoản admin
        const loginResponse = await request.post(`${baseURL}/login.php`, {
            data: {
                "email": "admin@example.com",
                "password": "password"
            }
        });
        const loginResponseJSON = await loginResponse.json();
        const token = loginResponseJSON.data.token;

        //Step 1: Thực hiện tạo user. Verify tạo user thành công (status code = 201 và có
        // thông tin user mới tạo ra được trả về.
        const createUserResponse = await request.post(`${baseURL}/users.php`, {
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
        const userID = createUserResponseJSON.user.id;
        expect(createUserResponseJSON.user.name).toContain("New User NN1");
        expect(createUserResponseJSON.user.email).toContain("newuser_nn1@example.com");

        //Step 2: Thực hiện lấy danh sách user. Kiểm tra user vừa tạo ra nằm trong danh
        //sách user.
        const getUserResponse = await request.get(`${baseURL}/users.php`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }    
        })
        const getUserResponseJSON = await getUserResponse.json();
        const users = getUserResponseJSON.users;
        let existed = false;
        for (let i = 0 ; i < users.length; i++)
            if (users[i].id === userID) {
                existed = true;
            }
        expect(existed).toBe(true)    
        //Post-condition: xoá user đã tạo
        const deleteUserResponse = await request.delete(`${baseURL}/users.php`,{
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data : {
                "id": `${userID}`
            }
        })
        expect(deleteUserResponse.status()).toBe(200);
    })
})
