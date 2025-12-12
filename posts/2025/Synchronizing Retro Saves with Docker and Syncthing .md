---
title: Synchronizing Retro Saves with Docker and Syncthing 
date: 2025-10-08
description: Portable save conversion between MiSTer and Android emulation
category: Code Stuff
---

## Overview

Maintaining consistent save data between different retro gaming environments can be surprisingly tricky. Even when two systems use the same underlying save file format (for example, `.sav` vs `.srm`), differences in naming or tooling can lead to unsynced progress.

To solve this on my own setup, I created **libretro-mister-sync** — a *tiny Docker container* that reliably keeps `.sav` and `.srm` battery-save files in sync inside a designated folder. It works alongside tools like **Syncthing** to ensure that when one save format changes, the other is updated automatically. :contentReference[oaicite:1]{index=1}

---

## The Core Problem

Different retro platforms and emulator front-ends often use distinct save file extensions:

- `.sav` — common on MiSTer cores  
- `.srm` — common on Libretro/RetroArch cores  

Even though the actual battery data is compatible for many systems, the files don’t stay in sync by default. This leads to situations like:

- Playing a game on MiSTer and not seeing progress when launching it on a handheld emulator  
- Manual copying of save files with risk of overwriting or losing progress  
- Sync tools (e.g., Syncthing) updating one file but not reflecting the corresponding save on the other side  

To fix this pain point in a reproducible way, I built a small Docker container that continuously watches for changes and mirrors one format to the other. :contentReference[oaicite:2]{index=2}

---

## How libretro-mister-sync Works

The container monitors a folder (e.g., with Syncthing mounted) and does two things:

1. **When `<game>.sav` changes → update `<game>.srm`**
2. **When `<game>.srm` changes → update `<game>.sav`**

It also preserves timestamps to avoid two common problems:

- **Ping-pong loops**, where changes trigger each other endlessly  
- Sync tools continually seeing updates and re-syncing unnecessarily

It *ignores* temporary or hidden files created by sync tools like Syncthing, keeping only meaningful battery save updates. :contentReference[oaicite:3]{index=3}

Supported systems include but aren’t limited to:

- Game Boy / GB Color / GBA  
- SNES (Super Nintendo)  
- Genesis / Mega Drive  
- Neo Geo Pocket / WonderSwan  
- PC Engine / TurboGrafx-16 :contentReference[oaicite:4]{index=4}

---

## Why This Approach

Long-term emulation setups often rely on **synchronization tools** like Syncthing — a distributed, continuous file sync solution that replicates data between devices (without cloud dependency). :contentReference[oaicite:5]{index=5}

By combining:

- **Syncthing** for cross-device replication, and  
- **libretro-mister-sync** for *format mirroring* within a shared folder,

you get save files that both travel across devices and stay usable on every platform without manual intervention.

Think of it as:

- Syncthing keeps the folder up-to-date across devices
- libretro-mister-sync keeps the save file *usable everywhere*

---

## Quick Start

Here’s how you might run the container:

```bash
docker run -d \
  --name gba-sync-poller \
  --restart unless-stopped \
  -e PUID=1026 \
  -e PGID=100 \
  -e WATCH_DIR=/watch \
  -e POLL_INTERVAL=2 \
  -e INCLUDE_EXTS="sav,srm" \
  -v /path/to/your/saves:/watch \
  ghcr.io/<youruser>/gba-srm-sync:latest
```


(GitHub Repo)[https://github.com/east35/libretro-mister-sync]

**Explanation:**

WATCH_DIR — directory inside the container where your saves live

POLL_INTERVAL — how often the container checks for changes

INCLUDE_EXTS — file extensions to monitor

The volume mount (/path/to/your/saves:/watch) lets Syncthing or your host share files into the container

Once running, the container ensures .sav and .srm files remain mirrored as they change. 
GitHub

**Use Cases**

This setup is especially useful when:
- You’re syncing save files across devices with Syncthing
- You use both MiSTer and a handheld emulator (Libretro/RetroArch)
- You don’t want to manually copy or rename battery saves
- You want consistent progress no matter which platform you pick up

**Design Principles**

This project embodies a few core ideas:
- Toolchain interoperability: Let Syncthing handle transport, let the container handle format correctness
- Stateless containers: No persistence or hidden state outside mounted volumes
- Minimal surface area: Focused on solving one problem well

Because of its narrow, practical focus, it fits cleanly into automated workflows for retro gaming rigs and home server syncs.
