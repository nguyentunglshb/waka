import { isMobile } from "@/helpers/device";
import httpClient, { RequestConfigs } from "./http-client";
import { MD5, createSign, generateDeviceId } from "./hash";
import { api, urlRequest } from "@/constants/api";

type InternalRequestConfig<D = any> = RequestConfigs & {
  headers: Record<string, any>;
};

type Res<T = any, D = any> = {
  data: T;
  code: number;
  statusText: string;
  headers: Record<string, unknown>;
  config: InternalRequestConfig<D>;
  message?: string;
  request?: any;
};

type Err<T = unknown, D = any> = Error & {
  response?: Res<T, D>;
};

const request = async <
  TDataRequest = any,
  TDataResponse = any,
  TDataError = any,
>(
  configs: RequestConfigs<TDataRequest>,
) => {
  const method = configs.method;
  const url = configs.url as keyof typeof api;

  const user: any = null;
  const os = isMobile.any() ? "wap" : "web";

  const account = user && user?.userId ? user?.userId : "guest";
  const data = configs.data;
  const params = configs.params || {};
  const tokenMd5 = (data as any)?.account || account;

  let token = MD5(tokenMd5.toString());

  let secureCode = createSign(url, data as any, token);
  const id = generateDeviceId();

  configs.url = urlRequest[url];

  switch (method) {
    case "get":
    case "GET": {
      secureCode = createSign(url, params, token);

      params["secure_code"] = secureCode;
      params["account"] = account;
      params["os"] = os;
      params["id"] = id;

      break;
    }
    case "post":
    case "POST": {
      (data as Record<string, unknown>)["secure_code"] = secureCode;
      (data as Record<string, unknown>)["account"] = account;
      (data as Record<string, unknown>)["os"] = os;
      (data as Record<string, unknown>)["id"] = id;
      break;
    }
  }

  const onSuccess = (response: Res<TDataResponse>) => {
    return {
      ...response,
      statusCode: response?.code,
    };
  };

  const onError = (error: Err<TDataError>) => {
    return Promise.reject({
      ...error.response?.data,
      statusCode: error.response?.code,
    });
  };

  return httpClient
    .sendRequest({
      ...configs,
    })
    .then(onSuccess)
    .catch(onError);
};

export { request };
