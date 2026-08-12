import { SITE_DESCRIPTION } from "~/constants";

import type { APIContext } from "astro";
import type { JSX } from "preact/jsx-runtime";

interface OGHomeProps {
	context: APIContext;
}

export function OGHome(_props: OGHomeProps): JSX.Element {
	return (
		<div
			tw="flex h-full w-full items-center justify-center p-16"
			style={{
				backgroundColor: "#e7e4dd",
				fontFamily: "IBM Plex Sans",
			}}
		>
			<div
				tw="flex h-full w-full flex-col justify-center rounded-lg border p-14"
				style={{ backgroundColor: "#fcfbf7", borderColor: "#d9d4c8" }}
			>
				<div
					tw="text-2xl uppercase"
					style={{ color: "#9c968a", letterSpacing: "0.2em" }}
				>
					A blog · a directory
				</div>
				<h1
					tw="mt-8 text-8xl font-medium"
					style={{
						color: "#1b1a17",
						fontFamily: "Fraunces",
						lineHeight: 1,
						letterSpacing: "-0.02em",
					}}
				>
					Ezz Abuzaid
				</h1>
				<p tw="mt-8 max-w-4xl text-3xl" style={{ color: "#6b665b", lineHeight: 1.5 }}>
					{SITE_DESCRIPTION}
				</p>
			</div>
		</div>
	);
}
