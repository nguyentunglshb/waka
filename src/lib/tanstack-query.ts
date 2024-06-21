import { ExtractFnReturnType, GetDeepProp } from "@/interfaces/request";
import type {
  UseInfiniteQueryOptions,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";

export type TErrorResponse<TError = any> = GetDeepProp<
  NonNullable<AxiosError<TError>["response"]>,
  "data"
> & { statusCode?: number };

export type QueryConfig<
  QueryFnType extends (...args: any) => any,
  TError = any,
> = Omit<
  UseQueryOptions<ExtractFnReturnType<QueryFnType>, TErrorResponse<TError>>,
  "queryKey" | "queryFn"
>;

export type InfinityQueryConfig<
  QueryFnType extends (...args: any) => any,
  TError = any,
> = Omit<
  UseInfiniteQueryOptions<
    ExtractFnReturnType<QueryFnType>,
    TErrorResponse<TError>
  >,
  "queryKey" | "queryFn"
>;

export type MutationConfig<
  MutationFnType extends (...args: any) => any,
  TError = any,
> = Omit<
  UseMutationOptions<
    ExtractFnReturnType<MutationFnType>,
    TErrorResponse<TError>,
    Parameters<MutationFnType>[0]
  >,
  "mutationFn"
>;
