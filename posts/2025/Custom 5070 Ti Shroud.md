---
title: Custom 5070 Ti Shroud
date: 2025-07-21
description: Keeping Hot GPUs Cool Under Pressure
category: Hardware Projects
---
## Why Reshroud?

The MSI Gaming RTX 5070 Ti 16G Ventus 3X OC Graphics Card is not a good looking card—it's also the most underperforming card in the 5070 Ti lineup when it comes to keeping things cool. 

![Stock Card](/images/2025/5070ti/MSI-GeForce-RTX-5070-Ti-16G-Ventus-3X-OC-review-13.jpg)


I built and tested this PETG-CF printed shroud and custom fans. Parts list: https://pcpartpicker.com/user/jimj512/saved/CD3qhM

Now, this isn't the most scientific test (just using my iPhone and a dB reading app), but it reflects my real-world use case pretty well.

![Shroud](/images/2025/5070ti/IMG_0683.jpeg)
![Shroud](/images/2025/5070ti/IMG_0673.jpeg)

Here’s the breakdown of how the custom shroud + fan setup compared to stock in both synthetic benchmarks (3DMark) and gaming (The Witcher 3):

| **Metric**          | **Custom (Avg)** | **Custom (Max)** | **Stock (Avg)** | **Stock (Max)** |
| ------------------- | ---------------- | ---------------- | --------------- | --------------- |
| **100% RPM (dB)**   | 40.2             | 43.2             | 54.6            | 56              |
| **50% RPM (dB)**    | 34.4             | 39.6             | 37.3            | 40.5            |
| **3DM - dB**        | 41.4             | 49.9             | 41.7            | 46.8            |
| **3DM - Temp (°C)** | 64               | 71.5             | 61              | 66.95           |
| **3DM - Score**     | 7234             | —                | 7268            | —               |
| **3DM - FPS**       | 72.35            | —                | 72.68           | —               |
| **W3 - dB**         | 44.3             | 49.1             | 39.3            | 43.8            |
| **W3 - Temp (°C)**  | 69–70            | —                | 65–66           | —               |
| **W3 - FPS**        | 123 / 80         | —                | 124 / 81        | —               |

## Graph/Table Summary:
The custom setup notably reduces noise at high RPMs — over 10 dB quieter at full speed, which is huge in acoustic terms. Even at 50% RPM, the custom shroud is a bit quieter. Interestingly, the custom cooling runs a bit warmer under load in 3DMark but delivers nearly the same performance (FPS and score).

In The Witcher 3, the custom setup runs slightly hotter again, but maintains almost the exact same framerate — and with less acoustic footprint at full tilt.

## TL;DR:
Quieter overall, slightly warmer in heavy loads, same gaming performance. I ended up not using this mod—not every project is a win! 