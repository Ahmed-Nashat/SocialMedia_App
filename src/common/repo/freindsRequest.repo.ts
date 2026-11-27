import BaseRepo from "./base.repo.js";
import { freindsRequestModel } from "../../database/models/friendsRequest.model.js";
import type { IFreindsRequest } from "../interface/freindsRequest.interface.js";
import type { ProjectionType, QueryOptions } from "mongoose";
import type { QueryFilter } from "mongoose";

export class FreindsRequestRepo extends BaseRepo<IFreindsRequest> {
  constructor() {
    super(freindsRequestModel);
  }
  async findMany({
    filter = {},
    projection = null,
    options = {},
  }: {
    filter?: QueryFilter<IFreindsRequest>;
    projection?: ProjectionType<IFreindsRequest> | null;
    options?: QueryOptions<IFreindsRequest>;
  }): Promise<IFreindsRequest[]> {
    return await this.model.find(filter, projection, options).exec();
  }
}
export const freindsRequestRepo = new FreindsRequestRepo();
