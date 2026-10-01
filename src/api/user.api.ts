import { BaseApi } from '../core/base.api';
import { CREDENTIALS } from '../config/config';
import { IUserData, IUserResponseData } from '../data/user.data';
import { AuthService } from './auth.service';
import { APIRequestContext } from '@playwright/test';

export class UserApi extends BaseApi {
  constructor(
    request: APIRequestContext,
    private authService: AuthService
  ) {
    super(request);
  }

  async create(): Promise<IUserResponseData> {
    return this.post('Account/v1/User', CREDENTIALS);
  }

  async deleteUser(userId: string): Promise<void> {
    await this.delete(`Account/v1/User/${userId}`, await this.authService.getAuthHeaders());
  }

  async getUserData(userId: string): Promise<IUserData> {
    return this.get(`Account/v1/User/${userId}`, await this.authService.getAuthHeaders());
  }
}
