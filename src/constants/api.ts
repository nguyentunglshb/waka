export const api = {
  LIST_CATEGORY_BY_PAGE: "LIST_CATEGORY_BY_PAGE",
  GET_STORE_BANNER: "GET_STORE_BANNER",
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};

export const urlEncrypt: Record<keyof typeof api, Array<string>> = {
  LIST_CATEGORY_BY_PAGE: ["account", "page", "id", "os"],
  GET_STORE_BANNER: ["account", "id", "os"],
  LOGIN: ["account", "password"],
  LOGOUT: ["account", "code", "id", "os"],
};

export const urlRequest: Record<keyof typeof api, string> = {
  LIST_CATEGORY_BY_PAGE: "/super/listCategoryByPage",
  GET_STORE_BANNER: "/super/getStoreBannerApp",
  LOGIN: "/fm/login",
  LOGOUT: "/fm/logout",
};

export type ApiUrl<T extends typeof urlRequest> = T[keyof T];
