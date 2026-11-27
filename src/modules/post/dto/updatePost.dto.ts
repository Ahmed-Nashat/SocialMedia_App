import type z from "zod";
import { updatePostSchema } from "../index.js";
export type updatePostDTOBody = z.infer<
  ReturnType<typeof updatePostSchema>
>["body"];
export type updatePostDTOParams = z.infer<
  ReturnType<typeof updatePostSchema>
>["params"]["postId"];
