import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';

import { SITE_DESCRIPTION, SITE_TITLE } from '~/constants';
import { filterPosts } from '~/utils/content';

import type { RSSFeedItem } from '@astrojs/rss';
import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = async (context) => {
	const posts = await getCollection('posts', filterPosts({ archived: true }));

	const lastModifiedAtMap = new Map<string, string | null>();
	await Promise.all(
		posts.map(async (post) => {
			// We use a remark plugin to extract the `lastModified` field
			// which is generated based on the file system's last modified date.
			// As such we need to render the post to extract this field.
			const { remarkPluginFrontmatter } = await post.render();
			lastModifiedAtMap.set(
				post.slug,
				remarkPluginFrontmatter.lastModified ?? null,
			);
		}),
	);

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site as URL,
		items: posts
			.sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf())
			.map((post): RSSFeedItem => {
				const lastModifiedAt = lastModifiedAtMap.get(post.slug);

				return {
					// TODO: Remove once `@astrojs/rss` supports `lastBuildDate`
					customData: lastModifiedAt
						? `<lastBuildDate>${lastModifiedAt}</lastBuildDate>`
						: undefined,
					description: post.data.description,
					link: new URL(`/posts/${post.slug}`, context.site).href,
					pubDate: post.data.publishedAt,
					title: post.data.title,
				};
			}),
	});
};
