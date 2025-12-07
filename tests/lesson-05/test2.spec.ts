import { test } from "@playwright/test";
/* Truy cập trang https://material.playwrightvn.com/, click vào “Bài
học 2: Product page”, hãy thêm sản phẩm để giỏ hàng có số lượng sản phẩm như sau:
a. Sản phẩm 1: 2 sản phẩm
b. Sản phẩm 2: 3 sản phẩm
c. Sản phẩm 3: 1 sản phẩm */

test("Product Page", async ({ page }) => {
    await test.step("Truy cập https://material.playwrightvn.com/, click vào “Bài học 2: Product page ", async () => {
        await page.goto("https://material.playwrightvn.com/");
        await page.locator("//a[@href='02-xpath-product-page.html']").click();
    })
    await test.step("Thêm sản phẩm vào giỏ hàng", async () => {
        //Sản phẩm 1: 2 sản phẩm
        await page.locator("//button[@data-product-id='1']").click({ clickCount: 2 });
        //Sản phẩm 2: 3 sản phẩm
        await page.locator("//button[@data-product-id='2']").click({ clickCount: 3 });
        //Sản phẩm 3: 1 sản phẩm
        await page.locator("//button[@data-product-id='3']").click();
    })
})
