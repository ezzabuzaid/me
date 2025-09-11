import type { JSX } from 'astro/jsx-runtime';

export interface CardProps {
	children: JSX.Element;
	title: string;
	id: string;
}

export function Card({ children, id, title }: CardProps): JSX.Element {
	return (
		<section
			class='max-h-24 min-h-24 overflow-hidden rounded-xl border-2 border-gray-100 bg-white px-2 pb-2 md:col-span-5 dark:border-gray-900 dark:bg-gray-950'
			id={id}>
			<h3 class='-translate-y-3 absolute mx-4 inline-flex transform-gpu items-center rounded-full border-2 border-gray-100 bg-white px-4 font-bold text-gray-600 text-sm dark:border-gray-900 dark:bg-gray-950 dark:text-white'>
				{title}
			</h3>

			{children}
		</section>
	);
}
