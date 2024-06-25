import { QueryConfig } from "@/lib/tanstack-query";
import { api } from "@/constants/api";
import { BaseResponse } from "@/interfaces/request";
import { useQueryParams } from "../use-query-params.hook";
import { QueryKey, useQuery } from "@tanstack/react-query";
import { request } from "@/lib/request";

type QueryStoreBanner = {
  mini_app?:
    | "supper_app"
    | "waka_ebook"
    | "waka_fm"
    | "waka_youth"
    | "waka_bussiness"
    | "waka_comic"
    | "waka_shop";
  moq?: number;
};

type UseGetCategoryStoreBannerConfigs = {
  configs?: QueryConfig<typeof getStoreBanner>;
  initQueryParams?: QueryStoreBanner;
};

export interface Banner {
  type: string;
  id: number;
  title: string;
  image_url: string;
  image_url_app: string;
  target_url: string;
  data: Data;
  is_xbol: number;
  desc: string;
  adv_id: number;
}

export interface Data {
  news_id: number;
  news_name: string;
  description: string;
  category_id: number;
  thumb: string;
  content: string;
  updated_time: string;
  created_time: string;
  num_view: number;
  linkShare: string;
}

const getStoreBanner = (
  params: QueryStoreBanner,
): Promise<BaseResponse<Array<Banner>>> => {
  return request({
    url: api.GET_STORE_BANNER,
    method: "GET",
    params,
  });
};

export const useGetStoreBanner = ({
  configs,
  initQueryParams,
}: UseGetCategoryStoreBannerConfigs = {}) => {
  const { queryParams, ...restQueryParams } =
    useQueryParams<QueryStoreBanner>(initQueryParams);

  const queryKeyStoreBanner: QueryKey = ["store-banner", queryParams];

  const { data, ...restQueryResult } = useQuery({
    queryKey: queryKeyStoreBanner,
    queryFn: () => getStoreBanner({ ...queryParams }),
    ...configs,
  });

  return {
    data: data?.data,
    queryParams,
    queryKey: queryKeyStoreBanner,
    ...restQueryParams,
    ...restQueryResult,
  };
};
