import { SITE_DESCRIPTION, SITE_TITLE } from '~/constants';

import type { APIRoute } from 'astro';
import type { Webmanifest } from 'astro-webmanifest';

export const prerender = true;

export const GET: APIRoute = () =>
	Response.json({
		background_color: '#ffffff',
		description: SITE_DESCRIPTION,
		display: 'standalone',
		lang: 'en',
		name: `${SITE_TITLE} ─ welcome`,
		short_name: SITE_TITLE,
		start_url: '/',
		theme_color: '#ffffff',
	} satisfies Webmanifest);
