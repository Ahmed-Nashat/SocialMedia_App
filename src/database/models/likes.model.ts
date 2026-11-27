import mongoose, { Types, type HydratedDocument } from "mongoose";
import type { ILikes } from "../../common/interface/likes.interface.js";
import { userModel } from "./user.model.js";
import { postModel } from "./post.model.js";

const likesSchema = new mongoose.Schema<ILikes>(
  {
    userIds: {
      type: [Types.ObjectId],
      ref: userModel.collection.name,
      required: true,
    },
    postId: {
      type: Types.ObjectId,
      ref: postModel.collection.name,
      required: true,
      unique: true,
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    strictQuery: true,
    timestamps: true,
    strict: true,
  },
);

export type HLikes = HydratedDocument<ILikes>;
export const likesModel = mongoose.model<ILikes>("likes", likesSchema, "likes");
