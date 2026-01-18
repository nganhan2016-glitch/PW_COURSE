import { test, expect } from '@playwright/test';

test('example test', async ({ page }) => {
  await page.goto('https://playwright.dev');
  await expect(page).toHaveScreenshot();
});

test('example test with mask', async ({ page }) => {
    await page.goto('https://material.playwrightvn.com/');
    await expect(page).toHaveScreenshot({
        mask: [
            page.locator("#ads-here"),
            page.locator("h1")
        ],
        maskColor: "#850ae9"
    });
});


test('example test with locator', async ({ page }) => {
    await page.goto('https://material.playwrightvn.com/');
    const tableLoc = page.locator("#section-xpath")
    await expect(tableLoc.first()).toHaveScreenshot('nganhan.png');
});

test('example test with locator1', async ({ page }) => {
    await page.goto('https://material.playwrightvn.com/');
    await page.getByText("Bài học 2: Product page").click();
    await page.waitForTimeout(2_000);
    await page.locator("//button[@data-product-id='1']").click({ clickCount: 5});

    await expect(page.locator("//td[@class='total-price']")).toHaveText("$50.00");
});