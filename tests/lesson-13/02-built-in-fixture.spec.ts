import { test, expect } from '@playwright/test';

test.describe("Playwright selector demo tests", async () => {
    test('Get by role', async ({ context }) => {
       const tab1 = await context.newPage();
       const tab2 = await context.newPage();

       await tab1.goto("https://google.com");
       await tab2.goto("https://youtube.com");
       console.log("hello");
    });

})

  test('Using  browser fixture - new browser', async ({ browser }) => {
        const context1 = await browser.newContext();
        const page1 = await context1.newPage();
        await page1.goto("https://google.com");

        const context2 = await browser.newContext();
        const page2 = await context2.newPage();
        await page2.goto("https://youtube.com");
        
        console.log("hello");
    });

test('Using  browser fixture - browserName', async ({ browserName }) => {
        // conditional skip
        test.skip(browserName === 'firefox' || browserName === 'webkit');
    });