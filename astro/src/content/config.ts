import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Frontmatter i Hugo-content er ekstremt variabelt — title kan være tall,
// weight kan være streng, description kan være null. For MVP er schemaet
// derfor svært slapt; vi normaliserer til strings/numbers ved render-tid.
const docs = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/docs" }),
  schema: z
    .object({
      title: z.any().optional(),
      linktitle: z.any().optional(),
      description: z.any().optional(),
      weight: z.any().optional(),
      tags: z.any().optional(),
      toc: z.any().optional(),
      draft: z.any().optional(),
      hidden: z.any().optional(),
      alwaysopen: z.any().optional(),
      aliases: z.any().optional(),
      jumbotron: z.any().optional(),
      params: z.any().optional(),
      cascade: z.any().optional(),
      Pre: z.any().optional(),
      Post: z.any().optional(),
      pre: z.any().optional(),
      post: z.any().optional(),
      titleSup: z.any().optional(),
      breadcrumbText: z.any().optional(),
      SubTitle: z.any().optional(),
      disablepagefind: z.any().optional(),
      LastModifierDisplayName: z.any().optional(),
      LastModifierEmail: z.any().optional(),
      _source: z.string().optional(),
      _snapshot: z.string().optional(),
      _lang: z.string().optional(),
      _origPath: z.string().optional(),
      _mount: z.string().optional(),
      _editURL: z.string().optional(),
    })
    .passthrough(),
});

export const collections = { docs };
