/**
 * SEO Utilities
 *
 * Helper functions for generating SEO metadata, structured data,
 * and handling meta tags.
 */

import type { CollectionEntry } from "astro:content";
import { AUTHOR, SEO_DEFAULTS, SITE } from "~/config/seo";

// =============================================================================
// METADATA GENERATION
// =============================================================================

export interface PageMetadata {
	title: string;
	description: string;
	canonicalUrl: string;
	ogImage?: string;
	ogImageAlt?: string;
	type?: "website" | "article" | "blog";
	publishedAt?: string;
	modifiedAt?: string;
	keywords?: string[];
	robots?: string;
	noindex?: boolean;
}

/**
 * Generate full page title with site name suffix
 */
export function generatePageTitle(title: string, includeSiteName = true): string {
	if (title === SITE.title || !includeSiteName) {
		return title;
	}
	return `${title} | ${SITE.title}`;
}

/**
 * Truncate text to a maximum length, adding ellipsis if needed
 */
export function truncateText(text: string, maxLength: number): string {
	if (text.length <= maxLength) return text;
	return `${text.slice(0, maxLength - 3).trim()}...`;
}

/**
 * Validate and optimize meta description
 * Returns warnings if the description is outside recommended bounds
 */
export function validateDescription(description: string): {
	isValid: boolean;
	optimized: string;
	warnings: string[];
} {
	const { descriptionMinLength, descriptionMaxLength } = SEO_DEFAULTS.limits;

	const warnings: string[] = [];
	let optimized = description.trim();

	if (optimized.length < descriptionMinLength) {
		warnings.push(
			`Description is too short (${optimized.length} chars). Minimum recommended: ${descriptionMinLength}`,
		);
	}

	if (optimized.length > descriptionMaxLength) {
		warnings.push(
			`Description is too long (${optimized.length} chars). Maximum recommended: ${descriptionMaxLength}`,
		);
		optimized = truncateText(optimized, descriptionMaxLength);
	}

	return {
		isValid: warnings.length === 0,
		optimized,
		warnings,
	};
}

/**
 * Generate canonical URL from path
 */
export function generateCanonicalUrl(path: string, baseUrl = SITE.url): string {
	// Ensure path starts with /
	const normalizedPath = path.startsWith("/") ? path : `/${path}`;
	// Remove trailing slash except for root
	const cleanPath =
		normalizedPath === "/" ? normalizedPath : normalizedPath.replace(/\/$/, "");
	return `${baseUrl}${cleanPath}`;
}

/**
 * Generate OG image URL for a page
 */
export function generateOgImageUrl(path: string, baseUrl = SITE.url): string {
	// For posts, generate dynamic OG image path
	if (path.startsWith("/posts/") && path !== "/posts/") {
		return `${baseUrl}${path}/og.png`.replace(/\/\//g, "/").replace(":/", "://");
	}
	return `${baseUrl}${SEO_DEFAULTS.defaultImage}`;
}

// =============================================================================
// STRUCTURED DATA GENERATORS
// =============================================================================

export interface BreadcrumbItem {
	name: string;
	url: string;
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbSchema(
	items: BreadcrumbItem[],
): Record<string, unknown> {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.name,
			item: item.url,
		})),
	};
}

/**
 * Generate WebSite structured data with search action
 */
export function generateWebsiteSchema(): Record<string, unknown> {
	return {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: SITE.name,
		description: SITE.description,
		url: SITE.url,
		inLanguage: SITE.language,
		author: generatePersonSchema(),
		publisher: generatePersonSchema(),
		potentialAction: {
			"@type": "SearchAction",
			target: {
				"@type": "EntryPoint",
				urlTemplate: `${SITE.url}/posts?q={search_term_string}`,
			},
			"query-input": "required name=search_term_string",
		},
	};
}

/**
 * Generate Person structured data for the author
 */
export function generatePersonSchema(): Record<string, unknown> {
	return {
		"@context": "https://schema.org",
		"@type": "Person",
		name: AUTHOR.name,
		url: AUTHOR.url,
		email: AUTHOR.email,
		description: AUTHOR.bio,
		jobTitle: AUTHOR.jobTitle,
		image: `${SITE.url}${AUTHOR.image}`,
		sameAs: [
			AUTHOR.social.github.url,
			AUTHOR.social.twitter.url,
			AUTHOR.social.linkedin.url,
		],
		knowsAbout: [
			"TypeScript",
			"JavaScript",
			"Angular",
			"React",
			"Node.js",
			"RxJS",
			"Software Engineering",
			"Web Development",
		],
	};
}

/**
 * Generate Blog structured data
 */
export function generateBlogSchema(): Record<string, unknown> {
	return {
		"@context": "https://schema.org",
		"@type": "Blog",
		name: `${SITE.name} - Blog`,
		description:
			"Technical articles on TypeScript, Angular, React, Node.js, and modern web development.",
		url: `${SITE.url}/posts`,
		inLanguage: SITE.language,
		author: generatePersonSchema(),
		publisher: generatePersonSchema(),
	};
}

export interface ArticleSchemaInput {
	title: string;
	description: string;
	slug: string;
	publishedAt: Date;
	modifiedAt?: Date;
	tags?: string[];
	wordCount?: number;
	image?: string;
}

/**
 * Generate BlogPosting structured data for articles
 */
export function generateArticleSchema(
	article: ArticleSchemaInput,
): Record<string, unknown> {
	const url = `${SITE.url}/posts/${article.slug}`;
	const imageUrl = article.image || `${url}/og.png`;

	return {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: article.title,
		description: article.description,
		url,
		datePublished: article.publishedAt.toISOString(),
		dateModified: (article.modifiedAt || article.publishedAt).toISOString(),
		author: {
			"@type": "Person",
			name: AUTHOR.name,
			url: AUTHOR.url,
		},
		publisher: {
			"@type": "Person",
			name: AUTHOR.name,
			url: AUTHOR.url,
			logo: {
				"@type": "ImageObject",
				url: `${SITE.url}/favicon.svg`,
			},
		},
		image: {
			"@type": "ImageObject",
			url: imageUrl,
			width: SEO_DEFAULTS.defaultImageWidth,
			height: SEO_DEFAULTS.defaultImageHeight,
		},
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": url,
		},
		keywords: article.tags?.join(", ") || "",
		wordCount: article.wordCount || 0,
		inLanguage: SITE.language,
		isPartOf: {
			"@type": "Blog",
			"@id": `${SITE.url}/posts`,
			name: `${SITE.name} - Blog`,
		},
	};
}

/**
 * Generate CollectionPage structured data for tag/category pages
 */
export function generateCollectionPageSchema(options: {
	name: string;
	description: string;
	url: string;
	itemCount: number;
}): Record<string, unknown> {
	return {
		"@context": "https://schema.org",
		"@type": "CollectionPage",
		name: options.name,
		description: options.description,
		url: options.url,
		numberOfItems: options.itemCount,
		inLanguage: SITE.language,
		isPartOf: {
			"@type": "WebSite",
			"@id": SITE.url,
			name: SITE.name,
		},
		author: generatePersonSchema(),
	};
}

// =============================================================================
// CONTENT UTILITIES
// =============================================================================

/**
 * Extract unique tags from all posts
 */
export function extractAllTags(
	posts: CollectionEntry<"posts">[],
): Map<string, number> {
	const tagCounts = new Map<string, number>();

	for (const post of posts) {
		const tags = post.data.tags || [];
		for (const tag of tags) {
			const normalizedTag = tag.toLowerCase();
			tagCounts.set(normalizedTag, (tagCounts.get(normalizedTag) || 0) + 1);
		}
	}

	return tagCounts;
}

/**
 * Generate tag slug from tag name
 */
export function generateTagSlug(tag: string): string {
	return tag
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");
}

/**
 * Find related posts based on shared tags
 */
export function findRelatedPosts(
	currentPost: CollectionEntry<"posts">,
	allPosts: CollectionEntry<"posts">[],
	limit = 3,
): CollectionEntry<"posts">[] {
	const currentTags = new Set(
		(currentPost.data.tags || []).map((t) => t.toLowerCase()),
	);

	if (currentTags.size === 0) {
		// If no tags, return recent posts excluding current
		return allPosts
			.filter((p) => p.slug !== currentPost.slug)
			.sort(
				(a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf(),
			)
			.slice(0, limit);
	}

	// Score posts by number of shared tags
	const scored = allPosts
		.filter((p) => p.slug !== currentPost.slug)
		.map((post) => {
			const postTags = new Set(
				(post.data.tags || []).map((t) => t.toLowerCase()),
			);
			let score = 0;
			for (const tag of currentTags) {
				if (postTags.has(tag)) score++;
			}
			return { post, score };
		})
		.filter((item) => item.score > 0)
		.sort((a, b) => {
			// Sort by score first, then by date
			if (b.score !== a.score) return b.score - a.score;
			return (
				b.post.data.publishedAt.valueOf() - a.post.data.publishedAt.valueOf()
			);
		});

	return scored.slice(0, limit).map((item) => item.post);
}

/**
 * Generate internal linking suggestions based on content
 */
export function generateInternalLinkSuggestions(
	posts: CollectionEntry<"posts">[],
): Map<string, CollectionEntry<"posts">[]> {
	const linkMap = new Map<string, CollectionEntry<"posts">[]>();

	for (const post of posts) {
		linkMap.set(post.slug, findRelatedPosts(post, posts, 5));
	}

	return linkMap;
}
