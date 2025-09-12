import { Card } from '~/components/Widgets/Lanyard/Card.tsx';

import type { LucideIcon } from 'lucide-preact';
import type { JSX } from 'preact/jsx-runtime';

import type { CardProps } from '~/components/Widgets/Lanyard/Card.tsx';

interface InactiveProps extends Omit<CardProps, 'children'> {
	heading: string;
	subHeading: string;
	icon: LucideIcon;
}

export function Inactive({
	heading,
	icon: Icon,
	id,
	subHeading,
	title,
}: InactiveProps): JSX.Element {
	return (
		<Card
			title={title}
			id={id}>
			<div class='flex h-full w-full items-center px-2 pt-6 pb-2'>
				<div class='flex w-full items-center justify-between space-x-3 rounded-md'>
					<div class='flex h-16 w-16 items-center justify-center'>
						<Icon class='mx-auto h-6 w-6 text-zinc-200 dark:text-gray-200' />
					</div>

					<div class='flex grow flex-col'>
						<h3 class='font-semibold text-zinc-200 text-md dark:text-gray-200'>
							{heading}
						</h3>

						<p class='text-zinc-200 text-sm dark:text-gray-600'>
							{subHeading}
						</p>
					</div>
				</div>
			</div>
		</Card>
	);
}
