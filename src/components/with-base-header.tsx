"use client";

import { useGetCategoryByPage } from "@/hooks/apis/use-get-category-header";
import React from "react";

function WithBaseHeader() {
  const { data } = useGetCategoryByPage({
    initQueryParams: {
      page: "book_retail",
    },
  });

  console.log(data);

  return <div>WithBaseHeader</div>;
}

export default WithBaseHeader;
