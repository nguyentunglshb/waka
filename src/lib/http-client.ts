export type Method =
  | "get"
  | "GET"
  | "delete"
  | "DELETE"
  | "head"
  | "HEAD"
  | "options"
  | "OPTIONS"
  | "post"
  | "POST"
  | "put"
  | "PUT"
  | "patch"
  | "PATCH"
  | "purge"
  | "PURGE"
  | "link"
  | "LINK"
  | "unlink"
  | "UNLINK";

export type RequestConfigs<D = any> = RequestInit & {
  method: Method;
  contentType?: string;
  url: string;
  headers?: Record<string, string>;
  params?: Record<string, any>;
  body?: Record<string, any>;
  data?: D;
};

class HttpClient {
  private baseURL: string;
  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async sendRequest(configs: RequestConfigs) {
    try {
      const headers = configs.headers || {};
      const method = configs.method || "GET";
      const url = configs.url || null;
      const params = configs.params || {};
      const body = configs.body || {};

      const fetchHeaders = this.buildHeaders(headers);
      const fetchBody = this.buildFormData(body);
      const fetchQueryParams = this.buildQueryParams(params);

      const fetchConfigs = {
        ...configs,
        method,
        headers: fetchHeaders,
      };

      if (method.toUpperCase() !== "GET") {
        fetchConfigs.body = fetchBody;
      }

      const response = await fetch(
        this.baseURL + url + "?" + fetchQueryParams,
        fetchConfigs,
      );

      return Promise.resolve(response.json());
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private buildFormData(formField: Record<string, string>) {
    const formData = new FormData();
    Object.entries(formField).forEach(([key, value]) => {
      formData.append(key, value);
    });

    return formData;
  }

  private buildHeaders(headers: Record<string, string>) {
    const lowerCaseHeaders: Record<string, unknown> = {};
    Object.entries(headers).forEach(([key, value]) => {
      lowerCaseHeaders[key.toLowerCase()] = value;
    });
    return headers;
  }

  private buildQueryParams(params: Record<string, any>) {
    const queryString = Object.entries(params)
      .map(([key, value]) => {
        if (value === true) {
          return encodeURIComponent(key);
        }
        return encodeURIComponent(key) + "=" + encodeURIComponent(value);
      })
      .join("&");

    return queryString;
  }
}

const httpClient = new HttpClient(process.env.NEXT_PUBLIC_API_URL!);

export default httpClient;
