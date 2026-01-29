# Epic Landscape Designs — Website (Jekyll + Decap CMS)

A brochure-style website I built for **Epic Landscape Designs**, with a fast static front-end and a simple editor experience so the client can update content without touching code.

## Tech stack
- **Jekyll** — static site generator (fast, secure, low maintenance)
- **Decap CMS** — git-based CMS for editing pages/content via an admin UI

## What I built
- **Static marketing pages** (services, about, contact, etc.)
- **Reusable layouts/components** using Jekyll includes and templates
- **CMS-powered content** so the client can update text/images easily
- **Image + content workflow**: edits in Decap CMS commit to the repo and publish through the deploy pipeline

## Why this approach
- **Speed & SEO:** pre-rendered pages and lightweight assets
- **Easy updates:** non-technical editing via Decap CMS
- **Low ongoing cost:** no traditional server/CMS hosting required
- **Versioned content:** every change is tracked in Git

## Local development
```bash
bundle install
bundle exec jekyll serve
