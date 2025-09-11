import { readFileSync } from 'node:fs';
import path from 'node:path';

import { Resvg } from '@resvg/resvg-js';
import satori from 'satori';

import type { ResvgRenderOptions } from '@resvg/resvg-js';
import type { JSX } from 'preact/jsx-runtime';
import type { SatoriOptions } from 'satori';

type Weight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

type FontStyle = 'normal' | 'italic';

interface FontOptions {
	data: Buffer | ArrayBuffer;
	name: string;
	weight?: Weight;
	style?: FontStyle;
	lang?: string;
}

// Note: We have provided local TTF fonts here because WOFF2 fonts
// are not supported by Vercel's OG Image API yet & the `@fontsource/inter`
// package we use for the fonts actually loaded on the site does not
// provide TTF fonts.
const FONTS = [
	{ weight: 100, path: './src/assets/fonts/Inter-Thin.ttf' },
	{ weight: 200, path: './src/assets/fonts/Inter-ExtraLight.ttf' },
	{ weight: 300, path: './src/assets/fonts/Inter-Light.ttf' },
	{ weight: 400, path: './src/assets/fonts/Inter-Regular.ttf' },
	{ weight: 500, path: './src/assets/fonts/Inter-Medium.ttf' },
	{ weight: 600, path: './src/assets/fonts/Inter-SemiBold.ttf' },
	{ weight: 700, path: './src/assets/fonts/Inter-Bold.ttf' },
	{ weight: 800, path: './src/assets/fonts/Inter-ExtraBold.ttf' },
	{ weight: 900, path: './src/assets/fonts/Inter-Black.ttf' },
] as const;

interface ImageResponseOptions {
	/**
	 * Display debug information on the image.
	 *
	 * @default false
	 */
	debug?: boolean;

	/**
	 * A list of fonts to use.
	 *
	 * @default Noto Sans Latin Regular.
	 */
	fonts?: SatoriOptions['fonts'];

	/**
	 * The height of the image.
	 *
	 * @default 630
	 */
	height?: number;

	/**
	 * The width of the image.
	 *
	 * @default 1200
	 */
	width?: number;
}

/**
 * Convert a provided JSX component to a PNG image using Satori.
 *
 * This function is a re-implementation of the `@vercel/og` library
 * with a number of modifications to make it work with Astro + Cloudflare.
 *
 * @see https://www.npmjs.com/package/@vercel/og
 * @see https://github.com/florian-lefebvre/satori-astro/tree/main
 * @see https://www.kozhuhds.com/blog/generating-static-open-graph-og-images-in-astro-using-vercel-og/
 * @see https://www.knaap.dev/posts/dynamic-og-images-with-any-static-site-generator/
 * @see https://blog.otterlord.dev/posts/dynamic-opengraph/
 *
 * @param element - The JSX element to render.
 * @param options - The options to use when rendering the image.
 *
 * @example
 * ```ts
 * export const GET = async (context) => {
 * 	return await ImageResponse(<div><h1>Hello World</h1></div>, {
 * 		height: 630,
 * 		width: 1200,
 * 	})
 * };
 * ```
 *
 * @returns A `Response` containing the rendered image.
 */
export async function ImageResponse(
	element: JSX.Element,
	options: ImageResponseOptions = {},
): Promise<Response> {
	const {
		fonts = FONTS.map(
			(font): FontOptions => ({
				name: 'Inter',
				data: readFileSync(path.resolve(process.cwd(), font.path)),
				style: 'normal',
				weight: font.weight,
			}),
		),
		height = 630,
		width = 1200,
		...rest
	} = options;

	const svg = await satori(element, {
		fonts,
		height,
		width,
		...rest,
	});

	const resvgOptions = {
		fitTo: {
			mode: 'width',
			value: width,
		},
	} satisfies ResvgRenderOptions;
	const image = new Resvg(svg, resvgOptions).render().asPng();

	const cacheControl = import.meta.env.DEV
		? 'no-cache, no-store'
		: ['public', 'immutable', 'no-transform', 'max-age=31536000'].join(', ');

	return new Response(image, {
		headers: {
			'Content-Type': 'image/png',
			'Cache-Control': cacheControl,
		},
	});
}
