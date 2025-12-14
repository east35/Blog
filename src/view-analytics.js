// Simple analytics viewer
// Run with: node src/view-analytics.js

import fs from 'fs';
import path from 'path';

const logPath = path.join(process.cwd(), 'analytics.log');

if (!fs.existsSync(logPath)) {
  console.log('No analytics data found yet.');
  process.exit(0);
}

const lines = fs.readFileSync(logPath, 'utf-8').trim().split('\n');
const entries = lines.map(line => JSON.parse(line));

// Calculate stats
const pageViews = {};
const referrers = {};
const dates = {};

entries.forEach(entry => {
  // Count page views
  pageViews[entry.page] = (pageViews[entry.page] || 0) + 1;

  // Count referrers
  referrers[entry.referrer] = (referrers[entry.referrer] || 0) + 1;

  // Count by date
  const date = entry.timestamp.split('T')[0];
  dates[date] = (dates[date] || 0) + 1;
});

console.log('\n📊 Analytics Summary\n');
console.log(`Total page views: ${entries.length}`);
console.log(`Unique pages: ${Object.keys(pageViews).length}`);
console.log(`Date range: ${Object.keys(dates).sort()[0]} to ${Object.keys(dates).sort().pop()}`);

console.log('\n📄 Top Pages:');
Object.entries(pageViews)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 10)
  .forEach(([page, count]) => {
    console.log(`  ${count.toString().padStart(4)} - ${page}`);
  });

console.log('\n🔗 Top Referrers:');
Object.entries(referrers)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 10)
  .forEach(([ref, count]) => {
    console.log(`  ${count.toString().padStart(4)} - ${ref}`);
  });

console.log('\n📅 Views by Date:');
Object.entries(dates)
  .sort((a, b) => a[0].localeCompare(b[0]))
  .forEach(([date, count]) => {
    const bar = '█'.repeat(Math.ceil(count / 5));
    console.log(`  ${date}: ${bar} ${count}`);
  });

console.log('\n');
