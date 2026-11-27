import { Router, type Request } from "express";
import {
  authMiddleware,
  fileTypes,
  multerMemory,
  processFiles,
  respopnseFormatter,
  validator,
  type IPgginate,
  type IPost,
  type IResponse,
} from "../../common/index.js";
import { createPopstSchema, updatePostSchema } from "./post.validation.js";
import { postService } from "./post.service.js";
import type { HUser } from "../../database/index.js";

export const postRouter = Router({
  strict: true,
  caseSensitive: true,
});

postRouter.post(
  "/posts",
  authMiddleware,
  respopnseFormatter(
    async (req: Request): Promise<IResponse<IPgginate<IPost>>> => {
      const post = await postService.listPosts({
        user: req.user as HUser,
        page: Number(req.query.page!) || 1,
        limit: Number(req.query.limit!) || 5,
      });
      return {
        data: post,
        status: 200,
        msg: "Posts retrieved",
      };
    },
  ),
);

postRouter.post(
  "/",
  authMiddleware,
  multerMemory({ fileType: fileTypes.images! }).array("attachments"),
  processFiles({ fileType: fileTypes.images! }),
  validator(createPopstSchema),
  respopnseFormatter(async (req: Request): Promise<IResponse<IPost>> => {
    const post = await postService.createPost({
      user: req.user as HUser,
      data: req.validate.body,
      files: req.validate.files,
    });
    return {
      data: post!,
      status: 201,
      msg: "Post Created",
    };
  }),
);

postRouter.put(
  "/update/:postId",
  authMiddleware,
  multerMemory({ fileType: fileTypes.images! }).array("attachments"),
  processFiles({ fileType: fileTypes.images! }),
  validator(updatePostSchema),
  respopnseFormatter(async (req: Request): Promise<IResponse<IPost>> => {
    const post = await postService.updatePost({
      user: req.user as HUser,
      postId: req.validate.params.postId,
      data: req.validate.body,
      files: req.validate.files,
    });
    return {
      data: post!,
      status: 200,
      msg: "Post Updated",
    };
  }),
);
