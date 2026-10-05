import { test as base } from '@playwright/test';
import { MainPage } from '../pages/main.page';
import { ElementsPage } from '../pages/elements.page';
import { WebTablesPage } from '../pages/web-tables.page';

interface PageFixtures {
  mainPage: MainPage;
  elementsPage: ElementsPage;
  webTablesPage: WebTablesPage;
}

export const pageFixtures = base.extend<PageFixtures>({
  mainPage: async ({ page }, use) => {
    await use(new MainPage(page));
  },
  elementsPage: async ({ page }, use) => {
    await use(new ElementsPage(page));
  },
  webTablesPage: async ({ page }, use) => {
    await use(new WebTablesPage(page));
  }
});
