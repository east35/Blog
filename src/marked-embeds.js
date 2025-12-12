// Custom Marked extension for embedding videos, Figma prototypes, and media grids

export const embedExtension = {
  name: 'embed',
  level: 'inline',
  start(src) {
    return src.match(/\[(?:youtube|figma|video):/)?.index;
  },
  tokenizer(src) {
    // Match patterns like [youtube:VIDEO_ID], [figma:FILE_ID], or [video:/path/to/video.mp4]
    const rule = /^\[(youtube|figma|video):([^\]]+)\]/;
    const match = rule.exec(src);

    if (match) {
      return {
        type: 'embed',
        raw: match[0],
        service: match[1],
        id: match[2]
      };
    }
  },
  renderer(token) {
    if (token.service === 'youtube') {
      return renderYouTube(token.id);
    } else if (token.service === 'figma') {
      return renderFigma(token.id);
    } else if (token.service === 'video') {
      return renderLocalVideo(token.id);
    }
  }
};

export const mediaGridExtension = {
  name: 'mediaGrid',
  level: 'block',
  start(src) {
    const match = src.match(/\[grid\]/);
    return match?.index;
  },
  tokenizer(src) {
    // Match [grid] ... [/grid] blocks, accounting for any leading text
    const rule = /^\[grid\]\s*([\s\S]*?)\s*\[\/grid\]/;
    const match = rule.exec(src);

    if (match) {
      return {
        type: 'mediaGrid',
        raw: match[0],
        content: match[1].trim(),
        tokens: []
      };
    }
  },
  renderer(token) {
    return renderMediaGrid(token.content);
  }
};

function renderYouTube(videoId) {
  // Extract video ID from various YouTube URL formats or use direct ID
  let id = videoId;

  // Handle full URLs
  if (videoId.includes('youtube.com') || videoId.includes('youtu.be')) {
    const urlMatch = videoId.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?\/\s]+)/);
    if (urlMatch) {
      id = urlMatch[1];
    }
  }

  return `
    <div class="embed-container embed-youtube">
      <iframe
        src="https://www.youtube.com/embed/${id}"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        loading="lazy"
      ></iframe>
    </div>
  `;
}

function renderFigma(fileId) {
  // Handle Figma URLs or direct file IDs
  // Supports formats:
  // - file/ABC123/prototype or proto/ABC123
  // - Full Figma URLs
  let embedUrl = fileId;

  // If it's not already a full URL, construct the embed URL
  if (!fileId.startsWith('http')) {
    // Handle file/ABC123 or proto/ABC123 format
    if (fileId.includes('/')) {
      const parts = fileId.split('/');
      if (parts[0] === 'file' || parts[0] === 'proto') {
        embedUrl = `https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/proto/${parts[1]}`;
      } else {
        embedUrl = `https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/${fileId}`;
      }
    } else {
      // Just a file ID
      embedUrl = `https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/${fileId}`;
    }
  } else if (fileId.includes('figma.com')) {
    // Convert full Figma URL to embed URL with scaling parameter
    // Add scaling=scale-down-width to contain the prototype within the frame
    const separator = fileId.includes('?') ? '&' : '?';
    const scalingParam = fileId.includes('scaling=') ? '' : 'scaling=scale-down-width';
    const urlWithScaling = scalingParam ? `${fileId}${separator}${scalingParam}` : fileId;
    embedUrl = `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(urlWithScaling)}`;
  }

  return `
    <div class="embed-container embed-figma">
      <iframe
        src="${embedUrl}"
        frameborder="0"
        allowfullscreen
        loading="lazy"
      ></iframe>
    </div>
  `;
}

function renderLocalVideo(videoPath) {
  // Support for local video files
  // Detect file extension for proper source type
  const extension = videoPath.split('.').pop().toLowerCase();
  const mimeTypes = {
    'mp4': 'video/mp4',
    'webm': 'video/webm',
    'ogg': 'video/ogg',
    'mov': 'video/mp4'
  };
  const mimeType = mimeTypes[extension] || 'video/mp4';

  return `
    <div class="embed-container embed-video">
      <video controls preload="metadata" playsinline>
        <source src="${videoPath}" type="${mimeType}">
        Your browser does not support the video tag.
      </video>
    </div>
  `;
}

function renderMediaGrid(content) {
  // Parse content for images and videos
  // Supports: ![alt](/path.jpg), [video:/path.mp4], [youtube:ID]
  const items = [];

  // Match markdown images
  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  let match;
  while ((match = imageRegex.exec(content)) !== null) {
    items.push({
      type: 'image',
      alt: match[1],
      src: match[2]
    });
  }

  // Match video embeds
  const videoRegex = /\[video:([^\]]+)\]/g;
  while ((match = videoRegex.exec(content)) !== null) {
    items.push({
      type: 'video',
      src: match[1]
    });
  }

  if (items.length === 0) return '';

  const gridItems = items.map(item => {
    if (item.type === 'image') {
      return `<div class="media-grid-item"><img src="${item.src}" alt="${item.alt}" loading="lazy"></div>`;
    } else if (item.type === 'video') {
      const extension = item.src.split('.').pop().toLowerCase();
      const mimeTypes = {
        'mp4': 'video/mp4',
        'webm': 'video/webm',
        'ogg': 'video/ogg',
        'mov': 'video/mp4'
      };
      const mimeType = mimeTypes[extension] || 'video/mp4';
      return `<div class="media-grid-item"><video controls preload="metadata" playsinline><source src="${item.src}" type="${mimeType}"></video></div>`;
    }
  }).join('');

  return `<div class="media-grid">${gridItems}</div>`;
}
