const BASE = window.__BASEURL__ || "";

let cachedPosts = null;

export async function getPosts() {
  if (cachedPosts) return cachedPosts;
  const res = await fetch(`${BASE}/posts.json`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load ${BASE}/posts.json`);
  cachedPosts = await res.json();
  return cachedPosts;
}

export async function getPostBySlug(slug) {
  const posts = await getPosts();
  return posts.find((p) => p.slug === slug);
}