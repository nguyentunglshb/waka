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
import Link from "next/link";
import { twMerge } from "tailwind-merge";

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
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {menu.map((item, index) => (
          <MenuItemCategory
            key={item.title}
            title={item.title}
            page={item?.page}
          />
        ))}
        {/* <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Documentation
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem> */}
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

  console.log({ data });

  return page ? (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="text-base font-medium hover:text-green-500 focus:text-green-500">
        {title}
      </NavigationMenuTrigger>
      {data && (
        <NavigationMenuContent className="rounded-xl">
          <div className="p-4 md:w-[400px] lg:w-[800px]">
            <div className="grid w-full grid-cols-4 gap-x-4">
              {data?.data.category.list.map((item) => (
                <div
                  key={item.id}
                  className="hover:bg-white-overlay rounded-xl px-3 py-2 text-sm font-normal text-white"
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
                    className="bg-white-overlay rounded-xl px-3 py-2 text-sm font-normal text-white"
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
    <NavigationMenuItem>
      <NavigationMenuLink
        className={twMerge(
          navigationMenuTriggerStyle(),
          "text-base font-medium hover:text-green-500 focus:text-green-500",
        )}
      >
        {title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};
