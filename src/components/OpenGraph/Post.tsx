import type { APIContext } from "astro";
import type { CollectionEntry } from "astro:content";
import type { JSX } from "preact/jsx-runtime";

interface OGPostProps {
  context: APIContext;
  post: CollectionEntry<"posts">;
}

export function OGPost({ post }: OGPostProps): JSX.Element {
  const tag = post.data.tags?.[0] ?? "note";
  const year = post.data.publishedAt.getFullYear();

  return (
    <div
      tw="flex h-full w-full items-center justify-center p-16"
      style={{
        backgroundColor: "#e7e4dd",
        fontFamily: "IBM Plex Sans",
      }}
    >
      <div
        tw="flex h-full w-full flex-col rounded-lg border p-14"
        style={{ backgroundColor: "#fcfbf7", borderColor: "#d9d4c8" }}
      >
        <div
          tw="text-2xl uppercase"
          style={{ color: "#9c968a", letterSpacing: "0.2em" }}
        >
          {tag}
        </div>
        <h1
          tw="mt-8 text-7xl font-medium"
          style={{
            color: "#1b1a17",
            fontFamily: "Fraunces",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          {post.data.title}
        </h1>
        <div tw="flex flex-1" />
        <div
          tw="flex w-full"
          style={{ height: "2px", backgroundColor: "#d9d4c8" }}
        />
        <div tw="mt-6 flex w-full items-center justify-between text-2xl">
          <span style={{ color: "#6b665b" }}>Ezz Abuzaid</span>
          <span style={{ color: "#9c968a" }}>{year} · ezz.sh</span>
        </div>
      </div>
    </div>
  );
}
