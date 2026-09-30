import { APIRequestContext, APIResponse } from '@playwright/test';
import { BASE_URL } from '../config/config';

type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

type BaseRequestParams = {
  method: HttpMethod;
  path: string;
  data?: unknown;
  headers?: Record<string, string>;
};

export abstract class BaseApi {
  constructor(protected request: APIRequestContext) {}

  get(path: string, headers: any) {
    return this.baseRequest({ method: 'get', path, headers });
  }

  post<TData>(path: string, data: TData) {
    return this.baseRequest({ method: 'post', path, data });
  }

  delete(path: string, headers: any) {
    return this.baseRequest({ method: 'delete', path, headers });
  }

  private async baseRequest({ method, path, data, headers }: BaseRequestParams) {
    const url = `${BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
    const response = await this.request[method](url, {
      ...(data !== undefined ? { data } : {}),
      ...(headers ? { headers } : {})
    });
    if (!response.ok()) {
      throw new Error(
        `${method.toUpperCase()} ${url} failed:
        ${response.status()} ${response.statusText()}\n
        ${await response.text()}`
      );
    }
    if (response.status() === 204) {
      return;
    }
    const body = await response.json();

    return body.data ?? body;
  }
}
