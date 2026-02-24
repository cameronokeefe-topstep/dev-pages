## Why You Should Always Use bundle exec

Instead of:

```bash
jekyll serve
```

You should run:

```bash
bundle exec jekyll serve
```

## This ensures:

You're using the Jekyll version defined in your Gemfile
Not some global Ruby version installed on your system

## Run both
In one terminal (Ruby):

```bash
bundle exec jekyll serve
```

In another terminal (Node):

```bash
npm run tw:watch
```

## Add a new post

1. Create a file in `_posts/` named `YYYY-MM-DD-title.md`.
2. Add front matter and content, for example:

```markdown
---
layout: post
title: "My New Post"
date: 2026-02-24
---

Write your post content here.
```

3. Open `http://localhost:4000` after running `bundle exec jekyll serve` to confirm it renders.

## Add a new page

1. Create a new file in `pages/`, for example `pages/about.md`.
2. Add front matter and content, for example:

```markdown
---
title: "About"
permalink: /about/
---

Page content goes here.
```

3. Visit `http://localhost:4000/about/` to verify the page.
