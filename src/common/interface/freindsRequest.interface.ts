import type { Types } from "mongoose";
import type { IUser } from "./user.interface.js";

export interface IFreindsRequest {
  senderId: Types.ObjectId | IUser;
  reciverId: Types.ObjectId | IUser;
  ceratedAt: Date;
  
}
