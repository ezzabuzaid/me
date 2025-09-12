import avatarBase64 from "~/assets/avatar.jpeg?base64";

import type { APIContext } from "astro";
import type { CollectionEntry } from "astro:content";
import type { JSX } from "preact/jsx-runtime";

interface OGPostProps {
  context: APIContext;
  post: CollectionEntry<"posts">;
}

export function OGPost({ post }: OGPostProps): JSX.Element {
  return (
    <div tw="flex h-full w-full flex-col justify-between border-blue-600 border-b-[3rem] bg-white p-8">
      <div tw="flex w-full grow flex-col justify-end rounded-xl p-4 pr-8">
        <h1 tw="font-bold text-8xl text-gray-900">{post.data.title}</h1>

        <div tw="flex items-center">
          <p tw="grow text-4xl text-zinc-200">{post.data.description}</p>

          <span tw="mx-8 h-full w-1 border-2 border-zinc-200" />

          <img
            alt="Avatar of the author of the post"
            src={avatarBase64}
            tw="h-24 w-24 rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
