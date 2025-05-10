import { ListProps } from "../../domain/models/create-list";
import { CreatePurchaseList } from "../../domain/usecases/create-list";
import { CreateListRepository } from "../protocols/create-list-repository";

export class CreatePurchaseListUseCase implements CreatePurchaseList {
  constructor(private readonly createPurchaseListRepository: CreateListRepository) {}

  async execute(data: ListProps.ToCreate): Promise<ListProps.Result | Error> {
    if (!data.title.trim()) {
      return new Error("Título da lista não pode ser vazio");
    }

    const products = this.mapperProductsData(data.products);

    const purchaseListPayload = {
      title: data.title,
      products,
      description: data.description,
    }
    return await this.createPurchaseListRepository.create(purchaseListPayload)
  }

  private mapperProductsData(products: ListProps.Product[]): ListProps.Product[] {
    return products.map((product) => ({
      name: product.name,
      quantity: product.quantity,
      unitPrice: product.unitPrice,
      totalPrice: product.totalPrice,
    }))
  }
}