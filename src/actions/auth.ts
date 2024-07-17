"use server";

import { api } from "@/constants/api";
import { request } from "@/lib/request";
import { loginFormSchema } from "@/lib/schema";

export const actionLogin = async (fd: FormData) => {
  const params = Object.fromEntries(fd);

  const parsed = loginFormSchema.safeParse(params);

  if (!parsed.success) {
    return;
  }

  const response = await request({
    method: "GET",
    url: api.LOGIN,
    params: {
      ...params,
    },
  });

  return response;
};
