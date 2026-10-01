import { expect, test } from '../../src/fixtures/app.fixtures';

let userId: string;

test.beforeEach(async ({ userApi }) => {
  ({ userID: userId } = await userApi.create());
});

test.afterEach(async ({ userApi }) => {
  await userApi.deleteUser(userId);
});

test('Should add Book to User', async ({ booksApi, userApi }) => {
  const isbn = await booksApi.addBookToUser(userId);
  const userBooks = await userApi.getUserData(userId);

  expect(userBooks.books).toContainEqual(expect.objectContaining({ isbn }));
});

test('Should not add Book that is not available in Book Store', async ({ booksApi }) => {
  await expect(booksApi.addBookToUser(userId, '0000000000000')).rejects.toThrow(
    'ISBN supplied is not available in Books Collection!'
  );
});

test('Should delete Book from User', async ({ booksApi, userApi }) => {
  const isbn = await booksApi.addBookToUser(userId);
  await booksApi.deleteBook(userId, isbn);
  const userBooks = await userApi.getUserData(userId);
  
  expect(userBooks.books).not.toContainEqual(expect.objectContaining({ isbn }));
});

test('Should not delete Book that is not in User collection', async ({ booksApi }) => {
  const isbn = await booksApi.addBookToUser(userId);
  await booksApi.deleteBook(userId, isbn);

  await expect(booksApi.deleteBook(userId, isbn)).rejects.toThrow(
    "ISBN supplied is not available in User's Collection!"
  );
});
