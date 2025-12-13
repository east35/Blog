import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import matter from 'gray-matter';
import { embedExtension, mediaGridExtension } from './marked-embeds.js';

const postsDir = './posts';
const publicDir = './public';
const postsPublicDir = './public/posts';
const categoryPublicDir = './public/category';

// Configure marked with embed and media grid extensions
marked.use({ extensions: [embedExtension, mediaGridExtension] });

// Helper to write files with proper permissions
function writeFileWithPermissions(filePath, content) {
  fs.writeFileSync(filePath, content, { mode: 0o644 });
}

// Ensure public directories exist
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { mode: 0o755 });
if (!fs.existsSync(postsPublicDir)) fs.mkdirSync(postsPublicDir, { recursive: true, mode: 0o755 });
if (!fs.existsSync(categoryPublicDir)) fs.mkdirSync(categoryPublicDir, { recursive: true, mode: 0o755 });

// Read and parse all markdown posts from year subdirectories
function getAllPosts() {
  const allPosts = [];

  // Read from year subdirectories
  const entries = fs.readdirSync(postsDir, { withFileTypes: true });

  entries.forEach(entry => {
    if (entry.isDirectory()) {
      const yearDir = path.join(postsDir, entry.name);
      const files = fs.readdirSync(yearDir).filter(f => f.endsWith('.md'));

      files.forEach(filename => {
        const content = fs.readFileSync(path.join(yearDir, filename), 'utf8');
        const { data, content: markdown } = matter(content);
        const html = marked(markdown);
        // Sanitize slug: remove .md extension and replace invalid characters
        const slug = filename
          .replace('.md', '')
          .replace(/[?#]/g, '')  // Remove ? and # characters
          .replace(/\s+/g, '-')  // Replace spaces with hyphens
          .replace(/[^\w-]/g, ''); // Remove other special characters except hyphens

        allPosts.push({
          slug,
          title: data.title,
          date: data.date,
          year: new Date(data.date).getFullYear(),
          description: data.description,
          category: data.category || 'Uncategorized',
          html,
          ...data
        });
      });
    }
  });

  return allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Group posts by year
function groupByYear(posts) {
  return posts.reduce((acc, post) => {
    if (!acc[post.year]) acc[post.year] = [];
    acc[post.year].push(post);
    return acc;
  }, {});
}

// Layout wrapper
function layout(title, content, currentPage = 'home', includeHeader = true) {
  const navLink = currentPage === 'cv'
    ? '<a href="mailto:jimj512@icloud.com">Email</a>'
    : '<a href="/cv.html">CV & Bio</a>';

  const header = includeHeader ? `
  <header>
    <div class="header-content">
      <div>
        <h1><a href="/">Jim Jordan</a></h1>
        <p class="subtitle">Digital Product Design & Development</p>
      </div>
      <nav>
        ${navLink}
      </nav>
    </div>
  </header>` : '';

  const footer = `
  <div class="clouds-section"></div>
  <footer>
    <div class="footer-content">
      <p>&copy; ${new Date().getFullYear()} Jim Jordan</p>
      <p class="footer-location">Made in Austin, <img width="18px" src="/images/texas.svg" alt="Texas" class="texas-icon" /></p>
      <p><a href="mailto:jimj512@icloud.com">Email Me</a></p>
    </div>
  </footer>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=decode-width, initial-scale=1.0">
  <title>${title}</title>
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="stylesheet" href="/styles.css?v=${Date.now()}">
</head>
<body class="page-transition">${header}
  <main>
    ${content}
  </main>
  ${footer}
  <script src="/scripts.js?v=${Date.now()}"></script>
</body>
</html>`;
}

// Generate homepage
function buildHomepage(posts) {
  const gridHTML = generatePostsGrid(posts);
  const html = layout('Jim Jordan', gridHTML);
  writeFileWithPermissions(path.join(publicDir, 'index.html'), html);
}

// Generate the main posts grid (for reuse)
function generatePostsGrid(posts) {
  const postsByYear = groupByYear(posts);
  const years = Object.keys(postsByYear).sort((a, b) => b - a);

  let gridHTML = '';

  years.forEach(year => {
    gridHTML += `<div class="year-section">
      <h2 class="year">${year}</h2>
      <div class="posts-grid">`;

    postsByYear[year].forEach(post => {
      const categorySlug = post.category.toLowerCase().replace(/\s+/g, '-');
      gridHTML += `
        <article class="post-card">
          <h3><a href="/posts/${post.slug}.html">${post.title}</a></h3>
          <p>${post.description}</p>
          <p class="post-date" datetime="${post.date}">${new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} · <a href="/category/${categorySlug}.html" class="post-category">${post.category}</a></p>
        </article>`;
    });

    gridHTML += `</div></div>`;
  });

  return gridHTML;
}

// Generate individual post pages
function buildPostPages(posts) {
  const postsGrid = generatePostsGrid(posts);

  posts.forEach(post => {
    const categorySlug = post.category.toLowerCase().replace(/\s+/g, '-');
    const content = `
      <button class="scroll-nav-btn" onclick="scrollToArchive()" aria-label="Navigate to posts">
        <span>J</span>
      </button>
      <article class="post-detail">
        <h1 class="post-title-clickable" onclick="scrollToArchive()">${post.title}</h1>
        <div class="post-meta">
          <time datetime="${post.date}">${new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} · <a href="/category/${categorySlug}.html" class="post-category">${post.category}</a></time>
        </div>
        <div class="post-content">
          ${post.html}
        </div>
      </article>
      <div class="posts-archive" id="posts-archive">
        <header class="archive-header">
          <div class="header-content">
            <div>
              <h1><a href="/">Jim Jordan</a></h1>
              <p class="subtitle">Digital Product Design & Development</p>
            </div>
            <nav>
              <a href="/cv.html">CV & Bio</a>
            </nav>
          </div>
        </header>
        ${postsGrid}
      </div>
    `;

    const html = layout(post.title, content, 'home', false);
    writeFileWithPermissions(path.join(postsPublicDir, `${post.slug}.html`), html);
  });
}

// Generate category archive pages
function buildCategoryPages(posts) {
  // Group posts by category
  const postsByCategory = posts.reduce((acc, post) => {
    if (!acc[post.category]) acc[post.category] = [];
    acc[post.category].push(post);
    return acc;
  }, {});

  // Generate a page for each category
  Object.entries(postsByCategory).forEach(([category, categoryPosts]) => {
    const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
    const postsByYear = groupByYear(categoryPosts);
    const years = Object.keys(postsByYear).sort((a, b) => b - a);

    let gridHTML = '';
    years.forEach(year => {
      gridHTML += `<div class="year-section">
        <h2 class="year">${year}</h2>
        <div class="posts-grid">`;

      postsByYear[year].forEach(post => {
        const postCategorySlug = post.category.toLowerCase().replace(/\s+/g, '-');
        gridHTML += `
          <article class="post-card">
            <h3><a href="/posts/${post.slug}.html">${post.title}</a></h3>
            <p>${post.description}</p>
            <p class="post-date" datetime="${post.date}">${new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} · <a href="/category/${postCategorySlug}.html" class="post-category">${post.category}</a></p>
          </article>`;
      });

      gridHTML += `</div></div>`;
    });

    const content = `
      <div class="category-archive">
        <h2 class="category-title">${category}</h2>
        ${gridHTML}
      </div>
    `;

    const html = layout(`${category} — Jim Jordan`, content);
    writeFileWithPermissions(path.join(categoryPublicDir, `${categorySlug}.html`), html);
  });
}

// Generate CV page
function buildCVPage() {
  const cvPath = './cv.md';

  if (!fs.existsSync(cvPath)) {
    console.log('⊘ cv.md not found, skipping CV page');
    return;
  }

  const cvContent = fs.readFileSync(cvPath, 'utf8');
  const { data, content: markdown } = matter(cvContent);
  const html = marked(markdown);

  const content = `
    <article class="cv-page">
      ${html}
    </article>
  `;

  const pageTitle = data.title ? `${data.title} — Jim Jordan` : 'CV & Bio — Jim Jordan';
  const fullHtml = layout(pageTitle, content, 'cv');
  writeFileWithPermissions(path.join(publicDir, 'cv.html'), fullHtml);
}

// Copy styles
function copyStyles() {
  const destPath = path.join(publicDir, 'styles.css');
  fs.copyFileSync('./src/styles.css', destPath);
  fs.chmodSync(destPath, 0o644);
}

// Copy scripts
function copyScripts() {
  const destPath = path.join(publicDir, 'scripts.js');
  fs.copyFileSync('./src/scripts.js', destPath);
  fs.chmodSync(destPath, 0o644);
}

// Copy images
function copyImages() {
  const staticImagesDir = './static/images';
  const publicImagesDir = './public/images';

  // Copy images from static/images to public/images if static folder exists
  if (fs.existsSync(staticImagesDir)) {
    // Recursive copy function
    function copyRecursive(src, dest) {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }

      const entries = fs.readdirSync(src, { withFileTypes: true });

      for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
          copyRecursive(srcPath, destPath);
        } else {
          fs.copyFileSync(srcPath, destPath);
          fs.chmodSync(destPath, 0o644);
        }
      }
    }

    copyRecursive(staticImagesDir, publicImagesDir);
    console.log('✓ Copied images');
  }
}

// Copy favicon files
function copyFavicons() {
  const faviconDir = './static/favicon_io';

  if (fs.existsSync(faviconDir)) {
    const faviconFiles = [
      'favicon.ico',
      'favicon-16x16.png',
      'favicon-32x32.png',
      'apple-touch-icon.png',
      'android-chrome-192x192.png',
      'android-chrome-512x512.png',
      'site.webmanifest'
    ];

    faviconFiles.forEach(file => {
      const srcPath = path.join(faviconDir, file);
      const destPath = path.join(publicDir, file);

      if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        fs.chmodSync(destPath, 0o644);
      }
    });

    console.log('✓ Copied favicons');
  }
}

// Build everything
console.log('Building site...');
const posts = getAllPosts();
buildHomepage(posts);
buildPostPages(posts);
buildCategoryPages(posts);
buildCVPage();
copyStyles();
copyScripts();
copyImages();
copyFavicons();
console.log(`✓ Built ${posts.length} posts`);
console.log('✓ Site built successfully');
