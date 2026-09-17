import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      excerpt: z.string(),
      date: z.coerce.date(),
      // track 是主字段，决定文章归入哪个栏目（见 lib/taxonomy.ts）。
      track: z.enum(["understand", "assessment", "treatment", "life"]).optional(),
      cover: image().optional(),
      // 以下字段为历史文章保留：新文章模板已不再生成，站点也未使用。
      section: z.enum(["science", "practice", "belike"]).optional(),
      keyPoint: z.string().optional(),
      readMinutes: z.number().int().positive().optional(),
      views: z.coerce.string().optional(),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
      order: z.number().optional(),
    }),
});

export const collections = {
  posts,
};
