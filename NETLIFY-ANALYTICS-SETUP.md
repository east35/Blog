# Netlify Analytics Setup Guide

Quick guide to get analytics working on Netlify.

## Quick Start (Option 1: Function Logs)

**No setup needed!** The default `netlify/functions/analytics.js` will log page views to Netlify's function logs.

### Viewing Analytics

1. Go to your Netlify dashboard
2. Click on your site
3. Go to **Functions** tab
4. Click on **analytics** function
5. View the logs

Logs are structured as:
```
ANALYTICS: {"page":"/posts/example.html","referrer":"https://google.com",...}
```

**Note:** Logs rotate after 7 days.

---

## Better Option (Option 2: Netlify Blobs)

For persistent, queryable analytics:

### 1. Install Dependencies

```bash
npm install @netlify/blobs
```

### 2. Update Client Code

Edit `src/scripts.js` and change:

```javascript
const endpoint = '/.netlify/functions/analytics-blobs';
```

### 3. Rebuild

```bash
npm run build
```

### 4. Deploy

Push to your git repository and Netlify will deploy automatically.

### 5. View Analytics

Visit: `https://yoursite.netlify.app/.netlify/functions/view-analytics`

This returns JSON with:
- Total page views
- Top pages
- Top referrers
- Views by date

You can also create a simple HTML dashboard to visualize this data.

---

## Creating a Dashboard

Create `netlify/functions/dashboard.js`:

```javascript
import { getStore } from '@netlify/blobs';

export async function handler() {
  const analyticsStore = getStore('analytics');
  const entries = [];

  for await (const { value } of analyticsStore.list()) {
    entries.push(JSON.parse(value));
  }

  const pageViews = {};
  entries.forEach(entry => {
    pageViews[entry.page] = (pageViews[entry.page] || 0) + 1;
  });

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Analytics Dashboard</title>
      <style>
        body { font-family: system-ui; max-width: 800px; margin: 40px auto; padding: 20px; }
        h1 { margin-bottom: 30px; }
        .stat { background: #f5f5f5; padding: 20px; margin: 10px 0; border-radius: 8px; }
        .stat h2 { margin-top: 0; font-size: 18px; }
        .list { list-style: none; padding: 0; }
        .list li { padding: 8px 0; border-bottom: 1px solid #ddd; }
        .count { float: right; font-weight: bold; }
      </style>
    </head>
    <body>
      <h1>📊 Analytics Dashboard</h1>
      <div class="stat">
        <h2>Total Page Views</h2>
        <p style="font-size: 32px; margin: 0;">${entries.length}</p>
      </div>
      <div class="stat">
        <h2>Top Pages</h2>
        <ul class="list">
          ${Object.entries(pageViews)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([page, count]) => `
              <li>${page}<span class="count">${count}</span></li>
            `).join('')}
        </ul>
      </div>
    </body>
    </html>
  `;

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/html' },
    body: html
  };
}
```

Then visit: `https://yoursite.netlify.app/.netlify/functions/dashboard`

---

## Privacy & Security

### Protecting Your Dashboard

Add password protection or IP allowlist in Netlify settings:

1. Go to Site settings → Build & deploy → Post processing
2. Add snippet injection to protect the dashboard route

Or use Netlify's Identity/Auth for protection.

---

## Troubleshooting

### Function not found
- Make sure the `netlify/functions` directory is at the root of your repo
- Check Netlify build logs to confirm functions were deployed

### No data appearing
- Check browser console for errors
- Verify the endpoint URL is correct
- Test on a non-localhost domain (analytics is disabled on localhost)

### Blobs not working
- Ensure `@netlify/blobs` is installed
- Check Netlify function logs for errors
- Verify your Netlify plan supports Blobs (it's in the free tier)

---

## Alternative: Just Use the Logs

If you want to keep it simple, stick with the default `analytics.js` function and just check the logs in your Netlify dashboard. You can export them or parse them with a script when needed.
