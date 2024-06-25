"use client";

import { useGetCategoryByPage } from "@/hooks/apis/use-get-category-header";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import logo from "@/../public/images/logo.png";
import { Button, buttonVariants } from "./ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Item = {
  title: string;
  page?: "ebook" | "fm_audio_book" | "podcast" | "book_retail" | undefined;
};

const menu: Array<Item> = [
  {
    title: "Sách điện tử",
    page: "ebook",
  },
  {
    title: "Sách nói",
    page: "fm_audio_book",
  },
  {
    title: "Truyện tranh",
  },
  {
    title: "Sách hiệu sồi",
    page: "book_retail",
  },
  {
    title: "Sách tóm tắt",
  },
  {
    title: "Podcast",
    page: "podcast",
  },
  {
    title: "Xem thêm",
  },
];

function WithBaseHeader() {
  const router = useRouter();

  return (
    <NavigationMenu className="fixed left-0 top-0 w-full max-w-none justify-between bg-gradient-to-b from-[rgba(18,18,20,0.68)] to-[rgba(0,0,0,0)] px-14 py-5">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="/">
            <Image
              src={logo}
              alt="logo"
              width={106}
              height={60}
              className="mr-4 h-7 w-auto object-contain"
              priority
            />
          </NavigationMenuLink>
        </NavigationMenuItem>
        {menu.map((item) => (
          <MenuItemCategory
            key={item.title}
            title={item.title}
            page={item?.page}
          />
        ))}
      </NavigationMenuList>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link
            href="/sign-up"
            className={buttonVariants({ variant: "secondary" })}
          >
            Đăng ký
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            href="/sign-in"
            className={buttonVariants({ variant: "primary" })}
          >
            Đăng nhập
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default WithBaseHeader;

const MenuItemCategory = ({
  title,
  page,
}: {
  title: string;
  page?: "ebook" | "fm_audio_book" | "podcast" | "book_retail" | undefined;
}) => {
  const { data } = useGetCategoryByPage({
    initQueryParams: {
      page,
    },
    configs: {
      enabled: !!page,
    },
  });

  return page ? (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="bg-transparent text-base font-medium text-white hover:!bg-transparent hover:text-green-500 focus:text-green-500">
        {title}
      </NavigationMenuTrigger>
      {data && (
        <NavigationMenuContent className="rounded-xl">
          <div className="p-4 md:w-[400px] lg:w-[800px]">
            <div className="grid w-full grid-cols-4 gap-x-4">
              {data?.data.category.list.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl px-3 py-2 text-sm font-normal text-white hover:bg-white-overlay"
                >
                  {item.name}
                </div>
              ))}
            </div>
            <div>
              <p>Khám phá thêm</p>
              <div className="grid w-full grid-cols-4 gap-4 pt-4">
                {data?.data.more.list.map((item) => (
                  <div
                    key={item.name}
                    className="rounded-xl bg-white-overlay px-3 py-2 text-sm font-normal text-white"
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </NavigationMenuContent>
      )}
    </NavigationMenuItem>
  ) : (
    <NavigationMenuItem className="cursor-pointer">
      <NavigationMenuLink
        className={twMerge(
          navigationMenuTriggerStyle(),
          "hover:bg-transparent! bg-transparent text-base font-medium text-white hover:text-green-500 focus:text-green-500",
        )}
      >
        {title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};
