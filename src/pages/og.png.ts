import { OGHome } from '~/components/OpenGraph/Home';
import { ImageResponse } from '~/utils/satori';

import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = async (context) => {
	const { params } = context;

	const width = params.width ? Number.parseInt(params.width) : 1200;
	const height = params.height ? Number.parseInt(params.height) : 630;

	return await ImageResponse(OGHome({ context }), {
		width,
		height,
	});
};
