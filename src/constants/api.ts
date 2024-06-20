export const api = {
  LIST_CATEGORY_BY_PAGE: "LIST_CATEGORY_BY_PAGE",
};

export const urlEncrypt: Record<keyof typeof api, Array<string>> = {
  LIST_CATEGORY_BY_PAGE: ["account", "page", "id", "os"],
};

export const urlRequest: Record<keyof typeof api, string> = {
  LIST_CATEGORY_BY_PAGE: "/super/listCategoryByPage",
};

export type ApiUrl<T extends typeof urlRequest> = T[keyof T];
