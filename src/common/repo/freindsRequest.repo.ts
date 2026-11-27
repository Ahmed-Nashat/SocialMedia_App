import BaseRepo from "./base.repo.js";
import { freindsRequestModel } from "../../database/models/friendsRequest.model.js";
import type { IFreindsRequest } from "../interface/freindsRequest.interface.js";

export class FreindsRequestRepo extends BaseRepo<IFreindsRequest> {
  constructor() {
    super(freindsRequestModel);
  }
  async findMany({
    filter = {},
    projection = null,
    options = {},
  }: {
    filter?: QueryFilter<IUser>;
    projection?: ProjectionType<IUser> | null;
    options?: QueryOptions<IUser>;
  }): Promise<IUser[]> {
    return await this.model.find(filter, projection, options).exec();
  }
}
export const freindsRequestRepo = new FreindsRequestRepo();
