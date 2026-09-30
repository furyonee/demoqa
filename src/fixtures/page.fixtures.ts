import { ElementsPage } from "../pages/elements.page";
import { MainPage } from "../pages/main.page";
import { test as base } from "@playwright/test";

interface PageFixtures {
  mainPage: MainPage;
  elementsPage: ElementsPage;
}

export const pageFixtures = base.extend<PageFixtures>({
  mainPage: async ({ page }, use) => {
    await use(new MainPage(page));
  },
  elementsPage: async ({ page }, use) => {
    await use(new ElementsPage(page));
  },
});
