import {test, expect} from '@playwright/test';

test("Exerise 1", async ({page}) => {

    const admin = {
        userName: "betterbytes.academy.admin",
        password: "StrongPass@BetterBytesAcademy"
    }
    const xpath = {
        userName: "//input[@id='user_login']",
        password: "//input[@id='user_pass']",
        btnLogin: "//input[@id='wp-submit']",
        activity: "//h2[text()='Activity']",
        atAGlance: "//h2[text()='At a Glance']",
        tags: "//a[@href='edit-tags.php?taxonomy=post_tag']",
        tagsTable: "//form[@id='posts-filter']"
    }
    //a.  Bật video recording cho test
    //b. Login tại trang https://pw-practice-dev.playwrightvn.com
    await page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin");
    await page.locator(xpath.userName).fill(admin.userName);
    await page.locator(xpath.password).fill(admin.password);
    await page.locator(xpath.btnLogin).click();
    //c. So sánh ảnh chụp màn hình của dashboard, trong đó
    //i. Mask block Activity và At Glance với màu #7134eb
    await expect(page).toHaveScreenshot({fullPage: true});
    await expect(page).toHaveScreenshot({
        mask: [
            page.locator(xpath.activity),
            page.locator(xpath.atAGlance)
        ],
        maskColor: "#7134eb"
    });
    //d. Đi tới trang Tag. So sánh ảnh chụp màn hình fullPage, che đi danh sách các tag
    await page.locator("//div[text()='Posts']").click();
    await page.locator(xpath.tags).click();
    await expect(page).toHaveScreenshot({fullPage: true});
    await expect(page).toHaveScreenshot({
        mask: [
            page.locator(xpath.tagsTable)
        ],
        maskColor: "#022624"
    });
})

test("Exercise 2", async ({page}) => {
    //a. Truy cập trang: https://material.playwrightvn.com/
    page.goto("https://material.playwrightvn.com/");

    //b. Click vào bài học 5: Bài học 5: Puzzle drag and drop game
    page.locator("//a[@href='05-xpath-drag-and-drop.html']").click();
    //c. Thực hiện Drag n Drop các ô vào các vị trí tương ứng.
    await page.locator("//div[@id='piece-1']").dragTo(page.locator("//div[@data-piece='1']"));
    await page.locator("//div[@id='piece-2']").dragTo(page.locator("//div[@data-piece='2']"));
    await page.locator("//div[@id='piece-3']").dragTo(page.locator("//div[@data-piece='3']"));
    await page.locator("//div[@id='piece-4']").dragTo(page.locator("//div[@data-piece='4']"));
})