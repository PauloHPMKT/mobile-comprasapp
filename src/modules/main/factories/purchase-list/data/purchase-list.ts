import { CreatePurchaseListUseCase } from "@/src/modules/purchase-list/data/usecases/create-list";
import { AxiosCreateListRepository } from "@/src/modules/purchase-list/infra/create-list-repository/axios-create-list-repository";
import { HttpAxiosInstance } from "@/src/modules/shared/api/axios/http";

export const makeCreatePurchaseListUseCase = (): CreatePurchaseListUseCase => {
  const httpInstance = HttpAxiosInstance.getInstance().axios;
  const createPurchaseListRepository = new AxiosCreateListRepository(httpInstance);

  return new CreatePurchaseListUseCase(createPurchaseListRepository);
}