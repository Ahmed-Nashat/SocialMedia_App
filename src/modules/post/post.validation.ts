import z from "zod";
import { enums, generalFeilds } from "../../common/index.js";

export const createPopstSchema = (lang: enums.languageEnum) =>
  z.object({
    body: z
      .strictObject({
        content: z
          .string()
          .min(5)
          .max(5000, { error: "charaters must be less than 5000" })
          .optional(),
        tags: z.array(generalFeilds.id(lang)).optional(),
        availability: z
          .enum(enums.availabliityEnum)
          .default(enums.availabliityEnum.public),
      })
      .superRefine(({ tags }, ctx) => {
        if (tags?.length) {
          // set only accept unique tags
          const unique = new Set(tags);
          // check if there is a duplicated tags
          if (unique.size !== tags.length) {
            ctx.addIssue({
              path: ["body", "tags"],
              code: "custom",
              message: "tags must be uniqie",
            });
          }
        }
      }),
    files: z.array(generalFeilds.file(lang)).optional(),
  });

export const updatePostSchema = (lang: enums.languageEnum) =>
  z.object({
    body: z
      .strictObject({
        content: z.string().min(5).optional(),
        tags: z.array(generalFeilds.id(lang)).optional(),
        removeTags: z.array(z.string()).optional(),
        removeAttachments: z.array(z.string()).optional(),
        availability: z
          .enum(enums.availabliityEnum)
          .optional(),
      })
      .superRefine((data, ctx) => {
        if (data.tags?.length) {
          // set only accept unique tags
          const unique = new Set(data.tags);
          // check if there is a duplicated tags
          if (unique.size !== data.tags.length) {
            ctx.addIssue({
              path: ["body", "tags"],
              code: "custom",
              message: "tags must be uniqie",
            });
          }
        }
      }),
    files: z.array(generalFeilds.file(lang)).optional(),
    params: z.strictObject({
      postId: z.string(),
    }),
  });
