// Smooth scroll to posts archive when clicking post title
function scrollToArchive() {
  const archive = document.getElementById('posts-archive');
  if (archive) {
    archive.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Show/hide scroll navigation button based on scroll position
document.addEventListener('DOMContentLoaded', () => {
  const scrollNavBtn = document.querySelector('.scroll-nav-btn');
  const archive = document.getElementById('posts-archive');

  if (scrollNavBtn && archive) {
    let ticking = false;

    const updateScrollNav = () => {
      const scrollY = window.scrollY;
      const archiveTop = archive.offsetTop;
      const windowHeight = window.innerHeight;

      // Show button after scrolling down 300px, but hide when archive is in view
      if (scrollY > 300 && scrollY + windowHeight < archiveTop + 200) {
        scrollNavBtn.classList.add('visible');
      } else {
        scrollNavBtn.classList.remove('visible');
      }

      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollNav);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', requestTick, { passive: true });

    // Initial check
    updateScrollNav();
  }
});

// Page transition animations
document.addEventListener('DOMContentLoaded', () => {
  // Fade in page on load with slight delay for smoother appearance
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.classList.add('page-loaded');
    });
  });

  // Add smooth transitions to internal links
  const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"]');

  internalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');

      // Skip if it's an anchor link on the same page
      if (href.startsWith('#')) return;

      // Skip if it's opening in a new tab
      if (link.target === '_blank') return;

      // Skip mailto links
      if (href.startsWith('mailto:')) return;

      e.preventDefault();

      // Fade out current page
      document.body.classList.remove('page-loaded');
      document.body.classList.add('page-leaving');

      // Navigate after animation
      setTimeout(() => {
        window.location.href = href;
      }, 350);
    });
  });
});

// Fix for browser back/forward buttons - ensure page shows correctly
window.addEventListener('pageshow', (event) => {
  // If page is loaded from cache (bfcache)
  if (event.persisted) {
    // Reset the page state
    document.body.classList.remove('page-leaving');
    document.body.classList.add('page-loaded');
  }
});

// Progressive image loading with blur-up effect
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('.post-content img');

  images.forEach(img => {
    // Skip if already loaded
    if (img.complete) {
      img.classList.add('img-loaded');
      return;
    }

    // Add loading class
    img.classList.add('img-loading');

    // When image loads, add loaded class
    img.addEventListener('load', () => {
      img.classList.remove('img-loading');
      img.classList.add('img-loaded');
    });

    // Handle errors
    img.addEventListener('error', () => {
      img.classList.remove('img-loading');
    });
  });
});

// Simple, privacy-respecting analytics
function trackPageView() {
  // Only track in production (not on localhost)
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return;
  }

  const data = {
    page: window.location.pathname,
    referrer: document.referrer || 'direct',
    timestamp: new Date().toISOString(),
    viewport: `${window.innerWidth}x${window.innerHeight}`
  };

  // Send to analytics endpoint
  // For Netlify with Blobs: use /.netlify/functions/analytics-blobs
  // For Netlify simple logs: use /.netlify/functions/analytics
  // For Vercel: use /api/analytics
  const endpoint = '/.netlify/functions/analytics';

  fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    keepalive: true
  }).catch(() => {
    // Silently fail - analytics shouldn't break UX
  });
}

// Track page view on load
document.addEventListener('DOMContentLoaded', trackPageView);
