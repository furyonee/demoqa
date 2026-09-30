import { UserApi } from '../api/user.api';
import { test as base } from '@playwright/test';

interface ApiFixtures {
  userApi: UserApi;
}

export const apiFixtures = base.extend<ApiFixtures>({
  userApi: async ({ request }, use) => {
    await use(new UserApi(request));
  }
});
