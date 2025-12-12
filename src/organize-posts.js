import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDir = './posts';

// Get all .md files in the posts directory (not in subdirectories)
const files = fs.readdirSync(postsDir)
  .filter(f => f.endsWith('.md') && fs.statSync(path.join(postsDir, f)).isFile());

console.log(`Found ${files.length} posts to organize`);

files.forEach(filename => {
  const filePath = path.join(postsDir, filename);
  const content = fs.readFileSync(filePath, 'utf8');

  try {
    const { data } = matter(content);
    const year = new Date(data.date).getFullYear();
    const yearDir = path.join(postsDir, year.toString());

    // Ensure year directory exists
    if (!fs.existsSync(yearDir)) {
      fs.mkdirSync(yearDir, { recursive: true });
    }

    // Move file
    const newPath = path.join(yearDir, filename);
    fs.renameSync(filePath, newPath);
    console.log(`✓ Moved ${filename} to ${year}/`);
  } catch (err) {
    console.error(`✗ Error processing ${filename}:`, err.message);
  }
});

console.log('Done organizing posts!');
