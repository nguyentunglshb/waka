export type RequireField<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type ExtractFnReturnType<FnType extends (...args: any) => any> = Awaited<
  ReturnType<FnType>
>;

export type GetDeepProp<T extends object, K extends string> = K extends keyof T
  ? T[K]
  : { [P in keyof T]: GetDeepProp<Extract<T[P], object>, K> }[keyof T];

export type BaseResponse<T> = {
  code: number;
  message: string;
  data: T;
};
