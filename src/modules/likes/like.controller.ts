import { Router, type Request } from "express";
import {
  authMiddleware,
  respopnseFormatter,
  validator,
} from "../../common/index.js";
import { addLikeSchema, likeService } from "./index.js";
import type { HUser } from "../../database/index.js";

export const likesRouter = Router();

likesRouter.post(
  "/addLike/:postId",
  authMiddleware,
  validator(addLikeSchema),
  respopnseFormatter(async (req: Request) => {
    await likeService.addLike({
      user: req.user as HUser,
      postId: req.validate.params.postId
    });
    return {
      data: null,
      msg: "Post liked",
      status: 200,
    };
  }),
);

likesRouter.delete(
  "/removeLike/:postId",
  authMiddleware,
  validator(addLikeSchema),
  respopnseFormatter(async (req: Request) => {
    await likeService.removeLike({ user: req.user as HUser, postId: req.validate.params.postId });
    return { data: null, msg: "Like removed", status: 200 };
  }),
);

likesRouter.get(
  "/listLikes/:postId",
  authMiddleware,
  validator(addLikeSchema),
  respopnseFormatter(async (req: Request) => {
    const likes = await likeService.listLikes({ user: req.user as HUser, postId: req.validate.params.postId });
    return { data: likes, msg: "Likes retrieved", status: 200 };
  }),
);
