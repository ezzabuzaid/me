import { useEffect, useRef, useState } from "preact/hooks";

export interface DirectoryPost {
	slug: string;
	href: string;
	title: string;
	description: string;
	tags: string[];
	year: number;
	readingTime: string;
}

const PAGE_SIZE = 12;

export function Directory({ posts }: { posts: DirectoryPost[] }) {
	const [limit, setLimit] = useState(PAGE_SIZE);
	const sentinel = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = sentinel.current;
		if (!el) return;
		const observer = new IntersectionObserver(([entry]) => {
			if (entry?.isIntersecting) setLimit((current) => current + PAGE_SIZE);
		});
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	const visible = posts.slice(0, limit);

	return (
		<div>
			<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{visible.map((post) => (
					<Card key={post.slug} post={post} />
				))}
			</div>

			<div class="mt-10 flex flex-col items-center gap-2">
				{visible.length < posts.length && (
					<div ref={sentinel} aria-hidden="true" class="h-px w-full" />
				)}
				<span class="font-sans text-[11px] text-faint">
					showing <span class="tabular text-muted">{visible.length}</span> of{" "}
					<span class="tabular text-muted">{posts.length}</span>
				</span>
			</div>
		</div>
	);
}

function Card({ post }: { post: DirectoryPost }) {
	return (
		<a
			href={post.href}
			class="group flex h-full flex-col overflow-hidden rounded-md border border-line bg-paper paper-shadow transition-colors hover:border-faint"
		>
			<div class="relative flex flex-1 flex-col overflow-hidden border-b border-line bg-cover p-5">
				<div class="font-sans text-[10px] uppercase tracking-[0.15em] text-faint">
					{post.tags[0] ?? "note"}
				</div>
				<h3 class="mt-4 line-clamp-4 font-display text-[22px] font-medium leading-[1.15] tracking-tight text-ink decoration-line underline-offset-4 group-hover:underline">
					{post.title}
				</h3>
				<p class="mt-3 line-clamp-3 text-[12.5px] leading-relaxed text-muted">
					{post.description}
				</p>
				<div class="mt-auto pt-6">
					<div class="h-px w-full bg-line" />
					<div class="mt-2 flex items-end justify-between gap-2 font-sans text-[11px] text-muted">
						<span class="line-clamp-1">Ezz Abuzaid</span>
						<span class="tabular text-faint">{post.year}</span>
					</div>
				</div>
				<Watermark />
			</div>

			<div class="flex items-center justify-between gap-2 px-4 py-2.5">
				<span class="truncate font-sans text-[10px] uppercase tracking-[0.15em] text-faint">
					{post.readingTime}
				</span>
				<span
					aria-hidden="true"
					class="shrink-0 font-sans text-[11px] text-faint transition-colors group-hover:text-ink"
				>
					→
				</span>
			</div>
		</a>
	);
}

function Watermark() {
	const petals = Array.from({ length: 12 }, (_, i) => (i / 12) * 360);
	return (
		<svg
			viewBox="0 0 168 168"
			aria-hidden="true"
			class="pointer-events-none absolute -bottom-6 -right-6 h-24 w-24 text-ink opacity-[0.06]"
		>
			<circle
				cx="84"
				cy="84"
				r="80"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
			/>
			{petals.map((angle) => (
				<ellipse
					key={angle}
					cx="84"
					cy="84"
					rx="28"
					ry="72"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
					transform={`rotate(${angle} 84 84)`}
				/>
			))}
		</svg>
	);
}
