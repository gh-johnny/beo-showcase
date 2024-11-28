import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import featureFlags from '@/config/FeatureFlag';
import ErrorHandler from '@/errors/ErrorHandler';

class HttpClient {
  private instance: AxiosInstance;
  private errorHandler: ErrorHandler;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.errorHandler = new ErrorHandler();

    if (featureFlags.isEnabled('enableAxiosAuthInterceptors')) {
      this.initializeRequestInterceptor();
      this.initializeResponseInterceptor();
    }
  }

  private initializeRequestInterceptor() {
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: AxiosError) => {
        this.errorHandler.processError(error);
      }
    );
  }

  private initializeResponseInterceptor() {
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        this.errorHandler.processError(error);
      }
    );
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.errorHandler.handle(this.instance.get<T>(url, config).then((response) => response.data));
  }

  public async post<T>(url: string, data: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.errorHandler.handle(this.instance.post<T>(url, data, config).then((response) => response.data));
  }

  public async put<T>(url: string, data: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.errorHandler.handle(this.instance.put<T>(url, data, config).then((response) => response.data));
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.errorHandler.handle(this.instance.delete<T>(url, config).then((response) => response.data));
  }
}

export default HttpClient;
