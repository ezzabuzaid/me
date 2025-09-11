import { defineCollection, z } from 'astro:content';
// biome-ignore lint/style/noNamespaceImport: This only affects SSG so this is fine to use here.
import * as Icons from 'lucide-preact';

const IconKeys = Object.keys(Icons) as [string, ...Array<string>];


const posts = defineCollection({
	type: 'content',
	schema: z
		.object({
			archived: z.boolean().optional().default(false),
			description: z.string(),
			draft: z.boolean().optional().default(false),
			icon: z.enum(IconKeys).default('Newspaper'),
			lastModifiedAt: z.coerce.date().optional(),
			publishedAt: z.coerce.date(),
			title: z.string(),
		})
		.strict(),
});

const projects = defineCollection({
	type: 'data',
	schema: z
		.object({
			$schema: z.string().optional(),
			date: z.coerce.date(),
			icon: z.enum(IconKeys),
			title: z.string(),
			url: z.string().optional(),
			status: z.enum(['idea', 'development', 'maintenance', 'archived']).optional(),
		})
		.strict(),
});

const socialLinks = defineCollection({
	type: 'data',
	schema: z
		.object({
			$schema: z.string().optional(),
			icon: z.string(),
			name: z.string(),
			showLabel: z.coerce.boolean().optional().default(false),
			url: z.string().url(),
		})
		.strict(),
});

export const collections = {
	posts,
	projects,
	socialLinks,
};
