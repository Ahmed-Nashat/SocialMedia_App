import type z from "zod";
import { addLikeSchema } from "../index.js";
export type addLikeDTO = z.infer<
  ReturnType<typeof addLikeSchema>
>["params"]["postId"];
