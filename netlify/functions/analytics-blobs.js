// Netlify Function using Blobs for persistent storage
// Install: npm install @netlify/blobs

import { getStore } from '@netlify/blobs';

export async function handler(event, context) {
  // Only accept POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { page, referrer, timestamp, viewport } = JSON.parse(event.body);

    // Validate data
    if (!page || !timestamp) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    // Create analytics entry
    const entry = {
      page,
      referrer,
      timestamp,
      viewport,
      userAgent: event.headers['user-agent'] || 'unknown'
    };

    // Get Netlify Blobs store
    const analyticsStore = getStore('analytics');

    // Use timestamp as key to avoid conflicts
    const key = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Store the analytics entry
    await analyticsStore.set(key, JSON.stringify(entry));

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    console.error('Analytics error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
}
