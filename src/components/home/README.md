# Home Page Components

This directory contains components for the home page of the developer portfolio.

## Components

### HeroSection.tsx (React Island)
A React component with animated hero section featuring:
- Animated background with spotlight effect and beams
- Character-by-character name animation
- Smooth fade-in animations for title and description
- CTA buttons for Projects and Resume
- Scroll indicator
- Hydrated with `client:load` for immediate animation

**Props:**
```typescript
interface HeroSectionProps {
  name: string;
  title: string;
  description: string;
}
```

**Usage:**
```astro
---
import HeroSection from '../components/home/HeroSection';
---

<HeroSection 
  client:load
  name="John Doe"
  title="Full Stack Developer"
  description="Building amazing web experiences"
/>
```

### AboutSection.astro (Static Component)
A static Astro component displaying bio, skills, and social links:
- Bio section with personal information
- Technical skills grid
- Social media links (GitHub, LinkedIn, Email, Twitter)
- Additional info card
- No hydration needed (fully static)

**Props:**
```typescript
interface Props {
  bio?: string;
  skills?: string[];
  socialLinks?: {
    github?: string;
    linkedin?: string;
    email?: string;
    twitter?: string;
  };
}
```

**Default Values:**
- Bio: CS student description
- Skills: Array of 8 common technologies
- Social Links: Placeholder URLs

**Usage:**
```astro
---
import AboutSection from '../components/home/AboutSection.astro';
---

<AboutSection 
  bio="Custom bio text"
  skills={['JavaScript', 'React', 'Node.js']}
  socialLinks={{
    github: 'https://github.com/username',
    linkedin: 'https://linkedin.com/in/username',
    email: 'mailto:user@example.com'
  }}
/>
```

## Design System

Both components use the same design tokens:
- **Primary Color**: Sky blue (`primary-*` classes)
- **Secondary Color**: Purple (`secondary-*` classes)
- **Background**: Dark gray gradient (`gray-900`, `gray-800`)
- **Typography**: Inter font family
- **Spacing**: Consistent padding and margins
- **Animations**: Smooth transitions and hover effects

## Accessibility

Both components follow accessibility best practices:
- Semantic HTML structure
- Proper heading hierarchy
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus indicators
- Screen reader friendly

## Testing

Unit tests are located in `tests/unit/components/`:
- `HeroSection.test.tsx` - React component tests
- `AboutSection.test.ts` - Astro component structure tests

Run tests with:
```bash
npm test
```
