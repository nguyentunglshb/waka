"use client";

import { api } from "@/constants/api";
import { request } from "@/lib/axios";
import React, { useEffect } from "react";

function WithBaseHeader() {
  const getHeaderData = async () => {
    await request({
      method: "GET",
      url: api.LIST_CATEGORY_BY_PAGE,
      params: {
        page: "book_retail",
      },
    });
  };

  useEffect(() => {
    // getHeaderData();
    fetch("/api/list-category-by-page");
  }, []);

  return <div>WithBaseHeader</div>;
}

export default WithBaseHeader;
