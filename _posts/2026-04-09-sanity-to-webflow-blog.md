---
layout: post
title: "Sanity to Webflow - blog"
---

Node conversion script for converting Sanity JSON data to CSV for import to Webflow Collection

---

# Sanity → Webflow Blog Migration Script

This script migrates blog content from a **Sanity dataset (API or local export)** into a format compatible with **Webflow CMS import (CSV/JSON)**.

It supports:

* Full blog content (title, slug, summary, etc.)
* Rich `pageBuilder` → HTML conversion
* Image handling (including local assets + filenames)
* SEO field extraction and flattening
* Preview mode for safe testing
* Optional asset URL transformation

---

# Features

## Content Migration

* Converts Sanity `blog` documents into Webflow-ready fields
* Preserves:

  * Title, slug, summary
  * Author + topics
  * Publish date
  * Featured image

## Page Builder → HTML

Supports:

* `row` → rich text
* `fullWidthImage`
* `table`
* `section-heading`
* `embedCode`
* graceful fallback for unsupported blocks

## Image Handling

* Resolves images from:

  * API (`asset->url`)
  * local dataset (`_sanityAsset`)
* Maps images using `assets.json`
* Injects:

```html
<img src="..." data-file-name="image.png" />
```

## SEO Support

Flattens nested Sanity `seo` object into Webflow fields:

* Meta title / description
* Keywords
* No-follow flag
* Open Graph (title, description, image, etc.)
* Twitter fields
* Additional meta tags (JSON)

## Preview Mode

Inspect output without writing files:

* HTML preview
* SEO fields
* CSV structure

---

# Installation

```bash
npm install
```

Required dependencies:

* `@sanity/client`
* `@portabletext/to-html`
* `json2csv`
* `dotenv`

---

# ⚙️ Environment Variables

Create a `.env.local` file (only required for API mode):

```env
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production
SANITY_API_VERSION=2025-01-01
SANITY_TOKEN=your_token_if_needed
```

---

# Local Dataset Structure

When using a local export:

```
/export/
  data.ndjson
  assets.json
  /images/
    <asset-files>
```

### Required files:

* `data.ndjson` → Sanity export
* `assets.json` → asset metadata (IMPORTANT)
* `/images/` → downloaded image files

---

# ▶️ Usage

## 1. Preview a Single Post (Recommended First Step)

```bash
node migrate-sanity-blog-to-webflow.mjs \
  --local-file=./export/data.ndjson \
  --assets-file=./export/assets.json \
  --images-dir=./export/images \
  --slug=your-post-slug \
  --preview \
  --no-write
```

---

## 2. Export a Single Post

```bash
node migrate-sanity-blog-to-webflow.mjs \
  --local-file=./export/data.ndjson \
  --assets-file=./export/assets.json \
  --images-dir=./export/images \
  --slug=your-post-slug
```

---

## 3. Export All Posts

```bash
node migrate-sanity-blog-to-webflow.mjs \
  --local-file=./export/data.ndjson \
  --assets-file=./export/assets.json \
  --images-dir=./export/images
```

---

## 4. Use Sanity API Instead of Local Data

```bash
node migrate-sanity-blog-to-webflow.mjs \
  --slug=your-post-slug \
  --preview
```

---

# 🧪 CLI Flags

| Flag               | Description                        |
| ------------------ | ---------------------------------- |
| `--local-file`     | Path to `data.ndjson`              |
| `--assets-file`    | Path to `assets.json`              |
| `--images-dir`     | Path to images folder              |
| `--slug`           | Filter by slug                     |
| `--id`             | Filter by Sanity `_id`             |
| `--title`          | Filter by title                    |
| `--preview`        | Print preview instead of exporting |
| `--no-write`       | Prevent file output                |
| `--asset-base-url` | Replace Sanity CDN URL             |

---

# Asset URL Transformation

Optional: replace Sanity CDN URLs

```bash
--asset-base-url=https://assets.example.com/images
```

Transforms:

```
https://cdn.sanity.io/images/project/dataset/file.png
↓
https://assets.example.com/images/file.png
```

---

# Output

Files are written to:

```
/output/
  webflow-blog-import-<slug>.json
  webflow-blog-import-<slug>.csv
```

---

# Webflow Fields Included

## Core Fields

* Name
* Slug
* Summary
* Body (HTML)
* Author
* Topics
* Published Date

## Images

* Featured Image
* Featured Image Alt
* Featured Image File Name

## SEO Fields

* SEO Meta Title
* SEO Meta Description
* SEO Keywords
* SEO No Follow
* SEO Open Graph Title
* SEO Open Graph Description
* SEO Open Graph URL
* SEO Open Graph Site Name
* SEO Open Graph Image
* SEO Open Graph Image File Name
* SEO Twitter Handle
* SEO Twitter Creator
* SEO Twitter Site
* SEO Twitter Card Type
* SEO Additional Meta Tags JSON

---

# ⚠️ Important Notes

## 1. assets.json is Required for Filenames

Without it:

* `data-file-name` will be empty
* image mapping may break

---

## 2. Relative vs Absolute Image URLs

If using:

```
--asset-base-url=/relative-path
```

Make sure your final site serves images from that path.

---

## 3. Webflow Rich Text Limits

Very large blog posts may exceed Webflow limits.

---

## 4. Unsupported Blocks

Some blocks (e.g. `button-insert`) are exported as placeholders:

```
[Button Insert module requires manual mapping]
```

---

# Recommended Workflow

1. Run preview on 1 post
2. Verify:

   * HTML structure
   * images
   * SEO fields
3. Import into Webflow
4. Validate rendering
5. Batch migrate remaining posts

---

# 🏁 Summary

This script provides a complete pipeline for:

* Sanity → structured HTML
* Asset resolution (API + local)
* SEO flattening
* Webflow-ready export

It is designed to be:

* safe (preview mode)
* flexible (API or local)
* extensible (custom mappings)

---
