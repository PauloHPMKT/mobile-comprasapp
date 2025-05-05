import { AccountModel } from "@/src/modules/user/domain/models/account";

export interface AuthSignInRepository {
  login({ email, password }: AccountModel.SignIn): Promise<any>;
}