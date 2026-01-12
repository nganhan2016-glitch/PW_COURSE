import { test } from './material.fixture';

test.describe("Register page test", async () => {

    test("Test 01: Them moi 1 san pham thanh cong", async ({ materialPage }) => {
        await materialPage.selectLesson("Bài học 1: Register Page (có đủ các element)");
        await materialPage.page.getByLabel("Username").fill("minhphong");
        await materialPage.page.getByLabel("Email").fill("minhphong@gmail.com");
    });
});