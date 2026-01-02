import { test, expect} from "@playwright/test";
import { ProductPage } from "./page/01-pom.ts";

test.describe("Exercise 2: Product Page", () => {
    test("Product Page", async ({page}) => {
        const productPage = new ProductPage(page);

        // Navigate and click Product Page
        await productPage.openMaterialPage();
        await productPage.goToPage(productPage.xpathProductPage);

        // Add product to Cart
        await productPage.addProductToCart("product1", 2);
        await productPage.addProductToCart("product2", 3);
        await productPage.addProductToCart("product3", 1);

        //Verify the quantity as input
        await expect(page.locator("//tr[td[1][contains(.,'Product 1')]]/td[3]")).toHaveText("2");
        await expect(page.locator("//tr[td[1][contains(.,'Product 2')]]/td[3]")).toHaveText("3");
        await expect(page.locator("//tr[td[1][contains(.,'Product 3')]]/td[3]")).toHaveText("1");
        
        //Verify totalAmount
        const addedProducts = [
            { productId: "1", price: 10, quantity: 2 },
            { productId: "2", price: 20, quantity: 3 },
            { productId: "3", price: 30, quantity: 1 }
        ];

        let totalPrice = 0;
        for (let i = 0; i < addedProducts.length; i++) {
            totalPrice += addedProducts[i].price * addedProducts[i].quantity; 
        }

        await expect(page.locator("//td[contains(@class, 'total-price')]")).toContainText(totalPrice.toString());
        await page.close();
    })
})