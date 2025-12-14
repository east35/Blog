// Simple analytics endpoint
// This stores page views in a JSON file (for Vercel/Netlify serverless functions)
// For production, you might want to use a database or logging service

import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { page, referrer, timestamp, viewport } = req.body;

    // Validate data
    if (!page || !timestamp) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create analytics entry
    const entry = {
      page,
      referrer,
      timestamp,
      viewport,
      // Add user agent for device/browser insights (anonymous)
      userAgent: req.headers['user-agent'] || 'unknown'
    };

    // Log to file (simple approach)
    // In production, you'd want to use a database or service like:
    // - Cloudflare Analytics Engine
    // - Supabase
    // - Simple S3/R2 bucket
    // - Your own database
    const logPath = path.join(process.cwd(), 'analytics.log');
    fs.appendFileSync(logPath, JSON.stringify(entry) + '\n');

    // Return success
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
