# HeroSection Component

## Overview
The HeroSection is a React island component that displays an animated hero section with background effects and text animations using Framer Motion.

## Features
- Animated background with spotlight effect that follows mouse movement
- Horizontal and vertical beam animations
- Floating particle effects
- Character-by-character text animation for the name
- Staggered fade-in animations for title and description
- Responsive CTA buttons with hover effects
- Scroll indicator with bounce animation
- Full keyboard accessibility with proper ARIA labels

## Props

```typescript
interface HeroSectionProps {
  name: string;        // The person's name (e.g., "John Doe")
  title: string;       // Job title or role (e.g., "Full Stack Developer")
  description: string; // Brief description or tagline
}
```

## Usage in Astro

```astro
---
import HeroSection from '../components/home/HeroSection';
---

<HeroSection 
  client:load
  name="John Doe"
  title="Full Stack Developer"
  description="Building amazing web experiences with modern technologies"
/>
```

## Hydration Strategy
Use `client:load` directive for immediate hydration as specified in Requirements 3.3 and 3.5.

## Accessibility
- Semantic HTML structure with proper heading hierarchy
- ARIA labels on all interactive elements
- Screen reader text for decorative elements
- Keyboard accessible CTA buttons
- Proper focus indicators

## Styling
The component uses Tailwind CSS classes and follows the project's color scheme:
- Primary colors for accents and buttons
- Secondary colors for vertical beams
- Dark gradient background (gray-900 to gray-800)
- Responsive text sizes and layouts

## Requirements Satisfied
- Requirement 3.1: Hero section on home page
- Requirement 3.3: Hydrated with client:load directive
- Requirement 3.5: Displays hero animation immediately on page load
