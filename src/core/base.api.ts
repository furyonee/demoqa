import { APIRequestContext } from '@playwright/test';

type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

type BaseRequestParams = {
  method: HttpMethod;
  path: string;
  data?: unknown;
  headers?: Record<string, string>;
};

export abstract class BaseApi {
  constructor(protected request: APIRequestContext) {}

  get<TResponse>(path: string, headers?: Record<string, string>): Promise<TResponse> {
    return this.baseRequest({ method: 'get', path, headers });
  }

  post<TResponse>(path: string, data: unknown, headers?: Record<string, string>): Promise<TResponse> {
    return this.baseRequest({ method: 'post', path, data, headers });
  }

  delete<TResponse>(path: string, headers?: Record<string, string>, data?: unknown): Promise<TResponse> {
    return this.baseRequest({ method: 'delete', path, headers, data });
  }

  private async baseRequest<TResponse>({ method, path, data, headers }: BaseRequestParams): Promise<TResponse> {
    const response = await this.request[method](path, {
      ...(data !== undefined ? { data } : {}),
      ...(headers ? { headers } : {})
    });
    if (!response.ok()) {
      throw new Error(
        `${method.toUpperCase()} ${path} failed:
        ${response.status()} ${response.statusText()}\n
        ${await response.text()}`
      );
    }
    if (response.status() === 204) {
      return undefined as TResponse;
    }
    const body = await response.json();

    return body as TResponse;
  }
}
