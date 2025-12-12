# Personal Site & Blog

A brutalist, performant personal website and blog built with vanilla HTML, CSS, and minimal JavaScript.

## Philosophy

- **Brutalist design** - Clean typography, minimal decoration, content-first
- **Performance** - Fast load times, no unnecessary dependencies
- **Simplicity** - Static HTML generated from markdown files
- **Accessibility** - Respects user preferences (light/dark mode, font size)

## Structure

```
posts/          # Markdown blog posts
src/
  build.js      # Static site generator
  styles.css    # Brutalist CSS with dark mode support
public/         # Generated static site (gitignored)
```

## Usage

### Writing a new post

Create a markdown file in the `posts/` directory:

```markdown
---
title: Your Post Title
date: 2025-01-15
description: A brief description of your post
---

Your content here in markdown...
```

### Building the site

```bash
npm run build
```

This generates the static site in the `public/` directory.

### Development

```bash
npm run dev
```

This builds the site and starts a local server at http://localhost:3000

### Deployment

#### Self-hosted on Synology NAS (Recommended)

This project is configured for automated deployment to a Synology NAS via git push:

```bash
# One-time setup: Follow instructions in nas-setup/SETUP.md

# Deploy updates
./deploy.sh
```

The deployment script:
1. Builds the static site
2. Commits your changes
3. Pushes to your NAS git repository
4. Auto-rebuilds and restarts the Docker container on the NAS

See [nas-setup/SETUP.md](nas-setup/SETUP.md) for complete setup instructions.

#### Other hosting options

The `public/` directory contains your complete static site. You can also deploy to:

- **Netlify** - Drag and drop the public folder
- **Vercel** - Connect your repo and set build command to `npm run build`
- **GitHub Pages** - Push the public folder to gh-pages branch
- **Any static host** - Just upload the public folder

## Features

- ✓ Three-column grid layout (responsive)
- ✓ Dark/light mode (follows system preference)
- ✓ Markdown to HTML conversion
- ✓ Posts organized by year
- ✓ Individual post pages
- ✓ CV & Bio page
- ✓ Zero JavaScript on the frontend
- ✓ System fonts only
- ✓ Semantic HTML

## Customization

Edit these files to customize:

- `src/build.js` - Site structure and templates
- `src/styles.css` - Visual design
- `posts/` - Your content

## License

MIT
