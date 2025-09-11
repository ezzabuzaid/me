import { Music as MusicIcon } from 'lucide-preact';

import { Card } from '~/components/Widgets/Lanyard/Card.tsx';
import { Inactive } from '~/components/Widgets/Lanyard/Inactive.tsx';
import { useLanyard } from '~/hooks/lanyard';

import type { JSX } from 'astro/jsx-runtime';

import type { LanyardData } from '~/types/lanyard';

interface MusicProps {
	discordUserId: string;
	initial: LanyardData | null;
}

export function Music({ discordUserId, initial }: MusicProps): JSX.Element {
	const { status } = useLanyard(discordUserId, { initial });

	if (!status || status?.discord_status === 'offline' || !status?.spotify)
		return (
			<Inactive
				title='Music'
				id='music'
				icon={MusicIcon}
				heading='Nothing right now'
				subHeading="I'm not currently listening to any music"
			/>
		);

	return (
		<Card
			title='Music'
			id='music'>
			<div class='flex h-full w-full items-center px-2 pt-6 pb-2'>
				<a
					class='default-transition default-focus flex w-full items-center justify-between space-x-3 rounded-md'
					href={`https://open.spotify.com/track/${status.spotify.track_id}`}
					rel='noreferrer'
					target='_blank'
					title={`${status.spotify.song} - ${status.spotify.artist}`}>
					<img
						alt={`${status.spotify.album} album artwork`}
						class='h-16 w-16 rounded-md'
						src={status.spotify.album_art_url}
					/>

					<div class='flex grow flex-col truncate'>
						<h1 class='line-clamp-1 font-bold text-gray-600 text-lg dark:text-white'>
							{status.spotify.song}
						</h1>
						<h2 class='line-clamp-1 font-normal text-gray-400 text-sm dark:text-gray-600'>
							{status.spotify.artist}
						</h2>
					</div>
				</a>
			</div>
		</Card>
	);
}
