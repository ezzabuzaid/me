import { statSync } from 'node:fs';

import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
import rehypeAutolinkHeadingsPlugin from 'rehype-autolink-headings';
import rehypeExternalLinksPlugin from 'rehype-external-links';
import rehypePrettyCodePlugin from 'rehype-pretty-code';
import rehypeSlugPlugin from 'rehype-slug';

import type { RehypePlugins, RemarkPlugins } from 'astro';

import type { Options as RehypeAutolinkHeadingsOptions } from 'rehype-autolink-headings';
import type { Options as RehypeExternalLinksOptions } from 'rehype-external-links';
import type { Options as RehypePrettyCodeOptions } from 'rehype-pretty-code';

// Note: Ordering of plugins DOES matter
export const rehypePlugins: RehypePlugins = [
	// Add slug to headings
	rehypeSlugPlugin,

	// Add anchor links to headings
	[
		rehypeAutolinkHeadingsPlugin,
		{ behavior: 'prepend' } satisfies RehypeAutolinkHeadingsOptions,
	],

	// Add syntax highlighting to code blocks
	[
		rehypePrettyCodePlugin,
		{
			theme: {
				dark: 'github-dark',
				light: 'github-light',
			},
		} satisfies RehypePrettyCodeOptions,
	],

	// Add aria labels to emojis
	// @ts-expect-error The types for this plugin are old & out of date
	rehypeAccessibleEmojis,

	// Open external links in new tab
	[
		rehypeExternalLinksPlugin,
		{
			target: '_blank',
			rel: ['noopener', 'noreferrer'],
		} satisfies RehypeExternalLinksOptions,
	],
];

export const remarkPlugins: RemarkPlugins = [
	// Get the last modified time of a file
	// https://docs.astro.build/en/recipes/modified-time/
	() =>
		(_tree, file): void => {
			const filePath = file.history[0];
			if (!filePath) return;

			const fileStat = statSync(filePath);

			Object.assign(file.data.astro as object, {
				frontmatter: {
					lastModified: fileStat.mtime.toISOString(),
				},
			});
		},
];
