// src/modules/user/infra/repositories/AuthApiRepository.ts
import { AccountModel } from "@/src/modules/user/domain/models/account";
import { AxiosInstance } from "axios";
import { AuthSignInRepository } from "../../data/protocols/auth-repository";

export class AuthApiRepository implements AuthSignInRepository {
  constructor(private readonly http: AxiosInstance) {}

  async login(data: AccountModel.SignIn): Promise<AccountModel.SignInResult> {
    const response = await this.http.post("/auth", data);
    const { access_token, user } = response.data;
    return {
      user,
      token: access_token,
    };
  }

  async validateToken(token: string): Promise<boolean> {
    try {
      const response = await this.http.post("/auth/validate", { token });
      return response.data.valid;
    } catch {
      return false;
    }
  }
}
