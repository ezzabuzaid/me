# ☄️ Meteor

## 🚀 Setup

### Local Development

To get started, this pack works just like any other Astro project.

 1. **Download the Pack:** Make sure to download the latest version of the pack. You should be able to find a link to this in your purchase receipt email.
 
 2. **Extract the Pack:** Once downloaded, extract the contents of the pack to a folder on your computer.
 
 3. **Install Dependencies:** Open a terminal and navigate to the folder where you extracted the pack. From there, run `pnpm install` to install the dependencies. Other package managers like `npm` or `yarn` may work, but `pnpm` is the recommended package manager for this pack.

 4. **Start Local Development Server:** With the dependencies installed, you can simply run `pnpm run dev` to start the local development server.

 5. **Open in Browser:** Open your web browser and navigate to `http://localhost:4321` to see your site in action.

> [!NOTE]  
> `pnpm` is the recommended package manager for this pack. Other package managers like `npm` or `yarn` may work, but `pnpm` is the one I use to develop and test this pack.

### 🧞 Commands

Here is a list of all commands that can be run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm run dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm run build`           | Build your production site to `./dist/`          |
| `pnpm run preview`         | Preview your build locally, before deploying     |
| `pnpm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm run astro -- --help` | Get help using the Astro CLI                     |

## 🔧 Configuration

For the most part, the file structure of this pack is pretty standard for an Astro project. The usual Astro directories and files are present such as `src/` for your source files, `public/` for static assets, and `astro.config.ts` for configuration.

However, there are some additional directories and files that are specific to this pack:

### 📚 Content Collections

A `src/content/` directory is included in this pack, which is part of Astro's [content collections feature](https://docs.astro.build/en/guides/content-collections/). This directory will contain all of your blog posts, timeline events, and social footer social links.

For example, to add a new blog post, create a new file in `src/content/posts/` with the `.md` extension. The pack includes a sample blog post to help you get started.

### ❗ Global Constants

Now, throughout the pack, there is places you want the same name, title, description, etc to be used. As such a `src/constants.ts` file is included.

This file contains various global constants used throughout the pack, such as the site title, description, and other metadata.

### 🔌 Discord

One key feature of this pack is its "Building" & "Music" widgets. These widgets are powered by [Lanyard](https://github.com/Phineas/lanyard), a community project that provides a simple way to expose your Discord presence & activity via a REST API. However, this feature is entirely optional and not required at all in order to use the pack.

To get started using this feature, there is a few simple steps involved:

 1. **Join the Lanyard Discord Server:** The first step is to join the [Lanyard Discord server](https://discord.gg/UrXF2cfJ7F).
 
 2. **Get Your Discord User ID:** You will need your Discord user ID to use the Lanyard API. You can find your user ID by following [this guide](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID) from Discord.

 3. **Adding your user ID:** With your user ID in hand, you can copy the `.example.env` file to `.env` and add your user ID to the `DISCORD_USER_ID` variable. This will allow the pack to fetch your Discord presence and activity. Note that when deploying your site, you will need to make sure to set the `DISCORD_USER_ID` environment variable in your hosting provider's settings.

And that should be it. You may need to restart your local development server for the changes to take effect, but you should now see your Discord presence and activity in the "Building" & "Music" widgets.

## 🚑 Need some help?

If you are having any issues, please feel free to reach out to me via any of the following methods:

 - **Email:** `help@butterythemes.com`
 - **Twitter / X:** [@nurodev](https://x.com/nurodev)
 - **Bluesky:** [@nuro.dev](https://bsky.app/profile/nuro.dev)
