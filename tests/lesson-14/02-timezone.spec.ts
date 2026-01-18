import { test, expect } from '@playwright/test';

test('example test with locator1', async ({ page }) => {
    await page.goto('https://material.playwrightvn.com/017-detect-user-agent.html');
   /* await page.getByText("Bài học 2: Product page").click();
    await page.waitForTimeout(2_000);
    await page.locator("//button[@data-product-id='1']").click({ clickCount: 5});

    await expect(page.locator("//td[@class='total-price']")).toHaveText("$50.00");*/
});