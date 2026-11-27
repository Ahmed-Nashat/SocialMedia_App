import z from "zod";
import { enums, generalFeilds } from "../../common/index.js";

export const addLikeSchema = (lang: enums.languageEnum) =>
  z.object({
    params: z.strictObject({
      postId: generalFeilds.id(lang),
    }),
  });
