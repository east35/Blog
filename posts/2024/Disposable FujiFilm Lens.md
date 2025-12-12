---
title: Disposable FujiFilm Lens
date: 2025-07-21
description: Defying backlog paralysis
category: Hardware Projects
---
**The Desire for Something “Real”**
There’s something magical about physical media—cartridges that click, boxes with wild 90s art, cassettes that rattle softly when you shake them. Digital collections are convenient, but they rarely feel real.

This year I set out to fix that for my MiSTer setup by creating physical, collectible “editions” of my favorite retro games, complete with:
- 3D-printed miniature cassette cases
- Custom-printed game decals
- Embedded NFC cards recognized by Zaparoo, a fantastic NFC-powered MiSTer launcher: https://zaparoo.org/docs/

The result? A shelf full of tiny, tactile game artifacts that instantly boot their corresponding game on the MiSTer when tapped.

This post documents how I built them—and why you might want to try the same.

**Why Build Physical Game Objects for MiSTer?**

If you’ve used the MiSTer FPGA, you already know it’s one of the most accurate and flexible retro-gaming devices ever created. But everything is stored on an SD card, and that can feel oddly intangible.

I wanted something more satisfying—something I could hold, display, and hand to friends like a real game cartridge.

When I discovered Zaparoo, the idea clicked immediately:

> What if each of my favorite retro games existed as a tiny “cassette,” complete with artwork… and tapping the cassette on a reader instantly launched the game?

This project scratches an itch I’ve had for years: bringing the tactility of retro media to the digital convenience of FPGA gaming.

If you like MiSTer, retro hardware, 3D printing, or crafting physical objects that bridge nostalgia and technology, I can’t recommend this enough. The barrier to entry is low, and the creative possibilities are wide open.

**Final Thoughts**
One of the unexpected bonuses of this whole project is how seamlessly it works with my NAS-hosted game library. Instead of storing ROMs directly on the MiSTer’s SD card, I mount my entire collection over the network using MiSTer’s built-in CIFS/NFS support. This means every NFC “cassette” pulls its assigned game from my NAS automatically, no matter where the hardware sits in the house. 

The result is wonderfully frictionless: I get the feeling of handling physical media while still relying on a centralized, well-organized library that updates in one place. It’s retro ritual meets modern network convenience—and it makes the collection far easier to scale without ever touching the MiSTer’s storage again.