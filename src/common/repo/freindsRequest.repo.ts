import BaseRepo from "./base.repo.js";
import { freindsRequestModel } from "../../database/models/friendsRequest.model.js";
import type { IFreindsRequest } from "../interface/freindsRequest.interface.js";

export class FreindsRequestRepo extends BaseRepo<IFreindsRequest> {
  constructor() {
    super(freindsRequestModel);
  }
}
export const freindsRequestRepo = new FreindsRequestRepo();
