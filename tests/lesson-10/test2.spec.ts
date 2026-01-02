import { test, expect} from "@playwright/test";
import { ProductPage } from "./page/01-pom.ts";

test.describe("Exercise 2: Product Page", () => {
    test("Product Page", async ({page}) => {
        const productPage = new ProductPage(page);

        // Navigate and click Product Page
        productPage.openMaterialPage();
        productPage.goToPage(productPage.xpathProductPage);

        // Add product to Cart
        productPage.addProductToCart("1", 2);
        productPage.addProductToCart("2", 3);
        productPage.addProductToCart("3", 1);

        //Verify the quantity as input
        await expect(page.locator("//tr[td[1][contains(.,'Product 1')]]/td[3]")).toHaveValue("2");
        await expect(page.locator("//tr[td[1][contains(.,'Product 2')]]/td[3]")).toHaveValue("3");
        await expect(page.locator("//tr[td[1][contains(.,'Product 3')]]/td[3]")).toHaveValue("1");
        //Verify totalAmount

    })
})