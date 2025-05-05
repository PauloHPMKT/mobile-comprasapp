import { User } from "../entity/User";

export namespace AccountModel {
  export interface SignIn {
    email: string;
    password: string;
  }

  export interface SignInResult {
    user: Omit<User, "password">;
    token: string;
  }
}