import { Controller } from "@/src/modules/shared/protocols/controller";
import { ListProps } from "../../domain/models/create-list";
import { CreatePurchaseList } from "../../domain/usecases/create-list";
import { Response } from "../protocols/response";

export class CreatePurchaseListController implements Controller {
  constructor(private readonly createPurchaseList: CreatePurchaseList) {}

  async handle(params: ListProps.ToCreate): Promise<Response<ListProps.Result>> {
    try {
      const { title, products, description } = params;
      const response = await this.createPurchaseList.execute({
        title,
        products,
        description,
      });
      return {
        success: true,
        body: response,
      }
    } catch (error) {
      return {
        success: false,
        body: error as Error || 'Falha ao criar lista',
      }
    }
  }
}