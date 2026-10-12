import type { ComponentChildren, JSX } from "preact";

type Props = Pick<
  JSX.AnchorHTMLAttributes<HTMLAnchorElement>,
  "target" | "rel" | "children"
> & {
  href: string;
  title: string;
  description: string;
  metadata: ComponentChildren;
  topic: ComponentChildren;
};

export function BlogListItem({
  title,
  description,
  metadata,
  topic,
  children,
  ...link
}: Props) {
  return (
    <article class="article-card">
      <a {...link}>
        <h3 class="article-title">{title}</h3>
        <p class="article-description">{description}</p>
        <div class="article-date">{metadata}</div>
        {children}
        <span class="article-list-topic">{topic}</span>
      </a>
    </article>
  );
}
