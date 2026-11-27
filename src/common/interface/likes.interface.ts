import type { Types } from "mongoose";
import type { IUser } from "./user.interface.js";

export interface ILikes {
  postId: Types.ObjectId;
  userIds: (Types.ObjectId | IUser)[];
}
