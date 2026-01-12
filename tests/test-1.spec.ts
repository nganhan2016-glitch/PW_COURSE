import { test, expect } from '@playwright/test';

test('test01', async ({ page }) => {
  await page.goto('https://material.playwrightvn.com/');
  await page.getByRole('link', { name: 'Bài học 2: Product page' }).click();
  await expect(page.getByRole('heading', { name: 'Simple E-commerce' })).toBeVisible();
  await page.getByRole('button', { name: 'Add to Cart' }).nth(1).click();
  await page.getByRole('button', { name: 'Add to Cart' }).nth(2).click();
  await page.getByRole('button', { name: 'Add to Cart' }).nth(2).click();
  await expect(page.getByRole('cell', { name: '$80.00' })).toBeVisible();
});