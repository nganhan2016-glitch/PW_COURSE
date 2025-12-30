import { test, expect } from "@playwright/test";
import { RegisterPage } from "./page/01-pom.ts";

test.describe("Register Page", () => {
    test("Register Page", async (page) => {
        const registerPage = new RegisterPage(page);
        registerPage.openMaterialPage();
        registerPage.goToPage(registerPage.xpathRegisterPage);
        registerPage.fillUsername("nn001");
        registerPage.fillEmail("nn001@company.com");
        registerPage.clickBtnRegister();

    })
})