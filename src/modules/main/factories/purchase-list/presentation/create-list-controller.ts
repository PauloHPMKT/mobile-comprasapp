import { CreatePurchaseListController } from "@/src/modules/purchase-list/presentation/controller/create-list";
import { makeCreatePurchaseListUseCase } from "../data/purchase-list";

export const makeCreatePurchaseListController = (): CreatePurchaseListController => {
  const createPurchaseListUseCase = makeCreatePurchaseListUseCase();

  return new CreatePurchaseListController(createPurchaseListUseCase);
}