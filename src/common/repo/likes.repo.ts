import type { IPost } from "../interface/post.interface.js";
import BaseRepo from "./base.repo.js";
import { type HLikes, likesModel } from "../../database/models/likes.model.js";
import type { ProjectionType, QueryFilter } from "mongoose";
import type { QueryOptions } from "mongoose";
import type { ILikes } from "../interface/likes.interface.js";

export class LikesRepo extends BaseRepo<ILikes> {
  constructor() {
    super(likesModel);
  }
  async findMany({
    filter = {},
    projection = null,
    options = {},
  }: {
    filter?: QueryFilter<IPost>;
    projection?: ProjectionType<IPost> | null;
    options?: QueryOptions<IPost>;
  }): Promise<ILikes[]> {
    return await this.model.find(filter, projection, options);
  }
}
export const likesRepo = new LikesRepo();
