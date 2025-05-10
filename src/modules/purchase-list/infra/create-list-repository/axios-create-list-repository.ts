import { AxiosInstance } from "axios";
import { CreateListRepository } from "../../data/protocols/create-list-repository";
import { CreateListInfra } from "../../domain/models/create-list-infra";

export class AxiosCreateListRepository implements CreateListRepository {
  constructor(private readonly http: AxiosInstance) {}

  async create(data: CreateListInfra.Params): Promise<CreateListInfra.Result> {
    try {
      const purchaseList = {
        title: data.title,
        products: [
          ...data.products.map((product) => ({
            name: product.name,
            quantity: product.quantity,
            unitPrice: product.unitPrice,
            totalPrice: product.totalPrice,
          })),
        ],
        description: data.description,
      }

      const response = await this.http.post("/purchase-list/add", purchaseList);
      return response.data;
    } catch (error) {
      console.error("Error creating purchase list:", error);
      throw new Error("Error creating purchase list");
    }
  }
}