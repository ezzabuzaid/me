import { getCollection } from "astro:content";
import rss from "@astrojs/rss";

import { SITE_DESCRIPTION, SITE_TITLE, AUTHOR } from "~/constants";
import { filterPosts } from "~/utils/content";

import type { RSSFeedItem } from "@astrojs/rss";
import type { APIRoute } from "astro";

export const prerender = true;

export const GET: APIRoute = async (context) => {
  const posts = await getCollection("posts", filterPosts({ archived: true }));

  const lastModifiedAtMap = new Map<string, string | null>();
  await Promise.all(
    posts.map(async (post) => {
      // We use a remark plugin to extract the `lastModified` field
      // which is generated based on the file system's last modified date.
      // As such we need to render the post to extract this field.
      const { remarkPluginFrontmatter } = await post.render();
      lastModifiedAtMap.set(
        post.slug,
        remarkPluginFrontmatter.lastModified ?? null,
      );
    }),
  );

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site as URL,
    trailingSlash: false,
    customData: `
			<language>en-us</language>
			<managingEditor>${AUTHOR.email} (${AUTHOR.name})</managingEditor>
			<webMaster>${AUTHOR.email} (${AUTHOR.name})</webMaster>
			<copyright>Copyright ${new Date().getFullYear()}, ${AUTHOR.name}</copyright>
			<category>Technology</category>
			<category>Software Development</category>
			<category>Programming</category>
			<generator>Astro RSS</generator>
			<docs>https://blogs.law.harvard.edu/tech/rss</docs>
			<ttl>60</ttl>
		`,
    items: posts
      .sort(
        (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf(),
      )
      .map((post): RSSFeedItem => {
        const lastModifiedAt = lastModifiedAtMap.get(post.slug);

        return {
          title: post.data.title,
          description: post.data.description,
          link: new URL(`/posts/${post.slug}`, context.site).href,
          pubDate: post.data.publishedAt,
          author: `${AUTHOR.email} (${AUTHOR.name})`,
          categories: ["Technology", "Programming", "Software Development"],
          customData: `
						${lastModifiedAt ? `<lastBuildDate>${lastModifiedAt}</lastBuildDate>` : ""}
						<source url="${new URL(`/posts/${post.slug}`, context.site).href}">${SITE_TITLE}</source>
						<guid isPermaLink="true">${new URL(`/posts/${post.slug}`, context.site).href}</guid>
					`,
        };
      }),
  });
};
