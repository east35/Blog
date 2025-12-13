---
title: Building a Blog in 1,479 Lines of Code
date: 2025-12-13
description: Why I built a static site generator from scratch instead of using Gatsby, Next.js, or WordPress.
category: Code Stuff
---

# Building a Blog in 1,479 Lines of Code

Modern web development has a complexity problem. Want to start a blog? You'll need React, webpack, babel, a CSS-in-JS library, a GraphQL layer, and about 300MB of node_modules before you write a single word.

I wanted something different. Something that felt like the early web—when HTML was just HTML, CSS was just styling, and JavaScript was optional. Not out of nostalgia, but because most blogs don't need the complexity we've normalized.

## The Constraints

I gave myself three rules:

1. **No client-side frameworks** - No React, Vue, or Svelte. Just vanilla JavaScript where necessary.
2. **Static generation only** - Markdown files go in, HTML files come out. No server-side rendering, no edge functions, no complexity.
3. **Minimal dependencies** - If I can build it myself in an afternoon, I should.

The entire blog—build system, styling, image optimization, embed support—is 1,479 lines of code across four files:

- `build.js` (358 lines) - Static site generator
- `styles.css` (780 lines) - Brutalist design system
- `marked-embeds.js` (220 lines) - YouTube/Figma embed support
- `scripts.js` (121 lines) - Progressive enhancement

Zero client-side dependencies. Two build dependencies: `marked` for markdown parsing and `gray-matter` for frontmatter. That's it.

## How It Works

The build system is deliberately simple:

```javascript
// 1. Read markdown files from posts/year/ directories
const posts = getAllPosts();

// 2. Parse frontmatter and convert markdown to HTML
const { data, content: markdown } = matter(content);
const html = marked(markdown);

// 3. Wrap in layout and write to public/
writeFileWithPermissions(`${slug}.html`, layout(title, content));
```

That's the core. Everything else is just refinement.

### Custom Markdown Extensions

Standard markdown doesn't handle YouTube embeds or media grids. Instead of reaching for a plugin ecosystem, I wrote custom extensions for `marked`:

```markdown
[youtube:VIDEO_ID]
[figma:PROTOTYPE_ID]
[video:/path/to/video.mp4]

[grid]
![Image 1](/path/to/img1.jpg)
![Image 2](/path/to/img2.jpg)
[/grid]
```

Each extension is about 50 lines of code. The YouTube renderer extracts video IDs and wraps them in responsive containers. The grid parser creates masonry layouts from markdown image syntax. No React components, no build-time complexity—just string manipulation.

### Performance Without Trying

When you don't ship a framework, performance comes naturally:

- **No JavaScript required** - The entire site works with JS disabled
- **System fonts only** - No font files, no FOUT, no layout shift
- **Lazy-loaded embeds** - YouTube iframes load on-demand
- **Progressive images** - Blur-up effect with vanilla JavaScript
- **Dark mode via CSS** - `prefers-color-scheme` handles everything

The homepage—with 39 posts listed—is 24KB of HTML and 12KB of CSS. Total. No code splitting needed when there's nothing to split.

## The Design Philosophy

I call it brutalist, but it's really just honest. Typography-first, minimal decoration, content above everything else. The design system respects user preferences:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --text-primary: #f0f0f0;
    --background: #1a1a1a;
  }
}
```

No JavaScript theme toggles. No localStorage. No flash of wrong theme. The browser tells me what the user wants, and I respect it.

## The Deployment Story

The blog runs on a Synology NAS in my apartment, deployed via git hooks:

```bash
./deploy.sh  # Builds, commits, pushes to NAS
# NAS receives push, rebuilds Docker container, serves updated site
```

Total hosting cost: $0/month. Total infrastructure complexity: Docker Compose with nginx. No CDN, no serverless functions, no build minutes to track. Just a static site served from a machine I control.

Could I use Netlify or Vercel? Sure. But there's something satisfying about `git push` directly updating your site, no third-party dashboard required.

## What I Learned

**You probably don't need a framework.** If your content is mostly static, if you're not building an app with complex state, if your interaction model is "click link, read page"—you probably don't need React. You definitely don't need Next.js.

**Build tools should be boring.** The entire build system is a single Node script with no config file. No webpack, no vite, no esbuild. Just `fs.readFileSync` and `fs.writeFileSync`. It builds 39 posts in under a second.

**Constraints breed creativity.** Not allowing myself to reach for npm packages meant I actually understood how YouTube embed aspect ratios work, how to parse markdown ASTs, how to generate semantic HTML. I learned more building this than I would have wiring together plugins.

## The Numbers

- **1,479 lines of code** - Total project size (excluding posts)
- **2 dependencies** - marked, gray-matter
- **24KB HTML** - Homepage payload
- **<1 second** - Full site build time
- **39 posts** - Dating back to 2014
- **$0/month** - Hosting cost

## The Code

The entire blog is open-source. You can read every line, fork it, strip out the personal stuff, and make it yours. No license restrictions, no attribution required.

It's not revolutionary. It's not even particularly clever. It's just a reminder that most web projects don't need the complexity we've normalized.

Sometimes the best tool is the one you can understand completely.

[View the source code](https://github.com/east35/Blog)
