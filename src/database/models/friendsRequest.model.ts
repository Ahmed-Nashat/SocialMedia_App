import mongoose, { Types, type HydratedDocument } from "mongoose";
import type { IFreindsRequest } from "../../common/index.js";
import { userModel } from "./user.model.js";

const freindsRequestSchema = new mongoose.Schema<IFreindsRequest>(
  {
    senderId: {
      type: Types.ObjectId,
      required: true,
      ref: userModel.collection.name,
    },
    reciverId: {
      type: Types.ObjectId,
      required: true,
      ref: userModel.collection.name,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    strictQuery: true,
  },
);

export type HFreindsRequest = HydratedDocument<IFreindsRequest>;
export const freindsRequestModel = mongoose.model<IFreindsRequest>(
  "freindsRequest",
  freindsRequestSchema,
  "freindsRequest",
);
