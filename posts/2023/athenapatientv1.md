---
title: Putting Patients First—Designing athenaPatient
date: 2023-01-15
description: Shipping healthcare product in a fragmented enviornment. 
category: Case Study
---

# Putting Patients First: Designing athenaPatient

Healthcare is fragmented. Anyone who's juggled multiple patient portals—each with different logins, interfaces, and URLs—knows this intimately. When I joined the athenaPatient project, we faced what seemed like a straightforward challenge: consolidate a patient's healthcare data from any athenahealth provider into a single, unified experience.

But there was a catch. We'd be building a patient-first product on top of an infrastructure designed entirely around providers.

## The Fundamental Contradiction

[athenaPatient](https://www.athenahealth.com/solutions/patient-engagement/athenapatient-app) represents athenahealth's first true patient-centered experience. Previously, our patient-facing products were provider-branded—"provided by athenahealth." Each provider operated independently within our ecosystem, creating silos that patients had to navigate.

The challenge wasn't just philosophical. Our entire backend was architected with providers as the primary entity. Patient data lived within provider contexts. Flipping this paradigm meant designing around constraints that most patient-facing apps never encounter.

Take something as simple as displaying a patient's name. In a provider-first system, multiple patients might share the same name across different practices. Our solution? Always display date of birth alongside names. It became a pattern throughout the app—small design decisions that acknowledged the reality of our infrastructure while keeping the patient experience seamless.

## Designing for Accessibility from Day One

Accessibility can't be retrofitted. Knowing this, I built a Figma design system specifically for documenting accessibility requirements—focus order, focus readout, and screen reader behavior. Before a single line of code was written, designers could specify exactly how every interaction should work for users relying on assistive technology.

This wasn't about compliance. This was about recognizing that healthcare information is critical, and access to it shouldn't depend on how you interact with your device.

## The Data Problem

The roadmap revealed our biggest technical challenge early: rich patient profiles. Medications, third-party health data, pharmacy information, allergies, immunizations—all scattered across provider systems that weren't built to talk to each other in a patient-centric way.

Consolidating this data meant designing interfaces that could gracefully handle inconsistent, incomplete, or conflicting information. What do you show a patient when Provider A's medication list doesn't match Provider B's? How do you surface gaps in their health record without creating anxiety?

These weren't just UX questions—they were trust questions. Get them wrong, and patients abandon the app. Get them right, and you fundamentally change how people engage with their healthcare.

## The Numbers

The market validated our approach:
- **March 2023**: General availability launch  
- **July 2023**: Over 500,000 unique installations across iOS and Android  
- **2 million+ appointments** scheduled through the app  
- **4.9/5 stars** on iOS (104k ratings)
– **4.8/5 stars** on Google Play (52.1k ratings)
- **Zero marketing budget** — pure organic adoption

That last point matters. We didn't advertise. Patients discovered that athenaPatient solved a real problem and told others. When healthcare UX actually works, people notice as exemplified by it's status as the highest rated EHR in both app store platforms. 

## What It Means to Design in Healthcare

Building athenaPatient taught me that the hardest design problems exist at the intersection of constraints. Provider-first infrastructure. Fragmented data. Regulatory requirements. Privacy concerns. Each constraint could have been an excuse to compromise the patient experience.

Instead, they became design opportunities. How do we make complexity invisible? How do we build trust when the underlying systems are messy? How do we create an experience that feels cohesive when the data fundamentally isn't?

The foundation we built positions athenahealth to become more than a provider network—it's becoming a patient-centered platform. And there's so much more to build.

[App Store](https://apps.apple.com/us/app/athenapatient/id1644169294)
[Play Store](https://play.google.com/store/apps/details?id=com.athenahealth.athenapatient&pli=1)

[grid]
![poster](/images/2023/athenapatient/aP Post 03.jpg) 
![poster](/images/2023/athenapatient/aP Post 01.jpg) 
![poster](/images/2023/athenapatient/aP Post 02.jpg) 
![poster](/images/2023/athenapatient/aP Post 04.jpg) 
![poster](/images/2023/athenapatient/aP Post 05.jpg) 
![poster](/images/2023/athenapatient/aP Post 06.jpg) 
![poster](/images/2023/athenapatient/aP Post 07.jpg) 
![poster](/images/2023/athenapatient/aP Post 08.jpg) 
[/grid]
