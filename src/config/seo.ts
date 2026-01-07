/**
 * SEO Configuration
 *
 * Centralized SEO configuration for the entire site.
 * This file contains all SEO-related constants, metadata defaults,
 * and structured data configuration.
 */

// =============================================================================
// SITE METADATA
// =============================================================================

export const SITE = {
	name: "Ezz's Blog",
	title: "Ezz's Blog",
	description:
		"Technical blog by Ezz Abuzaid covering TypeScript, Angular, React, Node.js, RxJS, and modern web development. In-depth tutorials, code examples, and best practices for software engineers.",
	url: "https://ezz.sh",
	language: "en",
	locale: "en_US",
	themeColor: "#050505",
	colorScheme: "dark" as const,
} as const;

// =============================================================================
// AUTHOR METADATA
// =============================================================================

export const AUTHOR = {
	name: "Ezz Abuzaid",
	firstName: "Ezz",
	lastName: "Abuzaid",
	email: "ezzabuzaid@gmail.com",
	url: "https://ezz.sh",
	bio: "Software engineer passionate about TypeScript, Angular, React, and building developer tools. Sharing practical web development knowledge through code.",
	location: "Earth",
	jobTitle: "Software Engineer",
	image: "/avatar.png",
	social: {
		twitter: {
			handle: "@ezzabuzaid",
			url: "https://twitter.com/ezzabuzaid",
		},
		github: {
			username: "ezzabuzaid",
			url: "https://github.com/ezzabuzaid",
		},
		linkedin: {
			username: "ezzabuzaid",
			url: "https://linkedin.com/in/ezzabuzaid",
		},
	},
} as const;

// =============================================================================
// SEO DEFAULTS
// =============================================================================

export const SEO_DEFAULTS = {
	/** Default OG image for pages without a specific image */
	defaultImage: "/og.png",
	defaultImageAlt: "Ezz's Blog - Empirical Engineer creating tools",
	defaultImageWidth: 1200,
	defaultImageHeight: 630,

	/** Twitter card configuration */
	twitter: {
		card: "summary_large_image" as const,
		site: "@ezzabuzaid",
		creator: "@ezzabuzaid",
	},

	/** Default robots directive */
	robots: "index, follow",

	/** Maximum recommended lengths for SEO */
	limits: {
		titleMaxLength: 60,
		descriptionMinLength: 120,
		descriptionMaxLength: 160,
		descriptionIdealLength: 155,
	},
} as const;

// =============================================================================
// KEYWORDS & TOPICS
// =============================================================================

export const SITE_KEYWORDS = [
	"TypeScript",
	"JavaScript",
	"Angular",
	"React",
	"Node.js",
	"RxJS",
	"Software Engineering",
	"Web Development",
	"Programming",
	"Developer Tools",
	"Tech Blog",
	"Frontend Development",
	"Backend Development",
] as const;

/**
 * Topic categories for content organization
 * Used for programmatic SEO and internal linking
 */
export const TOPICS = {
	typescript: {
		name: "TypeScript",
		slug: "typescript",
		description:
			"Learn TypeScript with practical tutorials, type system deep dives, and real-world examples.",
		keywords: ["TypeScript", "Types", "Type Safety", "JavaScript"],
	},
	angular: {
		name: "Angular",
		slug: "angular",
		description:
			"Angular tutorials and best practices for building scalable web applications.",
		keywords: ["Angular", "RxJS", "NgRx", "Angular CLI"],
	},
	react: {
		name: "React",
		slug: "react",
		description:
			"React guides covering hooks, state management, performance optimization, and component patterns.",
		keywords: ["React", "React Hooks", "State Management", "JSX"],
	},
	nodejs: {
		name: "Node.js",
		slug: "nodejs",
		description:
			"Node.js tutorials for backend development, APIs, and server-side JavaScript.",
		keywords: ["Node.js", "Express", "API", "Backend"],
	},
	rxjs: {
		name: "RxJS",
		slug: "rxjs",
		description:
			"RxJS tutorials covering reactive programming, operators, and real-world patterns.",
		keywords: ["RxJS", "Observables", "Reactive Programming", "Operators"],
	},
	"developer-tools": {
		name: "Developer Tools",
		slug: "developer-tools",
		description:
			"Build and use developer tools to improve your workflow and productivity.",
		keywords: ["Developer Tools", "CLI", "Automation", "Tooling"],
	},
} as const;

// =============================================================================
// STRUCTURED DATA CONFIGURATION
// =============================================================================

export const STRUCTURED_DATA = {
	/** Organization/Publisher information */
	organization: {
		"@type": "Organization" as const,
		name: SITE.name,
		url: SITE.url,
		logo: {
			"@type": "ImageObject" as const,
			url: `${SITE.url}/favicon.svg`,
			width: 512,
			height: 512,
		},
		sameAs: [
			AUTHOR.social.github.url,
			AUTHOR.social.twitter.url,
			AUTHOR.social.linkedin.url,
		],
	},

	/** Default breadcrumb home item */
	breadcrumbHome: {
		name: "Home",
		url: SITE.url,
	},
} as const;

// =============================================================================
// SITEMAP CONFIGURATION
// =============================================================================

export const SITEMAP_CONFIG = {
	/** Priority values for different page types */
	priorities: {
		home: 1.0,
		blog: 0.9,
		post: 0.8,
		tag: 0.7,
		project: 0.6,
		page: 0.5,
	},

	/** Change frequency for different page types */
	changefreq: {
		home: "weekly" as const,
		blog: "daily" as const,
		post: "monthly" as const,
		tag: "weekly" as const,
		project: "monthly" as const,
		page: "monthly" as const,
	},
} as const;

// =============================================================================
// PAGE-SPECIFIC SEO CONFIGURATION
// =============================================================================

export const PAGE_SEO = {
	home: {
		title: SITE.title,
		description: SITE.description,
		type: "website" as const,
	},
	blog: {
		title: "Blog Posts",
		description:
			"Articles on TypeScript, Angular, React, RxJS, Node.js, and web development. Practical tutorials, code examples, and software engineering insights by Ezz Abuzaid.",
		type: "blog" as const,
	},
	projects: {
		title: "Projects",
		description:
			"Open source projects and tools built by Ezz Abuzaid. Developer utilities, libraries, and applications.",
		type: "website" as const,
	},
	tags: {
		title: "Topics",
		description:
			"Browse articles by topic. Find tutorials and guides on TypeScript, Angular, React, Node.js, and more.",
		type: "website" as const,
	},
} as const;

// =============================================================================
// UTILITY TYPES
// =============================================================================

export type SiteConfig = typeof SITE;
export type AuthorConfig = typeof AUTHOR;
export type SEODefaults = typeof SEO_DEFAULTS;
export type Topic = (typeof TOPICS)[keyof typeof TOPICS];
export type PageSEO = (typeof PAGE_SEO)[keyof typeof PAGE_SEO];
