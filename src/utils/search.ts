import { getCollection } from "astro:content";

export interface SearchItem {
  id: string;
  title: string;
  url: string;
  type: "page" | "post";
  excerpt?: string;
  featured?: number;
  isFeatured?: boolean;
}

export async function getSearchData(): Promise<SearchItem[]> {
  const items: SearchItem[] = [];

  // Static pages
  items.push(
    {
      id: "home",
      title: "Home",
      url: "/",
      type: "page",
      excerpt: "Welcome to my personal website",
    },
    {
      id: "posts",
      title: "Posts",
      url: "/posts",
      type: "page",
      excerpt: "Browse all blog posts and articles",
    },
    {
      id: "projects",
      title: "Projects",
      url: "/projects",
      type: "page",
      excerpt: "View my latest projects and work",
    },
    {
      id: "uses",
      title: "Uses",
      url: "/uses",
      type: "page",
      excerpt: "Tools and software I use daily",
    },
  );

  try {
    // Get all posts
    const posts = await getCollection("posts");
    
    // Sort posts by featured value (lower is more featured)
    const sortedPosts = posts.sort((a, b) => a.data.featured - b.data.featured);

    sortedPosts.forEach((post, index) => {
      items.push({
        id: post.slug,
        title: post.data.title,
        url: `/posts/${post.slug}`,
        type: "post",
        excerpt: post.data.description || "",
        featured: post.data.featured,
        isFeatured: index < 5, // Top 5 posts are considered featured
      });
    });
  } catch (error) {
    console.warn("Could not load posts for search:", error);
  }

  try {
    // Get all projects if they exist
    const projects = await getCollection("projects");

    projects.forEach((project) => {
      items.push({
        id: project.id,
        title: project.data.title,
        url: `/projects/${project.id}`,
        type: "page",
        excerpt: project.data.description || "",
      });
    });
  } catch (error) {
    // Projects collection might not exist, that's okay
  }

  return items;
}
