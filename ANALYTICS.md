# Analytics Setup

This site includes a simple, privacy-respecting analytics implementation.

## What It Tracks

- Page path (e.g., `/posts/example.html`)
- Referrer (where visitors came from)
- Timestamp
- Viewport size (for responsive design insights)
- User agent (browser/device info - anonymous)

## What It Doesn't Track

- No cookies
- No personal information
- No cross-site tracking
- No IP addresses stored
- No unique user IDs
- Automatically disabled on localhost

## How It Works

1. **Client-side** (`src/scripts.js`):
   - Tracks page view on load
   - Only runs in production (not on localhost)
   - Sends minimal data to `/api/analytics`

2. **Server-side** (`api/analytics.js`):
   - Receives analytics data
   - Stores to `analytics.log` file
   - Can be adapted for database storage

## Viewing Analytics

Run this command to see your analytics:

```bash
npm run analytics
```

This will show:
- Total page views
- Top pages
- Top referrers
- Views by date

## Deployment

### For Netlify (Recommended Setup)

Netlify serverless functions are stateless, so you have three options:

#### Option 1: Netlify Function Logs (Simplest)
Use `netlify/functions/analytics.js` - logs to Netlify's function logs.

**Pros:**
- Zero setup, works immediately
- View logs in Netlify dashboard: Site → Functions → analytics

**Cons:**
- Logs rotate after 7 days
- Need to parse logs manually
- Can't query programmatically

#### Option 2: Netlify Blobs (Recommended)
Use `netlify/functions/analytics-blobs.js` - persistent storage.

**Setup:**
```bash
npm install @netlify/blobs
```

Update `src/scripts.js` to use:
```javascript
fetch('/.netlify/functions/analytics-blobs', {
```

**View your stats:**
Visit `https://yoursite.netlify.app/.netlify/functions/view-analytics`

**Pros:**
- Free persistent storage
- Queryable via function
- No external services needed

**Cons:**
- Requires package installation
- Limited to Netlify

#### Option 3: External Service
Use a third-party analytics service (see below).

### For Vercel

The `api/analytics.js` file works but has the same stateless limitations. Consider:
- Vercel KV for storage
- External database
- Third-party service

### For Static Hosting

If you're using static hosting (no serverless support), you have a few options:

1. **Use a third-party service**: Replace the fetch URL with a service like:
   - Plausible.io
   - Umami
   - Simple Analytics

2. **Use your own backend**: Point the fetch to your own API server

3. **Remove analytics**: Simply delete the analytics code from `scripts.js`

## Privacy First

This implementation is intentionally minimal and privacy-focused:
- No tracking across sessions
- No personal data
- No cookies
- Open and transparent
- Easy to disable

To disable analytics completely, remove the analytics code from `src/scripts.js` and rebuild.
