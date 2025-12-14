// Netlify Function for analytics
// Logs to Netlify's function logs (viewable in Netlify dashboard)

export async function handler(event) {
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
      userAgent: event.headers['user-agent'] || 'unknown',
      ip: event.headers['x-forwarded-for'] || event.headers['client-ip'] || 'unknown'
    };

    // Log to Netlify function logs (viewable in Netlify dashboard)
    // Format as structured JSON for easy parsing
    console.log('ANALYTICS:', JSON.stringify(entry));

    // Return success
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
