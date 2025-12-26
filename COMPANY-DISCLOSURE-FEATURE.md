# Company Disclosure Feature

## Overview
This feature allows you to automatically add a professional disclosure note to blog posts that were created while working at a specific company.

## How to Use

### Adding Company Disclosure to a Post

Simply add a `company` field to your post's frontmatter:

```markdown
---
title: Your Post Title
date: 2024-01-01
description: Your description
category: Case Study
company: Company Name
---
```

### Making the Company Name a Link (Optional)

You can also add a `company_url` field to make the company name clickable:

```markdown
---
title: Your Post Title
date: 2024-01-01
description: Your description
category: Case Study
company: Company Name
company_url: https://www.company.com
---
```

### Result

When a post has a `company` field, a disclosure note will automatically appear at the top of the post content:

**Without URL:**
> **Note:** I designed this product as part of my work at Company Name.

**With URL:**
> **Note:** I designed this product as part of my work at [Company Name](https://www.company.com).

### Posts Without Company Field

If you don't include the `company` field (or leave it empty), no disclosure note will appear. This ensures the feature only shows up when needed.

## Technical Implementation

### Files Modified

1. **src/build.js** - Added logic to inject company disclosure HTML when rendering post pages
2. **src/styles.css** - Added styling for the `.company-disclosure` class

### Styling

The disclosure note features:
- Smaller font size (14px) for subtlety
- Left border accent matching your site's design
- Subtle background color
- Proper spacing (margin-bottom: 32px)
- Dark mode support
- Optional clickable company links with hover states matching your site's link styling

### Example Posts to Update

Consider adding the `company` field to these posts:

- `posts/2015/Designing-a-Native-Writing-Experience-with-Grammarly.md` → `company: Grammarly`
- `posts/2015/Designing-Grammarly-for-the-Open-Web.md` → `company: Grammarly`
- `posts/2016/Reimagining-Indeed-Designing-Trust-at-Scale.md` → `company: Indeed`
- `posts/2015/Designing-Pingboard-Human-Centered-HR.md` → `company: Pingboard`
- And any others where you worked on products as part of employment

## Testing

The feature has been tested and verified to work correctly:
- ✅ Posts with `company` field display the disclosure
- ✅ Posts without `company` field show nothing
- ✅ Empty `company` field is handled gracefully
- ✅ Company URLs make the company name clickable with proper target="_blank" and rel attributes
- ✅ Posts with company but no URL show plain text company name

## Branch

This feature is currently on the `company-disclosure-feature` branch. Once you're happy with it, you can merge it to `main`.
