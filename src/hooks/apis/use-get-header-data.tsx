import { api } from "@/constants/api";
import { BaseResponse } from "@/interfaces/request";
import { request } from "@/lib/axios";
import { QueryConfig } from "@/lib/tanstack-query";
import { useQueryParams } from "../use-query-params.hook";
import { QueryKey, useQuery } from "@tanstack/react-query";

type QueryCategoryByPage = {
  page?: "ebook" | "fm_audio_book" | "podcast" | "book_retail";
  moq?: number;
};

type UseGetCategoryByPageConfigs = {
  configs?: QueryConfig<typeof getCategoryByPage>;
  initQueryParams?: QueryCategoryByPage;
};

type MainCategory = {
  content_detail_url: string;
  description?: string;
  id: number;
  name: string;
  order: number;
  status: number;
  thumb: string;
  type: number;
};

type ExtraCategory = {
  api: string;
  data: number;
  name: string;
  type: string;
};

type ApiResponse = {
  category: {
    list: Array<MainCategory>;
    title: string;
  };
  more: {
    list: Array<ExtraCategory>;
    title: string;
  };
};

export async function getCategoryByPage(
  params: QueryCategoryByPage,
): Promise<BaseResponse<ApiResponse>> {
  return request({
    url: api.LIST_CATEGORY_BY_PAGE,
    method: "GET",
    params,
  });
}

export const useGetCategoryByPage = ({
  configs,
  initQueryParams,
}: UseGetCategoryByPageConfigs = {}) => {
  const { queryParams, ...restQueryParams } =
    useQueryParams<QueryCategoryByPage>(initQueryParams);

  const queryKeyCategoryByPage: QueryKey = ["category-by-page", queryParams];

  const { data, ...restQueryResult } = useQuery({
    queryKey: queryKeyCategoryByPage,
    queryFn: () => getCategoryByPage({ ...queryParams }),
    ...configs,
  });

  return {
    data,
    queryParams,
    queryKey: queryKeyCategoryByPage,
    ...restQueryParams,
    ...restQueryResult,
  };
};
