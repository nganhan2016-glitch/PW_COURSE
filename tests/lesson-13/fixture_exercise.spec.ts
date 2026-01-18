import { test, expect } from '@playwright/test';

test("Fixture context", async ({ context }) => {
       const tab1 = await context.newPage();
       const tab2 = await context.newPage();

       await tab1.goto("https://material.playwrightvn.com/");
       await tab2.goto("https://e-commerce-dev.betterbytesvn.com/");
});

test('Fixture browser', async ({ browser }) => {
        const context1 = await browser.newContext();
        const page1 = await context1.newPage();
        await page1.goto("https://material.playwrightvn.com/");

        const context2 = await browser.newContext();
        const page2 = await context2.newPage();
        await page2.goto("https://e-commerce-dev.betterbytesvn.com/");
        
    });