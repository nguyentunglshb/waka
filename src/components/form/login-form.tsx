"use client";

import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginFormSchema } from "@/lib/schema";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import Link from "next/link";
import { Button } from "../ui/button";
import facebookIcon from "@/../public/icons/facebook.svg";
import googleIcon from "@/../public/icons/google.svg";
import Image from "next/image";
import { actionLogin } from "@/actions/auth";

interface LoginFormProps {}

const LoginForm: FC<LoginFormProps> = ({}) => {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      account: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof loginFormSchema>) => {
    const fd = new FormData();

    for (const [key, value] of Object.entries(data)) {
      fd.append(key, value);
    }

    actionLogin(fd);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="account"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Nhập tên đăng nhập/Số điện thoại"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Nhập mật khẩu"
                  {...field}
                  className="my-3"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Link href="/" className="block py-3 text-right font-medium text-main">
          Quên mật khẩu?
        </Link>
        <Button className="w-full" variant="primary" type="submit">
          Đăng nhập
        </Button>
        <p>Hoặc đăng nhập với</p>
        <div className="flex">
          <Button variant="secondary">
            <Image
              src={facebookIcon}
              alt="facebook"
              width={24}
              height={24}
              className="mr-2 size-6 object-contain"
            />
            Facebook
          </Button>
          <Button variant="secondary">
            <Image
              src={googleIcon}
              alt="google"
              width={24}
              height={24}
              className="mr-2 size-6 object-contain"
            />
            Google
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
