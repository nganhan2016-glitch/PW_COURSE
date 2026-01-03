import { test, expect } from "@playwright/test";
import { RegisterPage } from "./page/01-pom.ts";

test.describe("Exercise 1: Register Page", () => {
    test("Register Page", async ({ page }) => {

        const registerPage = new RegisterPage(page);
        //Navigate and click RegisterPage
        await registerPage.openMaterialPage();
        await registerPage.goToPage(registerPage.xpathRegisterPage);
        // Input all information and click Register button
        await registerPage.fillUsername("nn001");
        await registerPage.fillEmail("nn001@company.com");
        await registerPage.checkGender("female");
        await registerPage.selectHobbies("cooking");
        await registerPage.selectInterests(['technology', 'art', 'sports']);
        await registerPage.selectCountry("Canada");
        await registerPage.fillDOB("2000-01-22");
        await registerPage.selectProfile("tests/lesson-10/image1.png");
        await registerPage.fillBio("NN Biography");
        await registerPage.fillRating("8");
        await registerPage.fillFavColor("#00fbff");
        await registerPage.checkNewsletter(true);

        await registerPage.clickBtnRegister();

        // Verify all input information
        await expect(page.locator("//table[@id='userTable']//tbody//tr[last()]/td[2]")).toContainText("nn001");
        await expect(page.locator("//table[@id='userTable']//tbody//tr[last()]/td[3]")).toContainText("nn001@company.com");

        await expect(page.locator("//table[@id='userTable']//tbody//tr[last()]/td[4]")).toContainText("female");
        await expect(page.locator("//table[@id='userTable']//tbody//tr[last()]/td[4]")).toContainText("cooking");
        await expect(page.locator("//table[@id='userTable']//tbody//tr[last()]/td[4]")).toContainText("canada");
        await expect(page.locator("//table[@id='userTable']//tbody//tr[last()]/td[4]")).toContainText("2000-01-22");
        await expect(page.locator("//table[@id='userTable']//tbody//tr[last()]/td[4]")).toContainText("NN Biography");
        await expect(page.locator("//table[@id='userTable']//tbody//tr[last()]/td[4]")).toContainText("8");
        await expect(page.locator("//table[@id='userTable']//tbody//tr[last()]/td[4]")).toContainText("#00fbff");
        await expect(page.locator("//table[@id='userTable']//tbody//tr[last()]/td[4]")).toContainText("Yes");

        await page.close();
    })
})


