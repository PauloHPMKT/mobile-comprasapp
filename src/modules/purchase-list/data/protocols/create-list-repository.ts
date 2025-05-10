import { CreateListInfra } from "../../domain/models/create-list-infra";

export interface CreateListRepository {
  create(data: CreateListInfra.Params): Promise<CreateListInfra.Result>;
}