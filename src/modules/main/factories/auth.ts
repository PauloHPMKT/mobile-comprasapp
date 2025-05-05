import { SignInUseCase } from "../../auth/data/usecases/signin";
import { AuthApiRepository } from "../../auth/infra/auth-repository/api-auth-repository";
import { HttpAxiosInstance } from "../../auth/infra/axios/http";

export const makeAuthSignInFactory = (): SignInUseCase => {
  const httpInstance = HttpAxiosInstance.getInstance().axios;
  const authSignInRepository = new AuthApiRepository(httpInstance);

  return new SignInUseCase(authSignInRepository);
}