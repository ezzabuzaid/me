import avatarBase64 from '~/assets/avatar.jpeg?base64';
import { SITE_DESCRIPTION, SITE_TITLE } from '~/constants';

import type { APIContext } from 'astro';
import type { JSX } from 'preact/jsx-runtime';

interface OGHomeProps {
	context: APIContext;
}

export function OGHome(_props: OGHomeProps): JSX.Element {
	return (
		<div tw='flex h-full w-full flex-col justify-between border-blue-600 border-b-[3rem] bg-white p-8'>
			<div tw='flex h-full flex-col rounded-xl'>
				<div tw='m-8 flex w-full grow flex-col justify-end rounded-xl p-4 pr-8'>
					<img
						alt='Avatar of the author of the post'
						src={avatarBase64}
						tw='mb-8 h-48 w-48 rounded-full'
					/>

					<h1 tw='mb-0 font-bold text-7xl text-black'>{SITE_TITLE}</h1>

					<h2 tw='font-medium text-3xl text-zinc-400'>{SITE_DESCRIPTION}</h2>
				</div>
			</div>
		</div>
	);
}
