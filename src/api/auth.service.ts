import { CREDENTIALS } from '../config/config';
import { BaseApi } from '../core/base.api';

export class AuthService extends BaseApi {
  private token?: string;

  async getAuthHeaders(): Promise<Record<string, string>> {
    if (!this.token) {
      const response = await this.post<{ token: string }>('Account/v1/GenerateToken', CREDENTIALS);
      this.token = response.token;
    }

    return { Authorization: `Bearer ${this.token}` };
  }
}
