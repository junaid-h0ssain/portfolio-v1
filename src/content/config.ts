import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()),
    author: z.string().optional(),
    image: z.string().optional(),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    technologies: z.array(z.string()),
    repositoryUrl: z.string().url(),
    liveUrl: z.string().url().optional(),
    thumbnail: z.string(),
    featured: z.boolean().default(false),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
  }),
});

export const collections = { blog, projects };
