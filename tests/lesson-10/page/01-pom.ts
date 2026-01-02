import { Page, Locator } from '@playwright/test';

class MaterialBasePage {
    page: Page;
    xpathRegisterPage = "//a[@href='01-xpath-register-page.html']";
    xpathProductPage = "//a[@href='02-xpath-product-page.html']";
    cssTodoPage = "";
    personalNote = "";

    constructor (page: Page) {
        this.page = page;
    }

    async openMaterialPage () {
        await this.page.goto("https://material.playwrightvn.com/");
    }

    async goToPage (pageName: string) {
        await this.page.locator(pageName).click();
    }

}

export class RegisterPage extends MaterialBasePage {
    xpathUsername = "//input[@id='username']";
    xpathEmail = "//input[@id='email']";
    xpathGenderMale = "//input[@id='male']";
    xpathGenderFemale = "//input[@id='female']";
    xpathTraveling = "//input[@id='traveling']";
    xpathReading = "//input[@id='reading']";
    xpathCooking = "//input[@id='cooking']";
    xpathInterests = "//select[@id='interests']";
    xpathCountry = "//select[@id='country']";
    xpathDOB = "//input[@id='dob']";
    xpathProfile = "//input[@id='profile']";
    xpathBio = "//textarea[@id='bio']";
    xpathRating = "//input[@id='rating']";
    xpathFavColor = "//input[@id='favcolor']";
    xpathNewsletter = "//input[@id='newsletter']";
    xpathBtnRegister = "//button[@type='submit']";

    constructor (page: Page) {
        super (page);
    }

    async fillUsername (userName: string) {
        await this.page.locator(this.xpathUsername).fill(userName);
    }

    async fillEmail (email: string) {
        await this.page.locator(this.xpathEmail).fill(email);
    }

    async checkGender (gender: string) {
        if (gender == 'male'){
            await this.page.locator(this.xpathGenderMale).check();
        } else if (gender == 'female'){
            await this.page.locator(this.xpathGenderFemale).check();
        }
    }

    async selectHobbies (hobby: string) {
        if (hobby == 'traveling') {
            await this.page.locator(this.xpathTraveling).check();
        } else if (hobby == 'reading') {
            await this.page.locator(this.xpathReading).check();
        } else if (hobby == 'cooking') {
            await this.page.locator(this.xpathCooking).check();
        }      
    }

    async selectInterests  (interests: string[]) {
        await this.page.locator(this.xpathInterests).selectOption(interests);
    }

    async selectCountry (country: string) {
        await this.page.locator(this.xpathCountry).selectOption(country);
    }

    async fillDOB (dob: string) {
        await this.page.locator(this.xpathDOB).fill(dob);
    }

    async selectProfile (profile: string) {
        await this.page.locator(this.xpathProfile).setInputFiles(profile);
    }

    async fillBio (bio: string) {
        await this.page.locator(this.xpathBio).fill(bio);
    }

    async fillRating (rating: string) {
        await this.page.locator(this.xpathRating).fill(rating);
    }

    async fillFavColor (favColor: string) {
        await this.page.locator(this.xpathFavColor).fill(favColor);
    }

    async checkNewsletter (newsletter: boolean) {
        if (newsletter) {
            await this.page.locator(this.xpathNewsletter).check();
        }
    }
    async clickBtnRegister () {
        await this.page.locator(this.xpathBtnRegister).click();
    }
}

export class ProductPage extends MaterialBasePage {

    xpathProduct1 = "//button[@data-product-id='1']";
    xpathProduct2 = "//button[@data-product-id='2']";
    xpathProduct3 = "//button[@data-product-id='3']";

    constructor (page: Page) {
        super (page);
    }

    async addProductToCart (productId: string, quantity: number){
        if (productId == "product1") {
            await this.page.locator(this.xpathProduct1).click({clickCount: quantity})
        } else if (productId == "product2") {
            await this.page.locator(this.xpathProduct2).click({clickCount: quantity});
        } else if (productId == "product3") {
            await this.page.locator(this.xpathProduct3).click({clickCount: quantity});
        }            
    }

}