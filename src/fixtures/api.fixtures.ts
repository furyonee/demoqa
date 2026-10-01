import { BooksApi } from '../api/books.api';
import { AuthService } from '../api/auth.service';
import { UserApi } from '../api/user.api';
import { test as base } from '@playwright/test';

interface ApiFixtures {
  authService: AuthService;
  userApi: UserApi;
  booksApi: BooksApi;
}

export const apiFixtures = base.extend<ApiFixtures>({
  authService: async ({ request }, use) => {
    await use(new AuthService(request));
  },
  userApi: async ({ request, authService }, use) => {
    await use(new UserApi(request, authService));
  },
  booksApi: async ({ request, authService }, use) => {
    await use(new BooksApi(request, authService));
  }
});
