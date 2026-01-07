import { getCollection } from "astro:content";
import { extractAllTags, generateTagSlug } from "./seo";

export interface SearchItem {
	id: string;
	title: string;
	url: string;
	type: "page" | "post" | "tag";
	excerpt?: string;
	featured?: number;
	isFeatured?: boolean;
}

export async function getSearchData(): Promise<SearchItem[]> {
	const items: SearchItem[] = [];

	// Static pages
	items.push(
		{
			id: "home",
			title: "Home",
			url: "/",
			type: "page",
			excerpt: "Welcome to my personal website",
		},
		{
			id: "posts",
			title: "Posts",
			url: "/posts",
			type: "page",
			excerpt: "Browse all blog posts and articles",
		},
		{
			id: "tags",
			title: "Topics",
			url: "/tags",
			type: "page",
			excerpt: "Browse articles by topic",
		},
		{
			id: "projects",
			title: "Projects",
			url: "/projects",
			type: "page",
			excerpt: "View my latest projects and work",
		},
		{
			id: "internet",
			title: "Internet",
			url: "/internet",
			type: "page",
			excerpt: "Social links and online presence",
		},
	);

	try {
		// Get all posts
		const posts = await getCollection("posts");

		// Sort posts by featured value (lower is more featured)
		const sortedPosts = posts.sort(
			(a, b) => a.data.featured - b.data.featured,
		);

		sortedPosts.forEach((post, index) => {
			items.push({
				id: post.slug,
				title: post.data.title,
				url: `/posts/${post.slug}`,
				type: "post",
				excerpt: post.data.description || "",
				featured: post.data.featured,
				isFeatured: index < 5, // Top 5 posts are considered featured
			});
		});

		// Extract unique tags and add them as searchable items
		const tagCounts = extractAllTags(posts);
		for (const [tag, count] of tagCounts.entries()) {
			const displayName =
				posts
					.flatMap((p) => p.data.tags || [])
					.find((t) => t.toLowerCase() === tag) || tag;

			items.push({
				id: `tag-${generateTagSlug(tag)}`,
				title: displayName,
				url: `/tags/${generateTagSlug(tag)}`,
				type: "tag",
				excerpt: `${count} article${count === 1 ? "" : "s"} about ${displayName}`,
			});
		}
	} catch (error) {
		console.warn("Could not load posts for search:", error);
	}

	try {
		// Get all projects if they exist
		const projects = await getCollection("projects");

		projects.forEach((project) => {
			items.push({
				id: project.id,
				title: project.data.title,
				url: project.data.url || `/projects`,
				type: "page",
				excerpt: project.data.description || "",
			});
		});
	} catch (error) {
		// Projects collection might not exist, that's okay
	}

	return items;
}
