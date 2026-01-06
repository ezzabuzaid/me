import { defineCollection, z } from "astro:content";
// biome-ignore lint/style/noNamespaceImport: This only affects SSG so this is fine to use here.
import * as Icons from "lucide-preact";

const IconKeys = Object.keys(Icons) as [string, ...Array<string>];

// =============================================================================
// VALIDATION HELPERS
// =============================================================================

/**
 * Description validation - requires at least 50 characters
 * SEO best practice is 120-160 chars, but we allow shorter for flexibility
 */
const seoDescription = z
	.string()
	.min(50, "Description must be at least 50 characters for SEO");

/**
 * Title validation - just ensure it's not empty
 * SEO best practice is max 60 chars, but we don't enforce strictly
 */
const seoTitle = z.string().min(1, "Title is required");

// =============================================================================
// COLLECTIONS
// =============================================================================

const posts = defineCollection({
	type: "content",
	schema: z
		.object({
			/** Whether the post is archived (hidden from main listings) */
			archived: z.boolean().optional().default(false),

			/** SEO-optimized description (120-160 characters recommended) */
			description: seoDescription,

			/** Whether the post is a draft (hidden in production) */
			draft: z.boolean().optional().default(false),

			/** Featured priority (lower = more prominent) */
			featured: z.number(),

			/** Icon from lucide-preact */
			icon: z.enum(IconKeys).default("Newspaper"),

			/** Last modified date (auto-calculated from file mtime if not set) */
			lastModifiedAt: z.coerce.date().optional(),

			/** Publication date */
			publishedAt: z.coerce.date(),

			/** Tags for categorization and internal linking */
			tags: z.array(z.string()).optional().default([]),

			/** SEO-optimized title (max 60 characters recommended) */
			title: seoTitle,

			/** Optional canonical URL for cross-posted content */
			canonicalUrl: z.string().url().optional(),

			/** Optional featured image for social sharing */
			image: z.string().optional(),
		})
		.strict(),
});

const projects = defineCollection({
	type: "data",
	schema: z
		.object({
			$schema: z.string().optional(),
			date: z.coerce.date(),
			icon: z.enum(IconKeys),
			title: z.string(),
			description: z.string().optional(),
			url: z.string().optional(),
			status: z
				.enum(["idea", "development", "maintenance", "production", "archived"])
				.optional(),
		})
		.strict(),
});

const socialLinks = defineCollection({
	type: "data",
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
