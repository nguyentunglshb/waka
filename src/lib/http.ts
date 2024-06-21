import http from "http";
import https from "https";

export interface RequestOptions<T> extends http.RequestOptions {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: Record<string, string>;
  queryParameters?: Record<string, string>;
  body?: T;
}

export interface HttpResponse<T> {
  data: T;
  status?: number;
  statusMessage?: string;
  headers: Record<string, unknown>;
}

export class HttpClient {
  private baseURL?: string;
  constructor(baseURL?: string) {
    this.baseURL = baseURL;
  }

  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }

  private buildUrl(path: string, queryParameters?: Record<string, string>) {
    let url = this.baseURL || "";
    if (url && !url.endsWith("/")) {
      url += "/";
    }

    url += path;
    if (queryParameters) {
      const queryParams = new URLSearchParams(Object.entries(queryParameters));
      url += `?${queryParams.toString()}`;
    }
    return url;
  }

  private buildRequestOptions<T>(
    method: RequestOptions<T>["method"],
    options: RequestOptions<T>,
  ): RequestOptions<T> {
    const requestOptions: RequestOptions<T> = {
      method,
      headers: options.headers || {},
    };

    if (options.body) {
      requestOptions.headers!["Content-Type"] = "application/json";
    }
    return requestOptions;
  }

  private async sendRequest<T>(
    url: string,
    options: RequestOptions<T>,
  ): Promise<HttpResponse<T>> {
    if (!this.isValidUrl(url)) {
      return Promise.reject(new Error(`Invalid URL provided`));
    }

    const protocol = url.startsWith("http:") ? http : https;
    return new Promise((resolve, reject) => {
      try {
        const request = protocol.request(url, options, (res) => {
          let data = "";
          res.on("data", (chunk) => {
            data += chunk;
          });
          res.on("end", (data: any) => {
            if (
              res.statusCode &&
              res.statusCode >= 200 &&
              res.statusCode < 300
            ) {
              const response: HttpResponse<T> = {
                data: JSON.parse(data),
                status: res.statusCode,
                statusMessage: res.statusMessage,
                headers: res.headers,
              };
              resolve(response);
            } else {
              reject(new Error(""));
            }
          });
          request.on("error", (error) => {
            reject(new Error(`Request error: ${error}`));
          });
          request.end();
        });
      } catch (error) {
        reject(new Error(`Request Error: ${error}`));
      }
    });
  }

  private async send<T>(
    method: RequestOptions<T>["method"],
    path: string,
    options: RequestOptions<T>,
    body?: T,
  ): Promise<HttpResponse<T>> {
    const url = this.buildUrl(path, options.queryParameters);

    if (body) {
      options.body = body;
    }
    let requestOptions = this.buildRequestOptions(method, options);
    try {
      const response = await this.sendRequest<T>(url, requestOptions);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async post<T>(
    path: string,
    body: T,
    options: RequestOptions<T> = { method: "POST" },
  ) {
    return this.send<T>("POST", path, options, body);
  }
  public async put<T>(
    path: string,
    body: T,
    options: RequestOptions<T> = { method: "PUT" },
  ) {
    return this.send<T>("PUT", path, options, body);
  }
  public async patch<T>(
    path: string,
    body: T,
    options: RequestOptions<T> = { method: "PATCH" },
  ) {
    return this.send<T>("PATCH", path, options, body);
  }
  public async delete<T>(
    path: string,
    options: RequestOptions<T> = { method: "DELETE" },
  ) {
    return this.send<T>("DELETE", path, options);
  }
}
