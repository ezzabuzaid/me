/**
 * Site Constants
 *
 * Re-exports from the SEO configuration for backwards compatibility.
 * New code should import directly from ~/config/seo
 */

import { AUTHOR as AUTHOR_CONFIG, PAGE_SEO, SITE } from "~/config/seo";

// Re-export for backwards compatibility
export const SITE_TITLE = SITE.title;
export const SITE_DESCRIPTION = SITE.description;
export const SITE_URL = SITE.url;
export const SITE_AUTHOR = AUTHOR_CONFIG.name;
export const SITE_KEYWORDS = [
	"TypeScript",
	"JavaScript",
	"Angular",
	"React",
	"Node.js",
	"Software Engineering",
	"Web Development",
	"Programming",
	"Developer Tools",
	"Tech Blog",
];

export const AUTHOR = {
	name: AUTHOR_CONFIG.name,
	email: AUTHOR_CONFIG.email,
	url: AUTHOR_CONFIG.url,
	bio: AUTHOR_CONFIG.bio,
	location: AUTHOR_CONFIG.location,
	social: {
		twitter: AUTHOR_CONFIG.social.twitter.handle,
		github: AUTHOR_CONFIG.social.github.username,
		linkedin: AUTHOR_CONFIG.social.linkedin.username,
	},
};

export const HOME = {
	title: PAGE_SEO.home.title,
	subtitle: PAGE_SEO.home.description,
};

export const SEO = {
	defaultImage: "/og.png",
	defaultImageAlt: "Ezz's Blog - Empirical Engineer creating tools",
	twitterHandle: AUTHOR_CONFIG.social.twitter.handle,
	language: SITE.language,
	locale: SITE.locale,
	robots: "index, follow",
};

// Re-export new config for gradual migration
export { AUTHOR as AUTHOR_CONFIG, SITE, PAGE_SEO } from "~/config/seo";
