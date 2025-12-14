// Simple, privacy-respecting analytics
// Tracks only: page views, referrer, and timestamp
// No cookies, no personal data, no tracking across sessions

export function trackPageView() {
  // Only track in production (when deployed)
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return;
  }

  const data = {
    page: window.location.pathname,
    referrer: document.referrer || 'direct',
    timestamp: new Date().toISOString(),
    // Optional: track viewport size for responsive design insights
    viewport: `${window.innerWidth}x${window.innerHeight}`
  };

  // Send to your analytics endpoint
  // This would be a simple serverless function or API endpoint you control
  fetch('/api/analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    // Don't wait for response, fire and forget
    keepalive: true
  }).catch(() => {
    // Silently fail - analytics shouldn't break the user experience
  });
}
