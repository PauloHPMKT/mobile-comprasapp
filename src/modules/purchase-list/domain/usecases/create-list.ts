import { ListProps } from "../models/create-list";

export interface CreatePurchaseList {
  execute(data: ListProps.ToCreate): Promise<ListProps.Result | Error>;
}