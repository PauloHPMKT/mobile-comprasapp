export interface Response<T = any> {
  success: boolean;
  body: T | Error | string;
}
