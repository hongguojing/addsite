import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      excerpt: z.string(),
      keyPoint: z.string().optional(),
      date: z.coerce.date(),
      section: z.enum(["science", "practice", "belike"]),
      track: z.enum(["understand", "assessment", "treatment", "life"]).optional(),
      cover: image().optional(),
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
