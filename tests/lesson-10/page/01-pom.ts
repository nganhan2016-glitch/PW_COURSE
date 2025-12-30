import { Page } from '@playwright/test';
import {Locator} from '@playwright/test';


class MaterialBasePage {
    page: Page;
    xpathRegisterPage: string = "//a[@href='01-xpath-register-page.html']";
    xpathProductPage: string = "//a[@href='02-xpath-product-page.html']";
    cssTodoPage: string = "";
    personalNote: Locator;

    constructor (page: Page) {
        this.page = page;
    }

    openMaterialPage () {
        this.page.goto("https://material.playwrightvn.com/");
    }

    goToPage (pageName: string) {
        this.page.locator(pageName).click();
    }

}

export class RegisterPage extends MaterialBasePage {
    xpathUsername: string = "//input[@id='username']";
    xpathEmail: string = "//input[@id='email']";
    xpathGenderMale: string = "//input[@id='male']";
    xpathGenderFemale: string = "//input[@id='female']";
    xpathBtnRegister: string = "//button[@type='submit']";



    fillUsername (userName: string) {
        this.page.locator(this.xpathUsername).fill(userName);
    }

    fillEmail (email: string) {
        this.page.locator(this.xpathEmail).fill(email);
    }

    checkGender (gender: string) {

    }
    clickBtnRegister () {
        this.page.locator(this.xpathBtnRegister).click();
    }
}