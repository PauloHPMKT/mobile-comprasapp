import { User } from "../entity/User";

export namespace UserModel {
  export type Result = Omit<User, "password">;
}