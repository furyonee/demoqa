import { APIRequestContext } from '@playwright/test';
import { BaseApi } from '../core/base.api';
import { bookData, IAddBookResponse, IBooksResponse } from '../data/books.data';
import { AuthService } from './auth.service';

export class BooksApi extends BaseApi {
  constructor(
    request: APIRequestContext,
    private authService: AuthService
  ) {
    super(request);
  }

  async addBookToUser(userId: string, isbnParam?: string): Promise<string> {
    const books = await this.getBooks();
    const isbn = isbnParam ?? books.books[0].isbn;
    const response = await this.post<IAddBookResponse>(
      'BookStore/v1/Books',
      bookData(userId, isbn),
      await this.authService.getAuthHeaders()
    );

    return response.books[0].isbn;
  }

  async deleteBook(userId: string, isbn: string): Promise<void> {
    await this.delete('BookStore/v1/Book', await this.authService.getAuthHeaders(), { userId, isbn });
  }

  private async getBooks(): Promise<IBooksResponse> {
    return this.get('BookStore/v1/Books');
  }
}
