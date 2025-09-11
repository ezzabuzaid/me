import { defineConfig, envField } from 'astro/config';

// Astro Integrations
import mdx from '@astrojs/mdx';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import robotsTxt from 'astro-robots-txt';

// Vite Plugins
import tailwind from '@tailwindcss/vite';
import { base64 } from 'vite-plugin-base64';

// biome-ignore lint/nursery/useImportRestrictions: Astro cannot read the local `tsconfig.json` to resolve import path aliases
import { rehypePlugins, remarkPlugins } from './src/utils/markdown.ts';

import vercel from '@astrojs/vercel';

function getSite(): string {
    // When deploying to Cloudflare Pages use the URL provided by the environment
    // biome-ignore lint/nursery/noProcessEnv: Cloudflare exposes this environment variable under `process.env`, not `import.meta.env`
    const { CF_PAGES_BRANCH, CF_PAGES_URL } = process.env;
    if (CF_PAGES_URL && CF_PAGES_BRANCH !== 'main') return CF_PAGES_URL;

    // If a `SITE` environment variable is already set, use that
    if (import.meta.env.SITE) return import.meta.env.SITE;

    // When developing locally, use the default localhost URL
    if (import.meta.env.DEV) return 'http://localhost:4321';

    // biome-ignore lint/suspicious/noConsole: Build warnings require logging to the console
    console.warn(
        'No `SITE` environment variable set. Using `https://example.com` as the default',
    );
    return 'https://example.com';
}
const site = getSite();

// https://astro.build/config
export default defineConfig({
  adapter: vercel(),
  env: {
      schema: {
          DISCORD_USER_ID: envField.string({
              access: 'public',
              context: 'client',
              optional: true,
          }),
      },
	},

  integrations: [
      icon(),
      mdx(),
      preact(),
      robotsTxt({
          sitemap: new URL('/sitemap-index.xml', site).href,
      }),
      sitemap(),
	],

  markdown: {
      rehypePlugins,
      remarkPlugins,
      // Note: We disable syntax highlighting here because we're using `rehype-pretty-code` instead
      syntaxHighlight: false,
	},

  output: 'static',
  site,

  vite: {
      plugins: [base64() as any, tailwind() as any] as any,
      ssr: {
          // Note: These dependencies are only required for builds to work as
          // they are used to generate OpenGraph images.
          external: ['@resvg/resvg-js', 'node:fs', 'node:path'],
      },
	},

});