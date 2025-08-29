import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { REFRESH_TOKEN_COOKIE_NAME, SESSION_COOKIE_NAME } from '../constants';
import { getCookieIsomorphic } from '../tanstack-start/getCookieIsomorphic';
import { getTokenObject } from '../utils/getTokenObject';

export interface ApiServiceConfig {
  baseURL?: string;
  options?: AxiosRequestConfig;
  tokenName?: string;
}

export class ApiService {
  private axiosInstance: AxiosInstance;
  private tokenName: string;
  private defaultBaseURL: string;
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (value: unknown) => void;
    reject: (reason?: any) => void;
    config: AxiosRequestConfig;
  }> = [];

  constructor(config: ApiServiceConfig = {}) {
    this.defaultBaseURL = config.baseURL || 'http://localhost:3000';
    const options = config.options || {};
    this.tokenName = config.tokenName || '';

    this.axiosInstance = axios.create({
      baseURL: this.defaultBaseURL,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    this.axiosInstance.interceptors.request.use(
      (config) => {
        // console.log(config.headers.Authorization, 'config.headers.Authorization');

        if (!config.headers.Authorization) {
          const token = this.getAuthToken();
          // console.log(token, 'token');

          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error),
    );
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && originalRequest && !originalRequest.headers['X-Retry-With-Refresh-Token']) {
          if (this.isRefreshing) {
            return new Promise((resolve, reject) => {
              this.failedQueue.push({
                resolve,
                reject,
                config: originalRequest,
              });
            });
          }

          this.isRefreshing = true;
          originalRequest.headers['X-Retry-With-Refresh-Token'] = 'true';

          try {
            const refreshToken = Cookies.get(REFRESH_TOKEN_COOKIE_NAME);

            // if (!refreshToken) {
            //   this.handleLogout();
            //   return Promise.reject(error);
            // }
            const parsed = JSON.parse(decodeURIComponent(refreshToken!)) as {
              refreshToken: string;
              userName: string;
            };

            await this.postRefreshToken({ userName: parsed.userName, refreshToken: parsed.refreshToken });

            const token = this.getAuthToken();
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              delete originalRequest.headers['X-Retry-With-Refresh-Token'];
            }

            this.processQueue(null, error);

            return this.axiosInstance(originalRequest);
          } catch (refreshError) {
            this.processQueue(refreshError, null);

            // this.handleLogout();
            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        return Promise.reject(error);
      },
    );
  }
  private handleLogout() {
    Cookies.remove(SESSION_COOKIE_NAME, { path: '/' });
    Cookies.remove(REFRESH_TOKEN_COOKIE_NAME, { path: '/' });
    window.location.reload();
  }
  private processQueue(error: any, originalError: any) {
    const queueToProcess = [...this.failedQueue];
    this.failedQueue = [];

    queueToProcess.forEach((request) => {
      if (error) {
        request.reject(error);
      } else {
        const newToken = this.getAuthToken();
        if (request.config.headers) {
          request.config.headers.Authorization = `Bearer ${newToken}`;
          delete request.config.headers['X-Retry-With-Refresh-Token'];
        }
        request.resolve(this.axiosInstance(request.config));
      }
    });
  }
  private async postRefreshToken(data: { userName: string; refreshToken: string }) {
    const dataRefreshToken = await this.postPublic<{
      token: string;
      refreshToken: string;
      utcExpireDate: Date;
    }>('/v1/identity/refreshToken', data);

    const decodedToken = getTokenObject(dataRefreshToken.token) as {
      exp: number;
      name: string;
      nbf: number;
      roles: string;
      sub: string;
      sub_id: string;
    };

    Cookies.set(SESSION_COOKIE_NAME, dataRefreshToken.token, {
      expires: new Date(dataRefreshToken.utcExpireDate),
      path: '/',
      secure: import.meta.env.NODE_ENV === 'production',
    });
    Cookies.set(REFRESH_TOKEN_COOKIE_NAME, JSON.stringify({ refreshToken: dataRefreshToken.refreshToken, userName: decodedToken?.sub }), {
      expires: new Date(new Date(dataRefreshToken.utcExpireDate).getTime() + 7 * 24 * 60 * 60 * 1000), // +7 jours
      path: '/',
      secure: import.meta.env.NODE_ENV === 'production',
    });
  }
  private getAuthToken(): string | null {
    return getCookieIsomorphic(this.tokenName)() || null;
  }

  public async request<T>(method: string, url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const baseURL = this.defaultBaseURL;
    const response: AxiosResponse<T> = await this.axiosInstance.request({
      method,
      url,
      data,
      ...config,
      baseURL,
    });
    return response.data;
  }

  public async publicRequest<T>(method: string, url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const baseURL = this.defaultBaseURL;

    const publicAxios = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        ...config?.headers,
      },
    });

    const response: AxiosResponse<T> = await publicAxios.request({
      method,
      url,
      data,
      ...config,
    });

    return response.data;
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    // console.log(url, 'url');

    return this.request<T>('get', url, undefined, config);
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>('post', url, data, config);
  }

  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>('put', url, data, config);
  }

  public async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>('patch', url, data, config);
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>('delete', url, undefined, config);
  }

  public async getPublic<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.publicRequest<T>('get', url, undefined, config);
  }

  public async postPublic<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.publicRequest<T>('post', url, data, config);
  }

  public async putPublic<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.publicRequest<T>('put', url, data, config);
  }

  public async patchPublic<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.publicRequest<T>('patch', url, data, config);
  }

  public async deletePublic<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.publicRequest<T>('delete', url, undefined, config);
  }
}
