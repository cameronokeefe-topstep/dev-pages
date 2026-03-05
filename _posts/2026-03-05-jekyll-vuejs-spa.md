---
layout: post
title: "Jekyll + Vuejs SPA"
---

# Vue.js + Jekyll Overview (Hybrid Static + SPA)


This approach lets you keep **Jekyll** as your static-site generator (posts, pages, layouts) while adding a **Vue 3 single-page app (SPA)** that lives at a dedicated path (e.g. `/app/`) and can consume Jekyll-generated content via JSON. You get:

- **Static Jekyll routes** (SEO-friendly, normal page loads):  
  `/dev-pages/docs/my-post/`
- **SPA Vue routes** (dynamic UI, client routing):  
  `/dev-pages/app/#/post/my-post`

The key is to use **hash routing** in Vue (`#/...`) so it works on static hosting (GitHub Pages) without server rewrites.

---

## Architecture Options

### 1) Hybrid (Recommended)
- Jekyll renders the main site + canonical content pages.
- Vue SPA is mounted on a single Jekyll page (`/app/`).
- Vue fetches content from a Jekyll-generated JSON feed (`/posts.json`).

✅ Best for: “Both static pages AND a true SPA in the same repo.”

### 2) Vue-enhanced Jekyll (Not a full SPA)
- Keep all routes as Jekyll pages.
- Use Vue only for components/widgets inside pages.

✅ Best for: interactive UI without client routing.

---

## Successful Process (Brief Outline)

### 1) Configure Jekyll paths
- Set `baseurl` for GitHub Pages project sites (example):
  - `baseurl: "/dev-pages"`
- Set permalinks for post URLs (example):
  - `permalink: /docs/:title/`

### 2) Add a SPA host page in Jekyll
Create `/app/` as a real Jekyll page that mounts Vue:

- `app/index.html` → permalink `/app/`
- Contains `<div id="app"></div>`
- Loads the Vue entry module: `assets/app/main.js`

Result:
- Visiting `/dev-pages/app/` returns real HTML (Jekyll layout + SPA mount point)

### 3) Export Jekyll content as JSON for Vue
Generate a JSON feed from `_posts` so the SPA can fetch content:

- `posts.json` with:
  - `title`, `date`, `slug`, `url`, `content`, etc.
- Use `relative_url` so Jekyll automatically prefixes `baseurl`

Result:
- `/dev-pages/posts.json` becomes the SPA’s content API.

### 4) Use Vue 3 + Vue Router with hash routing
Inside `assets/app/main.js`:
- Use Vue Router with `createWebHashHistory()`
- Define routes like:
  - `/` (SPA home)
  - `/post/:slug` (SPA post view)

Result:
- SPA routes look like `/dev-pages/app/#/post/my-post`
- No server rewrite rules required.

### 5) Handle baseurl correctly (critical)
Ensure fetch calls and static links include the base path:

- Provide baseurl to JS via a global (e.g. `window.__BASEURL__ = "{{ site.baseurl }}"`)
- Fetch JSON using:
  - `${BASE}/posts.json`

Result:
- Works the same locally and on GitHub Pages project sites.

### 6) Use import maps or CDN ESM to avoid bundlers (optional but common)
If you are not using Vite:
- Use an `importmap` in `app/index.html` for:
  - `vue`
  - `vue-router`
- Prefer a browser-ready Vue build:
  - `vue.esm-browser.js`

Result:
- No Node build step required; the browser can load modules directly.

### 7) Render posts in Vue from the JSON feed
In the SPA:
- Home view fetches `posts.json` and lists items
- Post view matches `:slug`, finds the post, and renders:
  - `v-html="post.content"` (Jekyll already converted Markdown → HTML)

Result:
- SPA shows the same content as Jekyll’s static pages, but with dynamic routing/UI.

---

## Resulting URL Behavior

### Static (Jekyll)
- `/dev-pages/docs/my-post/` → full HTML page rendered by Jekyll

### SPA (Vue)
- `/dev-pages/app/#/post/my-post` → Vue renders content client-side

These coexist cleanly because:
- Jekyll owns `/docs/...`
- Vue owns hash routes under `/app/`

---

## Recommended Next Steps
- Add a second feed for metadata-only lists (faster load)
- Add client-side search (index posts at build time)
- Add a shared “canonical link”:
  - SPA page links back to the static Jekyll URL (`post.url`)
- If the SPA grows, consider switching to Vite for:
  - bundling, smaller payloads, better DX