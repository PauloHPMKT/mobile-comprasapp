import { ListProps } from "../../purchase-list/domain/models/create-list";
import { Response } from "../../purchase-list/presentation/protocols/response";

export interface Controller {
  handle(httpRequest: ListProps.ToCreate): Promise<Response>;
}