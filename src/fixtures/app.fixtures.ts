import { mergeTests } from '@playwright/test';
import { pageFixtures } from './page.fixtures';
import { apiFixtures } from './api.fixtures';

export const test = mergeTests(pageFixtures, apiFixtures);

export { expect } from '@playwright/test';
