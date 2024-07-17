import { api } from "@/constants/api";
import { request } from "@/lib/request";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);

  const pathname = url.pathname;
  const params = req.body;

  console.log({ req });

  const res = await request({
    method: "GET",
    url: api.LIST_CATEGORY_BY_PAGE,
    params: {
      page: "book_retail",
    },
  });

  return new NextResponse(
    JSON.stringify({ code: 0, message: "success", data: res.data }),
  );
}
