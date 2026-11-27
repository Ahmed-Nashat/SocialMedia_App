import { Types } from "mongoose";
import {
  enums,
  exceptions,
  likesRepo,
  postRepo,
  userRepo,
  type LikesRepo,
  type PostRepo,
} from "../../common/index.js";
import type { HUser } from "../../database/index.js";
import type { HLikes } from "../../database/models/likes.model.js";
import type { addLikeDTO } from "./dto/likes.dto.js";

class LikeService {
  private readonly likesRepo: LikesRepo;
  private readonly postRepo: PostRepo;
  private exceptions = exceptions;
  constructor() {
    this.likesRepo = likesRepo;
    this.postRepo = postRepo;
  }

  private async findVisiblePost(user: HUser, postId: string) {
    const currentUser = await userRepo.findById({ id: new Types.ObjectId(user._id) });
    if (!currentUser) throw new this.exceptions.NotFoundException("User not found");
    const post = await this.postRepo.findOne({
      filter: {
        _id: new Types.ObjectId(postId),
        $and: [{ $or: [
          { availability: enums.availabliityEnum.public },
          { createdBy: currentUser._id },
          { availability: enums.availabliityEnum.friends, createdBy: { $in: currentUser.friends ?? [] } },
        ] }],
      },
    });
    if (!post) throw new this.exceptions.NotFoundException("This post is not found");
    return post;
  }

  async addLike({
    user,
    postId,
  }: {
    user: HUser;
    postId: addLikeDTO;
  }): Promise<HLikes | null> {
    await this.findVisiblePost(user, postId);

    return await this.likesRepo.findOneAndUpdate({
      filter: {
        postId,
      },
      update: {
        $addToSet: {
          userIds: user._id,
        },
      },
      options: {
        upsert: true,
      },
    });
  }

  async removeLike({ user, postId }: { user: HUser; postId: addLikeDTO }) {
    await this.findVisiblePost(user, postId);
    return await this.likesRepo.findOneAndUpdate({
      filter: { postId },
      update: { $pull: { userIds: user._id } },
    });
  }

  async listLikes({ user, postId }: { user: HUser; postId: addLikeDTO }) {
    await this.findVisiblePost(user, postId);
    const likes = await this.likesRepo.findOne({
      filter: { postId },
      options: { populate: { path: "userIds", select: "firstName lastName userName image" } },
    });
    return likes?.userIds ?? [];
  }
}

export const likeService = new LikeService();
