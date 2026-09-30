import { expect, test } from '../../src/fixtures/app.fixtures';

let userId: string, username: string, token: string;

test.beforeEach(async ({ userApi }) => {
  ({ userID: userId, username } = await userApi.create());
  ({ token } = await userApi.getToken());
});

test.afterEach(async ({ userApi }) => {
  await userApi.deleteUser(userId, token);
});

test('Should create User', async ({ userApi }) => {
  const res = await userApi.getUser(userId, token);

  expect(res.userId).toBe(userId);
  expect(res.username).toBe(username);
});
