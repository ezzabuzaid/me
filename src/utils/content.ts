import type { CollectionEntry } from 'astro:content';

/**
 * Calculate word count from content
 */
export function calculateWordCount(content: string): number {
	return content.trim().split(/\s+/).length;
}

/**
 * Calculate reading time based on word count
 * Average reading speed is ~200-250 words per minute
 */
export function calculateReadingTime(content: string): number {
	const wordsPerMinute = 200;
	const words = calculateWordCount(content);
	return Math.max(1, Math.ceil(words / wordsPerMinute));
}

/**
 * Format reading time as a human-readable string
 */
export function formatReadingTime(minutes: number): string {
	return `${minutes} min read`;
}

interface FilterPostOptions {
	/**
	 * Whether to include archived posts
	 */
	archived: boolean;

	/**
	 * Whether to include draft posts
	 *
	 * @default import.meta.env.DEV
	 */
	draft?: boolean;
}

/**
 * Filter out any posts that are drafts or archived
 *
 * @param post - The post to filter
 *
 * @returns A function that returns true if the post should be included
 */
export function filterPosts(
	options: FilterPostOptions,
): (post: CollectionEntry<'posts'>) => boolean {
	const { archived, draft = import.meta.env.DEV } = options;

	return (post: CollectionEntry<'posts'>): boolean => {
		// Hide any drafts in production
		if (!draft && post.data.draft) return false;

		// Hide any archived posts
		if (!archived && post.data.archived) return false;

		return true;
	};
}

/**
 * Sort posts by their published date
 *
 * @param a - The first post
 * @param b - The second post
 *
 * @example
 * ```ts
 * posts.sort(sortPostsByPublishedAt);
 * ```
 *
 * @returns A negative number if `a` should come before `b`, a positive number if `b` should come before `a`, or 0 if they are equal
 */
export function sortPostsByPublishedAt(
	a: CollectionEntry<'posts'>,
	b: CollectionEntry<'posts'>,
): number {
	return b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf();
}

/**
 * Sort posts by `featured` ascending (lower appears first), with fallback to publishedAt desc
 */
export function sortPostsByFeatured(
	a: CollectionEntry<'posts'>,
	b: CollectionEntry<'posts'>,
): number {
	const fa = a.data.featured;
	const fb = b.data.featured;
	if (fa !== fb) return fa - fb;
	return sortPostsByPublishedAt(a, b);
}

/**
 * Remap a post to match the shape of a list component item
 *
 * @param post - The content collection post entry
 *
 * @returns The post remapped to a list item
 */
export function mapPostToListItem(
	post: CollectionEntry<'posts'>,
): CollectionEntry<'posts'>['data'] & { href: string } {
	return {
		...post.data,
		href: `/posts/${post.slug}`,
	};
}
