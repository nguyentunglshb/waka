import { isMobile } from "@/helpers/device";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from "axios";
import { MD5, createSign, generateDeviceId } from "./hash";
import { urlRequest, api } from "@/constants/api";
import { RequireField } from "@/interfaces/request";
// import { cookies } from "next/headers";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeout: 15000,
  headers: {
    accept: "application/json",
    "Content-Type": "multipart/form-data",
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    responseEncoding: "utf8",
    responseType: "json",
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    Expires: "0",
    "Access-Control-Allow-Origin": "*",
    "X-Application": "web app",
    "X-Version": "1.0.1",
    language: "en",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version",
    "Access-Control-Max-Age": "86400",
  },
}) as AxiosInstance;

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    return Promise.reject(error);
  },
);

interface OptionsRequest<TDataRequest>
  extends RequireField<AxiosRequestConfig<TDataRequest>, "url"> {
  method: Method;
}

const request = async <
  TDataRequest = any,
  TDataResponse = any,
  TDataError = any,
>(
  options: OptionsRequest<TDataRequest>,
) => {
  // readonly
  const method = options.method;
  const url = options.url as keyof typeof api;

  const user: any = null;
  const os = isMobile.any() ? "wap" : "web";
  //   const os = "web";
  const account = user && user?.userId ? user?.userId : "guest";
  const data = options.data;
  const params = options.params;
  const tokenMd5 = (data as any)?.account || account;

  let token = MD5(tokenMd5.toString());
  // const tidToken = cookies()

  let secureCode = createSign(url, data as any, token);

  const id = generateDeviceId();

  options.url = urlRequest[url];

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

  const onSuccess = (response: AxiosResponse<TDataResponse>) => {
    // if (
    //   (response.data as any)?.code === 101 ||
    //   (response.data as any)?.code === 100
    // ) {
    //   deleteUserInfo();
    //   const configs = response.config;
    //   configs.params['moq'] = dummyQueryParams.moq;
    //
    //   return axiosClient.request(configs).then(response => ({
    //     ...response.data,
    //     statusCode: response.status,
    //   }));
    // }

    return {
      ...response.data,
      statusCode: response.status,
    };
  };

  const onError = (error: AxiosError<TDataError>) => {
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({
      ...error.response?.data,
      statusCode: error.response?.status,
    });
  };

  return instance({ ...options, params, data })
    .then(onSuccess)
    .catch(onError);
};

export default instance;
export { request };
