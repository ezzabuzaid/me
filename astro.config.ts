import { defineConfig, envField } from "astro/config";

// Astro Integrations
import mdx from "@astrojs/mdx";
import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import robotsTxt from "astro-robots-txt";

// Vite Plugins
import tailwind from "@tailwindcss/vite";
import { base64 } from "vite-plugin-base64";

// biome-ignore lint/nursery/useImportRestrictions: Astro cannot read the local `tsconfig.json` to resolve import path aliases
import { rehypePlugins, remarkPlugins } from "./src/utils/markdown.ts";

import vercel from "@astrojs/vercel";

function getSite(): string {
	// When deploying to Cloudflare Pages use the URL provided by the environment
	// biome-ignore lint/nursery/noProcessEnv: Cloudflare exposes this environment variable under `process.env`, not `import.meta.env`
	const { CF_PAGES_BRANCH, CF_PAGES_URL } = process.env;
	if (CF_PAGES_URL && CF_PAGES_BRANCH !== "main") return CF_PAGES_URL;

	// If a `SITE` environment variable is already set, use that
	if (import.meta.env.SITE) return import.meta.env.SITE;

	// When developing locally, use the default localhost URL
	if (import.meta.env.DEV) return "http://localhost:4321";

	// biome-ignore lint/suspicious/noConsole: Build warnings require logging to the console
	console.warn(
		"No `SITE` environment variable set. Using `https://ezz.sh` as the default",
	);
	return "https://ezz.sh";
}
const site = getSite();

// =============================================================================
// SITEMAP CONFIGURATION
// =============================================================================

/**
 * Filter function to exclude certain pages from sitemap
 */
function sitemapFilter(page: string): boolean {
	// Exclude OG image endpoints
	if (page.includes("/og.png")) return false;

	// Exclude API routes
	if (page.includes("/api/")) return false;

	// Exclude internal pages
	if (page.includes("/_")) return false;

	return true;
}

/**
 * Custom serializer to add priority and changefreq based on page type
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function sitemapSerialize(item: { url: string; lastmod?: string }): any {
	const url = item.url;

	// Homepage - highest priority
	if (url === site || url === `${site}/`) {
		return {
			...item,
			priority: 1.0,
			changefreq: "weekly" as const,
		};
	}

	// Blog index - high priority, changes frequently
	if (url === `${site}/posts` || url === `${site}/posts/`) {
		return {
			...item,
			priority: 0.9,
			changefreq: "daily" as const,
		};
	}

	// Individual blog posts
	if (url.includes("/posts/") && !url.endsWith("/posts/")) {
		return {
			...item,
			priority: 0.8,
			changefreq: "monthly" as const,
		};
	}

	// Tag pages - programmatic SEO
	if (url.includes("/tags/")) {
		return {
			...item,
			priority: 0.7,
			changefreq: "weekly" as const,
		};
	}

	// Projects page
	if (url.includes("/projects")) {
		return {
			...item,
			priority: 0.6,
			changefreq: "monthly" as const,
		};
	}

	// Default for other pages
	return {
		...item,
		priority: 0.5,
		changefreq: "monthly" as const,
	};
}

// https://astro.build/config
export default defineConfig({
	adapter: vercel(),
	env: {
		schema: {
			DISCORD_USER_ID: envField.string({
				access: "public",
				context: "client",
				optional: true,
			}),
		},
	},

	integrations: [
		icon(),
		mdx(),
		preact(),
		robotsTxt({
			sitemap: new URL("/sitemap-index.xml", site).href,
		}),
		sitemap({
			filter: sitemapFilter,
			serialize: sitemapSerialize,
			// Customize sitemap generation
			customPages: [
				// Ensure important pages are included
				`${site}/`,
				`${site}/posts`,
				`${site}/projects`,
				`${site}/tags`,
			],
		}),
	],

	markdown: {
		rehypePlugins,
		remarkPlugins,
		// Note: We disable syntax highlighting here because we're using `rehype-pretty-code` instead
		syntaxHighlight: false,
	},

	output: "static",
	site,

	vite: {
		plugins: [base64() as any, tailwind() as any] as any,
		ssr: {
			// Note: These dependencies are only required for builds to work as
			// they are used to generate OpenGraph images.
			external: ["@resvg/resvg-js", "node:fs", "node:path"],
		},
	},
});
