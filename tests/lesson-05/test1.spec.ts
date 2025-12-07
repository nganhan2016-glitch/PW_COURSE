import { test } from "@playwright/test";


/* Truy cập trang https://material.playwrightvn.com/, click vào “Bài học 1: Register Page”
a. Nhập đầy đủ các thông tin, click button register */

test("Register Page", async ({ page }) => {
    await test.step("Truy cập trang Register page từ https://material.playwrightvn.com/", async () => {
        await page.goto("https://material.playwrightvn.com/01-xpath-register-page.html");
    })
    await test.step("Nhập đầy đủ các thông tin", async () => {
        await page.locator("//input[@id='username']").fill("nganhan_pw20");
        await page.locator("//input[@id='email']").pressSequentially("nganhan_pw20@gmail.com");
        /* tại sao co kiểm tra rồi check thi khi chạy lai ko chọn dc female? 
        let isChecked = page.locator("//input[@id='female']").isChecked();
        if (!isChecked) {
            await page.locator("//input[@id='female']").check();
        }*/
        await page.locator("//input[@id='female']").check();
        await page.locator("//input[@id='traveling']").check();
        await page.locator("//select[@id='interests']").selectOption(['technology', 'art', 'sports']);
        await page.locator("//select[@id='country']").selectOption({ label: 'Canada' });
        await page.locator("//input[@id='dob']").fill('2000-01-22');
        await page.locator("//input[@id='profile']").setInputFiles("tests/lesson-5/image1.png");
        await page.locator("//textarea[@id='bio']").pressSequentially("Biography text area");
        await page.locator("//input[@id='rating']").fill("9");
        await page.locator("//input[@id='favcolor']").fill("#00fbff");
        await page.locator("//input[@id='newsletter']").check();
        //await page.locator("//input[@id='toggleOption']").check();
        await page.locator("//label[@class='switch']/span[@class='slider round']").check();
        //await page.locator("//span[@id='starRatingValue']").selectOption({ label: '4'});
        //await page.locator("//input[@id='customDate']").fill('2025-12-07');

    })
    await test.step("click button register", async () => {
       await page.locator("//button[@type='submit']").click();
    })
}
)