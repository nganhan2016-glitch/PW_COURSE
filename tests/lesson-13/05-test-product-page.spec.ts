import {test} from './material.fixture';

test("Test 02: Them moi 2 san pham thanh cong", async ({ materialPage }) => {
    await materialPage.selectLesson("Bài học 1: Register Page (có đủ các element)");    
    await materialPage.page.getByLabel("Username").fill("minhphong");
        await materialPage.page.getByLabel("Email").fill("minhphong-wrongemail");
    });

    
