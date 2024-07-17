import { z } from "zod";

export const loginFormSchema = z.object({
  account: z.string().min(6, { message: "Tài khoản phải nhiều hơn 6 kí tự" }),
  password: z.string().min(6, { message: "Mật khẩu phải nhiều hơn 6 kí tự" }),
});
