import { useEffect, useState } from 'preact/hooks';

import { cn } from '~/utils/cn';

import type { JSX } from 'astro/jsx-runtime';

interface MeteorsProps {
	number: number;
}

export function Meteors({ number }: MeteorsProps): JSX.Element {
	const meteors = new Array(number).fill(null);

	const [offset, setOffset] = useState<{
		min: number;
		max: number;
	}>({
		min: 0,
		max: 0,
	});

	useEffect(() => {
		function handler(): void {
			// Note: Because of the angle of the meteors, we need to offset the min / max
			// start positions to be off-screen.
			setOffset({
				min: -(window.innerWidth / 8),
				max: window.innerWidth - window.innerWidth / 8,
			});
		}

		handler();

		window.addEventListener('resize', handler);

		return (): void => {
			window.removeEventListener('resize', handler);
		};
	}, []);

	return (
		<div class='absolute inset-0 h-64 w-full overflow-hidden'>
			{meteors.map((_el, idx) => (
				<span
					aria-hidden={true}
					key={idx}
					class={cn(
						'absolute h-0.5 w-0.5 rotate-(215deg) animate-meteor-effect rounded-full bg-gray-100 shadow-(0_0_0_1px_#ffffff10) motion-reduce:hidden dark:bg-gray-600',
						'before:-translate-y-(50%) before:absolute before:top-1/2 before:h-0.5 before:w-14 before:transform before:rounded-full before:bg-linear-to-r before:from-gray-300 before:to-transparent before:content-("") dark:before:from-gray-600',
					)}
					style={{
						animationDelay: `${Math.random() * (0.8 - 0.2) + 0.2}s`,
						animationDuration: `${Math.floor(Math.random() * (10 - 2) + 2)}s`,

						left: `${Math.floor(Math.random() * offset.max + offset.min)}px`,
						top: `${Math.floor(Math.random() * (0 - -400) + -400)}px`,
					}}
				/>
			))}
		</div>
	);
}
