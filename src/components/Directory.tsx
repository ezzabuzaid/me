import { ChevronDown, Grid2X2, Grid3X3, List, Search, X } from "lucide-preact";
import { useState } from "preact/hooks";
import { ArticleArtwork } from "./ArticleArtwork";
import { BlogListItem } from "./BlogListItem";
import "~/styles/directory.css";

export interface DirectoryPost {
  slug: string;
  href: string;
  title: string;
  description: string;
  tags: string[];
  publishedAt: string;
  image?: string | undefined;
  readingTime: string;
}

const PAGE_SIZE = 12;
const layouts = [
  { value: "list", label: "List view", Icon: List },
  { value: "grid", label: "Grid view", Icon: Grid2X2 },
  { value: "dense", label: "Dense view", Icon: Grid3X3 },
] as const;

export function Directory({ posts }: { posts: DirectoryPost[] }) {
  const [tag, setTag] = useState("");
  const [query, setQuery] = useState("");
  const [layout, setLayout] = useState<"list" | "grid" | "dense">("list");
  const [limit, setLimit] = useState(PAGE_SIZE);
  const categories = [
    ...new Set(posts.flatMap((post) => post.tags.slice(0, 1))),
  ].sort();
  const search = query.trim().toLocaleLowerCase();
  const filtered = posts.filter(
    (post) =>
      (!tag || post.tags.includes(tag)) &&
      (!search ||
        `${post.title} ${post.description} ${post.tags.join(" ")}`
          .toLocaleLowerCase()
          .includes(search)),
  );
  const featured = filtered.slice(0, 6);
  const remaining = filtered.slice(6);
  const visible = remaining.slice(0, limit);

  function filterBy(value: string) {
    setTag(value);
    setLimit(PAGE_SIZE);
  }

  return (
    <div class="article-directory">
      <aside class="directory-sidebar" aria-label="Article filters">
        <fieldset class="desktop-filters">
          <legend>Filter by</legend>
          {["", ...categories].map((category) => (
            <label class="filter-option" key={category}>
              <input
                type="radio"
                name="topic"
                value={category}
                checked={tag === category}
                onChange={() => filterBy(category)}
              />
              <span>{category || "All"}</span>
            </label>
          ))}
        </fieldset>
        <label class="mobile-filters">
          <span>Filter by</span>
          <select
            value={tag}
            onChange={(event) => filterBy(event.currentTarget.value)}
          >
            <option value="">All articles</option>
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
          <ChevronDown size={12} aria-hidden="true" />
        </label>
        <a href="/rss.xml" class="subscribe-link">
          Subscribe via RSS <span aria-hidden="true">↗</span>
        </a>
        <form
          class="directory-search"
          role="search"
          onSubmit={(event) => event.preventDefault()}
        >
          <label for="article-search" class="sr-only">
            Search articles
          </label>
          <Search size={15} aria-hidden="true" />
          <input
            id="article-search"
            type="search"
            placeholder="Search articles…"
            value={query}
            onInput={(event) => {
              setQuery(event.currentTarget.value);
              setLimit(PAGE_SIZE);
            }}
          />
          {query && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setQuery("")}
            >
              <X size={14} aria-hidden="true" />
            </button>
          )}
        </form>
        <nav class="directory-links" aria-label="Explore">
          <a href="/projects">
            Projects <span aria-hidden="true">↗</span>
          </a>
          <a href="/internet">
            Around the internet <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </aside>

      <div class="directory-content">
        <p class="sr-only" role="status">
          {filtered.length} {filtered.length === 1 ? "article" : "articles"}
          {tag ? ` tagged ${tag}` : ""}
          {search ? ` matching ${query}` : ""}.
        </p>
        {featured.length > 0 ? (
          <section class="featured-articles" aria-label="Featured articles">
            {featured.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </section>
        ) : (
          <section class="directory-empty">
            <h2>No articles found.</h2>
            <p>Try a different topic or search term.</p>
            <button
              type="button"
              class="subscribe-link"
              onClick={() => {
                setQuery("");
                filterBy("");
              }}
            >
              Show all articles
            </button>
          </section>
        )}

        {remaining.length > 0 && (
          <section class="article-archive" aria-labelledby="archive-heading">
            <div class="archive-toolbar">
              <h2 id="archive-heading">
                More writing <span>({remaining.length})</span>
              </h2>
              <div
                class="layout-options"
                role="group"
                aria-label="Article layout"
              >
                {layouts.map(({ value, label, Icon }) => (
                  <button
                    key={value}
                    type="button"
                    aria-label={label}
                    title={label}
                    aria-pressed={layout === value}
                    aria-controls="article-list"
                    onClick={() => setLayout(value)}
                  >
                    <Icon size={16} strokeWidth={1.5} aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>
            <div id="article-list" class={`archive-articles view-${layout}`}>
              {layout === "list" && (
                <div class="archive-columns" aria-hidden="true">
                  <span>— Date</span>
                  <span>— Name</span>
                  <span>Topic</span>
                </div>
              )}
              {visible.map((post) =>
                layout === "list" ? (
                  <PostListItem key={post.slug} post={post} />
                ) : (
                  <ArticleCard key={post.slug} post={post} />
                ),
              )}
            </div>
            <div class="archive-bottom">
              <span role="status">
                Showing {featured.length + visible.length} of {filtered.length}{" "}
                articles
              </span>
              {visible.length < remaining.length && (
                <button
                  type="button"
                  class="subscribe-link"
                  onClick={() => setLimit((value) => value + PAGE_SIZE)}
                >
                  Load more <span aria-hidden="true">↓</span>
                </button>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function PostListItem({ post }: { post: DirectoryPost }) {
  return (
    <BlogListItem
      href={post.href}
      title={post.title}
      description={post.description}
      metadata={
        <time dateTime={post.publishedAt}>
          {post.publishedAt.replaceAll("-", ".")}
        </time>
      }
      topic={post.tags[0] ?? "Notes"}
    >
      <span class="sr-only"> · {post.readingTime}</span>
    </BlogListItem>
  );
}

function ArticleCard({ post }: { post: DirectoryPost }) {
  const topic = post.tags[0] ?? "Notes";
  return (
    <article class="article-card">
      <a href={post.href}>
        <div class="article-artwork">
          {post.image ? (
            <img src={post.image} alt="" loading="lazy" />
          ) : (
            <ArticleArtwork slug={post.slug} topic={topic} />
          )}
        </div>
        <span class="article-tag">{topic}</span>
        <h2 class="article-title">{post.title}</h2>
        <p class="article-description">{post.description}</p>
        <time class="article-date" dateTime={post.publishedAt}>
          {post.publishedAt.replaceAll("-", ".")}
        </time>
        <span class="sr-only"> · {post.readingTime}</span>
      </a>
    </article>
  );
}
