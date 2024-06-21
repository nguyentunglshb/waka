import { useCallback, useMemo, useState } from "react";

export const useQueryParams = <
  TQuery extends Record<string, unknown> = Record<string, unknown>,
>(
  initialParams: Partial<TQuery> = {},
) => {
  const defaultQueryParams = useMemo(
    () => ({
      ...initialParams,
    }),
    [initialParams],
  );

  const [queryParams, setQueryParams] =
    useState<Partial<TQuery>>(defaultQueryParams);

  const memoSetQueryParams = useCallback(
    (newQueryParams?: Partial<TQuery>) =>
      setQueryParams((prevParams: any) => ({
        ...prevParams,
        ...newQueryParams,
      })),
    [],
  );

  const memoSetQueryParamsOverride = useCallback(
    (newQueryParans?: Partial<TQuery>) =>
      setQueryParams((prevParams: any) => {
        if (newQueryParans) {
          return newQueryParans;
        }
        return prevParams;
      }),
    [],
  );

  const resetQueryParams = useCallback(
    () => setQueryParams(() => defaultQueryParams),
    [defaultQueryParams],
  );

  const memoQueryParams = useMemo(() => queryParams, [queryParams]);

  return {
    queryParams: memoQueryParams,
    setQueryParams: memoSetQueryParams,
    setQueryParamsOverride: memoSetQueryParamsOverride,
    resetQueryParams,
  };
};
