import { expect, test } from '../../src/fixtures/app.fixtures';

let userId: string, username: string;

test.afterEach(async ({ userApi }) => {
  await userApi.deleteUser(userId);
});

test('Should create User', async ({ userApi }) => {
  ({ userID: userId, username } = await userApi.create());
  const response = await userApi.getUserData(userId);

  expect(response.userId, 'Created user ID should match the requested user ID').toBe(userId);
  expect(response.username, 'Created username should match the requested username').toBe(username);
});

test('Should throw 406 when create User with existing username', async ({ userApi }) => {
  ({ userID: userId } = await userApi.create());

  await expect(
    userApi.create(),
    'Creating a user with an existing username should fail'
  ).rejects.toThrow('406 Not Acceptable');
});
