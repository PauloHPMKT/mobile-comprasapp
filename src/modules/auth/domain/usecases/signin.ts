export interface SignIn {
  execute: (email: string, password: string) => Promise<any>;
}