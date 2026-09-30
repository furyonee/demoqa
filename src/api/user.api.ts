import { BaseApi } from '../core/base.api';
import { CREDENTIALS } from '../config/config';
import { IUserResponseData } from '../data/user.data';

export class UserApi extends BaseApi {
  async create(): Promise<IUserResponseData> {
    return await this.post('Account/v1/User', CREDENTIALS);
  }

  async getToken(): Promise<{ token: string }> {
    return await this.post('Account/v1/GenerateToken', CREDENTIALS);
  }

  async deleteUser(userId: string, token: string) {
    return await this.delete(`Account/v1/User/${userId}`, {
      Authorization: `Bearer ${token}`
    });
  }

  async getUser(userId: string, token: string) {
    return await this.get(`Account/v1/User/${userId}`, {
      Authorization: `Bearer ${token}`
    });
  }
}
