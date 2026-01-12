import { test as base } from '@playwright/test'
import { MaterialPage } from './03-material.page';

const test = base.extend<{ materialPage: MaterialPage }>({
  materialPage: async ({ page }, use) => {
    const materialPage = new MaterialPage(page);
    await materialPage.goto();

    await use(materialPage);

  }
})

export { test };