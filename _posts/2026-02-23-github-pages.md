---
layout: post
title: "Github Pages"
---

[https://docs.github.com/en/pages](https://docs.github.com/en/pages)

# Jekyll + GitHub Pages — Complete User Guide

A practical, step-by-step guide to building and deploying a Jekyll website using GitHub Pages.

---

# Table of Contents

1. What You’re Building
2. Prerequisites
3. Creating a New Jekyll Site
4. Understanding the Project Structure
5. Running Jekyll Locally
6. Creating Posts and Pages
7. Configuring `_config.yml`
8. Using Liquid (Templating Basics)
9. Preparing for GitHub Pages
10. Deploying to GitHub Pages
11. Custom Domains
12. Troubleshooting
13. Best Practices

---

# 1. What You’re Building

Jekyll is a **static site generator**.

You write:
- Markdown
- HTML
- YAML config

Jekyll generates:
- Static HTML files

GitHub Pages hosts:
- The generated static site

---

# 2. Prerequisites

Install:

- Ruby (recommended via rbenv or asdf)
- Bundler
- Git
- GitHub account

Check versions:

```bash
ruby -v
gem -v
bundle -v
git --version
```

---

# 3. Creating a New Jekyll Site

## Create project

```bash
gem install jekyll bundler
jekyll new my-site
cd my-site
bundle install
```

## Project structure

```text
my-site/
├── _config.yml
├── _posts/
├── _layouts/
├── _includes/
├── _site/        (generated)
├── Gemfile
└── index.md
```

---

# 4. Running Jekyll Locally

Start the development server:

```bash
bundle exec jekyll serve --livereload
```

Visit:

```
http://localhost:4000
```

Build only:

```bash
bundle exec jekyll build
```

Clean:

```bash
bundle exec jekyll clean
```

---

# 5. Creating Posts

## File naming format

```text
_posts/YYYY-MM-DD-title.md
```

Example:

```markdown
---
layout: post
title: "My First Post"
date: 2026-02-24
categories: [blog]
tags: [jekyll, github]
---

This is my first post.
```

---

# 6. Creating Pages

Create a page like `about.md`:

```markdown
---
layout: page
title: About
permalink: /about/
---

This is the about page.
```

---

# 7. Understanding `_config.yml`

Example configuration:

```yaml
title: My Website
description: Personal blog
url: "https://username.github.io"
baseurl: ""   # Use "/repo-name" for project sites

markdown: kramdown
permalink: /blog/:title/

timezone: America/New_York

plugins:
  - jekyll-feed
  - jekyll-seo-tag
```

## Important: baseurl

- User site → `""`
- Project site → `"/repository-name"`

Example:

```yaml
baseurl: "/my-repo"
```

---

# 8. Using Liquid (Templating)

## Output variables

```liquid
{{ site.title }}
{{ page.title }}
```

## Loop posts

```liquid
<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url | relative_url }}">
        {{ post.title }}
      </a>
    </li>
  {% endfor %}
</ul>
```

## Conditionals

```liquid
{% if page.layout == "post" %}
  <p>This is a blog post</p>
{% endif %}
```

---

# 9. Preparing for GitHub Pages

## Commit your project

```bash
git init
git add .
git commit -m "Initial commit"
```

## Create GitHub repository

- Go to GitHub
- Click "New Repository"
- Name it:

User site:
```
username.github.io
```

Project site:
```
my-project
```

---

# 10. Deploying to GitHub Pages

## Option A — Let GitHub Build Jekyll (Recommended for simple sites)

Push to GitHub:

```bash
git remote add origin https://github.com/username/repo-name.git
git branch -M main
git push -u origin main
```

Then:

1. Go to Repository Settings
2. Click "Pages"
3. Under "Source" → Select:
   - Branch: `main`
   - Folder: `/ (root)`
4. Save

Your site will be available at:

User site:
```
https://username.github.io
```

Project site:
```
https://username.github.io/repo-name/
```

---

## Option B — Deploy Built `_site/` Folder (Advanced)

Build locally:

```bash
bundle exec jekyll build
```

Deploy `_site/` contents to `gh-pages` branch.

Often done with GitHub Actions.

---

# 11. Custom Domain

1. Add a `CNAME` file to project root:

```text
example.com
```

2. Commit and push
3. In GitHub Pages settings:
   - Add custom domain
4. Configure DNS:
   - A record → GitHub IPs
   - OR CNAME → username.github.io

---

# 12. GitHub Pages Plugin Limitations

GitHub Pages only supports approved plugins.

Supported examples:
- jekyll-feed
- jekyll-seo-tag
- jekyll-sitemap

If you need custom plugins:
- Use GitHub Actions
- Build site yourself
- Deploy static output

---

# 13. Drafts

Create `_drafts/` folder.

Add:

```text
_drafts/my-draft.md
```

Serve with:

```bash
bundle exec jekyll serve --drafts
```

---

# 14. Common Issues

## Broken CSS or Links

Cause:
- Incorrect `baseurl`

Fix:
Use:

```liquid
{{ "/assets/css/style.css" | relative_url }}
```

---

## 404 Errors

Cause:
- Wrong permalink
- Missing trailing slash

---

## Liquid Errors

Check terminal output for line numbers.

---

## Site Not Updating

Try:

```bash
bundle exec jekyll clean
bundle exec jekyll serve
```

---

# 15. Recommended Folder Structure

```text
.
├── _config.yml
├── _layouts/
├── _includes/
├── _posts/
├── _data/
├── assets/
│   ├── css/
│   ├── js/
│   └── img/
└── index.md
```

---

# 16. Best Practices

- Always use `relative_url`
- Keep layouts minimal
- Use collections for custom content types
- Avoid heavy plugins
- Keep `_site/` out of git (add to `.gitignore`)
- Test locally before pushing

---

# 17. Quick Deployment Checklist

- [ ] Install Ruby + Bundler
- [ ] Create Jekyll site
- [ ] Configure `_config.yml`
- [ ] Test locally
- [ ] Create GitHub repository
- [ ] Push code
- [ ] Enable GitHub Pages
- [ ] Verify live URL

---

# 18. Final Workflow Summary

```text
Write Markdown
      ↓
Run jekyll serve
      ↓
Commit & push to GitHub
      ↓
GitHub Pages builds site
      ↓
Website is live
```

---

You now have a complete workflow for building and deploying Jekyll sites with GitHub Pages.