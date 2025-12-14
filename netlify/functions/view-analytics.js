// Netlify Function to view analytics from Blobs
// Install: npm install @netlify/blobs

import { getStore } from '@netlify/blobs';

export async function handler(event, context) {
  // Only accept GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Get Netlify Blobs store
    const analyticsStore = getStore('analytics');

    // Get all analytics entries
    const entries = [];
    for await (const { key, value } of analyticsStore.list()) {
      entries.push(JSON.parse(value));
    }

    // Calculate stats
    const pageViews = {};
    const referrers = {};
    const dates = {};

    entries.forEach(entry => {
      pageViews[entry.page] = (pageViews[entry.page] || 0) + 1;
      referrers[entry.referrer] = (referrers[entry.referrer] || 0) + 1;
      const date = entry.timestamp.split('T')[0];
      dates[date] = (dates[date] || 0) + 1;
    });

    const stats = {
      total: entries.length,
      uniquePages: Object.keys(pageViews).length,
      topPages: Object.entries(pageViews)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10),
      topReferrers: Object.entries(referrers)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10),
      viewsByDate: Object.entries(dates).sort((a, b) => a[0].localeCompare(b[0]))
    };

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(stats, null, 2)
    };
  } catch (error) {
    console.error('Analytics error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
}
