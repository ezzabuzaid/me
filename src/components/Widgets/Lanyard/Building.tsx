import { Hammer } from 'lucide-preact';

import { Card } from '~/components/Widgets/Lanyard/Card.tsx';
import { Inactive } from '~/components/Widgets/Lanyard/Inactive.tsx';
import { useLanyard } from '~/hooks/lanyard';

import type { JSX } from 'astro/jsx-runtime';

import type { LanyardData } from '~/types/lanyard.ts';

interface BuildingProps {
	discordUserId: string;
	initial: LanyardData | null;
}

const DISCORD_APPLICATION = {
	VSCode: {
		// biome-ignore lint/nursery/noSecrets: This application ID is public
		id: '383226320970055681',
		name: 'Visual Studio Code',
	},
};

export function Building({ discordUserId, initial }: BuildingProps): JSX.Element {
	const { status } = useLanyard(discordUserId, { initial });

	const activity = status?.activities.find(
		(activity) =>
			activity.application_id === DISCORD_APPLICATION.VSCode.id ||
			activity.name === DISCORD_APPLICATION.VSCode.name,
	);

	if (
		status?.discord_status === 'offline' ||
		!activity ||
		!activity.assets?.large_image
	)
		return (
			<Inactive
				heading='Nothing right now'
				icon={Hammer}
				id='building'
				subHeading="I'm not working on anything right now"
				title='Building'
			/>
		);

	return (
		<Card
			title='Building'
			id='building'>
			<div class='flex h-full w-full items-center px-2 pt-6 pb-2'>
				<div class='flex w-full items-center justify-between space-x-3 rounded-md'>
					<img
						alt={`${activity.name} icon`}
						class='h-16 w-16 rounded-md border-2 border-gray-100 dark:border-gray-900'
						crossorigin='anonymous'
						src={`https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.webp`}
						referrerpolicy='no-referrer'
					/>

					<div class='flex grow flex-col truncate'>
						<h1
							class='line-clamp-1 font-bold text-gray-600 text-md dark:text-white'
							title={activity.details}>
							{activity.details}
						</h1>
						<h2
							class='line-clamp-1 font-normal text-zinc-200 text-sm dark:text-gray-600'
							title={activity.state}>
							{activity.state}
						</h2>
					</div>
				</div>
			</div>
		</Card>
	);
}
