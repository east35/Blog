---
title: SpinStack
date: 2025-12-24
description: Bringing the Streaming Experience to Your Vinyl Collection
category: Code Stuff
---
![SpinStack v1](/images/2026/spinstack/morgan.jpg)


I've been collecting vinyl since my aunt first gifted me her collection from when she was a teenager. Like many collectors, I found myself in a familiar paradox: the bigger my collection grew, the harder it became to actually *listen* to it. I'd buy a record, play it once or twice, then watch it disappear into the shelves, buried under newer acquisitions. Meanwhile, my streaming habits were effortless—Spotify and Tidal made it dead simple to discover music, track what I'd heard, and never forget about an album.

The disconnect was glaring. Here I was, investing in physical media for the superior sound quality and tangible experience, but I was listening to it less than the compressed streams on my phone. The problem wasn't the format—it was the **friction**. With streaming, I could see my stats, get personalized recommendations, and queue up albums without thinking. With vinyl, I was flying blind.

That's when SpinStack was born. I wanted to bring the convenience and intelligence of streaming apps to my physical collection, without sacrificing what makes vinyl special.

## How It Works

SpinStack connects directly to your Discogs account, pulling in your entire vinyl collection with all the metadata—album art, artist info, release dates, everything. Once synced, the app becomes your companion for actually *using* your collection.

### Stacks: Smart Playlists for Vinyl

The core concept is "stacks"—curated groups of albums that you literally pull off your shelf and stack next to your turntable. Think of them as playlists, but for physical records. SpinStack generates three types of stacks automatically:

**Daily Stack**: A fresh selection weighted toward records you haven't played recently. It's like Discover Weekly, but for the collection you already own.

**Weekly Stack**: Digging deeper into your least-played records—the ones gathering dust that deserve another spin.

[grid]
![SpinStack v1](/images/2026/spinstack/desktop/stacks.png)
![SpinStack v1](/images/2026/spinstack/desktop/build.png)

[/grid]

**Custom Stacks**: You can also build your own stacks manually, perfect for themed listening sessions or when you want full control.

[grid]
![SpinStack v1](/images/2026/spinstack/mobile/stacks.png)
![SpinStack v1](/images/2026/spinstack/mobile/build.png)
[/grid]

### The Spinning Experience

Once you've got your stack, SpinStack guides you through the listening session. The "Get Ready" view shows you exactly which albums to pull (even numbered for easy stacking). Then, as you spin each record, the app displays beautiful full-screen album art with the vinyl animation, track navigation, and one-tap marking of albums as played or skipped.

It's satisfying in a way that perfectly complements the physical ritual of vinyl—you're still pulling records, dropping needles, and flipping sides, but now you have a digital companion that remembers everything.

[grid]
![SpinStack v1](/images/2026/spinstack/desktop/get_ready.png)
![SpinStack v1](/images/2026/spinstack/desktop/spinning.png)
[/grid]

[grid]
![SpinStack v1](/images/2026/spinstack/mobile/get_ready.png)
![SpinStack v1](/images/2026/spinstack/mobile/spinning.png)
[/grid]


### Stats That Actually Matter

Every time you mark a record as played, SpinStack tracks it. Over time, you build up a listening history that reveals patterns: which artists you gravitate toward, which records never leave the shelf, what you've been playing lately. It's the same data that makes streaming apps addictive, but for the music you actually invested in.

[grid]
![SpinStack v1](/images/2026/spinstack/desktop/stats.png)
![SpinStack v1](/images/2026/spinstack/desktop/details.png)
[/grid]

[grid]
![SpinStack v1](/images/2026/spinstack/mobile/stats.png)
![SpinStack v1](/images/2026/spinstack/mobile/details.png)
[/grid]

## The Technical Journey

Building SpinStack taught me a lot about balancing user experience with the constraints of physical media. Some interesting challenges:

**OAuth with Discogs**: Unlike streaming APIs that give you music *access*, Discogs gives you collection *data*. I had to build the playback experience from scratch, treating the physical records as the "source."

**Mobile-first design**: Most listening sessions happen in front of the turntable, often with your phone nearby. The entire UI needed to work flawlessly on mobile—floating bottom navigation, responsive record animations, scroll-aware headers that stay out of the way.

**The demo problem**: How do you demo an app that requires a Discogs account and vinyl collection? I built a complete mock data system that simulates a real collection, allowing anyone to experience the app even if they don't own a single record.

**Docker deployment**: I wanted this running 24/7 on my Synology NAS, accessible from any device in my home. The whole stack (Node.js backend, Next.js frontend, PostgreSQL, Redis) needed to work seamlessly in containers.

## The Vision Going Forward

SpinStack is fully functional today, but there's so much more I want to build:

**Smart recommendations**: Using collaborative filtering to suggest which records from your collection you'd enjoy based on what you've been playing.

**Social features**: Seeing what your friends are spinning, sharing stacks, maybe even collaborative listening sessions.

**Genre and mood-based stacks**: "Give me 90s hip-hop" or "Something mellow for Sunday morning"—filtering your collection by vibe.

**Marketplace integration**: Tracking the current value of your collection, identifying records that have appreciated, maybe even suggestions for what to sell vs. keep.

**Cross-platform export**: Generate a stack in SpinStack, then create a matching Spotify playlist for when you're away from your turntable.


## Why This Matters

I think we're in a golden age of vinyl collecting, but the tools haven't caught up with the format's renaissance. Discogs is incredible for cataloging and marketplace transactions, but it's not built for the actual experience of listening. Streaming apps are phenomenal at engagement and discovery, but they're fundamentally disconnected from physical media.

SpinStack bridges that gap. It respects the intentionality of vinyl—the ritual of pulling a record, the commitment of listening to a full album side—while adding the modern conveniences we've come to expect. You're not trying to make vinyl behave like streaming; you're enhancing what makes vinyl special.

For me, it's already changed how I engage with my collection. Records I forgot I owned are getting regular spins. I'm tracking my listening habits and discovering patterns. Most importantly, I'm actually *using* the collection I've spent years building, rather than just admiring it on the shelf.

If you're a vinyl collector who's ever felt overwhelmed by your own collection, or if you've wondered why there isn't a "Spotify for vinyl," SpinStack might be exactly what you're looking for.

---


**Try the demo**: [spinstack-demo.netlify.app](https://spinstack.netlify.app)

**GitHub**: [github.com/east35/SpinStack](https://github.com/east35/SpinStack)

**Self-host**: Full Docker setup included for running on your own hardware

The future of vinyl isn't about making it more like streaming—it's about making it easier to love the format for what it is. That's SpinStack.
