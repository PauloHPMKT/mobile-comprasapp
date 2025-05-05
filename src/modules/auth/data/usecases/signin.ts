import { AccountModel } from "@/src/modules/user/domain/models/account";
import { SignIn } from "../../domain/usecases/signin";
import { AuthSignInRepository } from "../protocols/auth-repository";

export class SignInUseCase implements SignIn {
  constructor(private readonly authSignInRepository: AuthSignInRepository) {}

  async execute(email: string, password: string): Promise<AccountModel.SignInResult> {
    const response = await this.authSignInRepository.login({
      email,
      password,
    });
    return response;
  }
}