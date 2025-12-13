import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const imagesDir = './public/images';
const maxWidth = 1200; // Max width for blog images
const quality = 85; // JPEG quality

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();

  // Skip SVG files
  if (ext === '.svg') return;

  // Skip already optimized files
  if (filePath.includes('-optimized')) return;

  // Skip non-image files
  if (!['.jpg', '.jpeg', '.png', '.webp', '.heic'].includes(ext)) return;

  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();

    // Only optimize if image is larger than maxWidth for landscape
    // For portrait images, check height instead
    const isPortrait = metadata.height > metadata.width;
    const dimensionToCheck = isPortrait ? metadata.height : metadata.width;

    if (dimensionToCheck <= maxWidth) {
      console.log(`⊘ Skipping ${path.basename(filePath)} (already optimized size)`);
      return;
    }

    const outputPath = filePath.replace(ext, `-optimized${ext}`);

    // Calculate resize dimensions while preserving aspect ratio
    let resizeOptions = {
      withoutEnlargement: true,
      fit: 'inside'
    };

    // Resize based on orientation
    if (isPortrait && metadata.height > maxWidth) {
      resizeOptions.height = maxWidth;
    } else if (!isPortrait && metadata.width > maxWidth) {
      resizeOptions.width = maxWidth;
    }

    // Build the processing pipeline
    let pipeline = image
      .rotate() // Automatically rotate based on EXIF orientation
      .resize(resizeOptions);

    // Use appropriate format based on original file
    if (ext === '.png') {
      pipeline = pipeline.png({ quality, compressionLevel: 9 });
    } else if (ext === '.webp') {
      pipeline = pipeline.webp({ quality });
    } else {
      // Default to JPEG for .jpg, .jpeg, .heic
      pipeline = pipeline.jpeg({ quality, mozjpeg: true });
    }

    await pipeline.toFile(outputPath);

    const originalSize = fs.statSync(filePath).size;
    const optimizedSize = fs.statSync(outputPath).size;
    const savings = ((1 - optimizedSize / originalSize) * 100).toFixed(1);

    console.log(`✓ Optimized ${path.basename(filePath)} → ${path.basename(outputPath)} (saved ${savings}%)`);

    // Replace original with optimized version
    fs.unlinkSync(filePath);
    fs.renameSync(outputPath, filePath);

  } catch (err) {
    console.error(`✗ Error optimizing ${filePath}:`, err.message);
  }
}

async function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (entry.isFile()) {
      await optimizeImage(fullPath);
    }
  }
}

console.log('Optimizing images...');
processDirectory(imagesDir)
  .then(() => {
    console.log('✓ Image optimization complete!');
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
