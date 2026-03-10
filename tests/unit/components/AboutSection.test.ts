import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

// Feature: developer-portfolio
// Requirements: 3.1 - Display bio, skills, and social links on home page

describe('AboutSection Component', () => {
  const componentPath = join(process.cwd(), 'src/components/home/AboutSection.astro');
  const componentContent = readFileSync(componentPath, 'utf-8');

  describe('Component structure', () => {
    it('should exist as an Astro component', () => {
      expect(componentContent).toBeTruthy();
      expect(componentContent.length).toBeGreaterThan(0);
    });

    it('should have frontmatter section with Props interface', () => {
      expect(componentContent).toContain('interface Props');
      expect(componentContent).toContain('---');
    });

    it('should define bio prop', () => {
      expect(componentContent).toContain('bio');
    });

    it('should define skills prop', () => {
      expect(componentContent).toContain('skills');
    });

    it('should define socialLinks prop', () => {
      expect(componentContent).toContain('socialLinks');
    });
  });

  describe('Content sections', () => {
    it('should have About Me section header', () => {
      expect(componentContent).toContain('About Me');
    });

    it('should have bio section with "Who I Am" heading', () => {
      expect(componentContent).toContain('Who I Am');
    });

    it('should have social links section with "Connect With Me" heading', () => {
      expect(componentContent).toContain('Connect With Me');
    });

    it('should have skills section with "Technical Skills" heading', () => {
      expect(componentContent).toContain('Technical Skills');
    });

    it('should have additional info section with "Always Learning" heading', () => {
      expect(componentContent).toContain('Always Learning');
    });
  });

  describe('Social links', () => {
    it('should support GitHub link', () => {
      expect(componentContent).toContain('github');
      expect(componentContent).toContain('GitHub');
    });

    it('should support LinkedIn link', () => {
      expect(componentContent).toContain('linkedin');
      expect(componentContent).toContain('LinkedIn');
    });

    it('should support email link', () => {
      expect(componentContent).toContain('email');
      expect(componentContent).toContain('Email');
    });

    it('should support Twitter link', () => {
      expect(componentContent).toContain('twitter');
      expect(componentContent).toContain('Twitter');
    });
  });

  describe('Accessibility', () => {
    it('should use semantic section element', () => {
      expect(componentContent).toContain('<section');
    });

    it('should have proper heading hierarchy (h2, h3, h4)', () => {
      expect(componentContent).toContain('<h2');
      expect(componentContent).toContain('<h3');
      expect(componentContent).toContain('<h4');
    });

    it('should include aria-label for social links', () => {
      expect(componentContent).toContain('aria-label="Visit my GitHub profile"');
      expect(componentContent).toContain('aria-label="Visit my LinkedIn profile"');
      expect(componentContent).toContain('aria-label="Send me an email"');
      expect(componentContent).toContain('aria-label="Visit my Twitter profile"');
    });

    it('should have aria-hidden on decorative SVG icons', () => {
      expect(componentContent).toContain('aria-hidden="true"');
    });

    it('should have section id for anchor navigation', () => {
      expect(componentContent).toContain('id="about"');
    });
  });

  describe('Styling', () => {
    it('should use Tailwind CSS classes', () => {
      expect(componentContent).toContain('class=');
      // Check for common Tailwind patterns
      expect(componentContent).toMatch(/bg-gray-\d+/);
      expect(componentContent).toMatch(/text-\w+-\d+/);
      expect(componentContent).toMatch(/rounded-/);
    });

    it('should have responsive design classes', () => {
      expect(componentContent).toContain('sm:');
      expect(componentContent).toContain('md:');
      expect(componentContent).toContain('lg:');
    });

    it('should use primary color scheme', () => {
      expect(componentContent).toContain('primary-');
    });

    it('should use secondary color scheme', () => {
      expect(componentContent).toContain('secondary-');
    });

    it('should have hover states', () => {
      expect(componentContent).toContain('hover:');
    });

    it('should have focus states for accessibility', () => {
      expect(componentContent).toContain('focus:');
    });
  });

  describe('Default values', () => {
    it('should provide default bio text', () => {
      expect(componentContent).toContain("I'm a Computer Science student");
    });

    it('should provide default skills array', () => {
      expect(componentContent).toContain('JavaScript/TypeScript');
      expect(componentContent).toContain('React & Next.js');
      expect(componentContent).toContain('Node.js & Express');
    });

    it('should provide default social links', () => {
      expect(componentContent).toContain('https://github.com');
      expect(componentContent).toContain('https://linkedin.com');
      expect(componentContent).toContain('mailto:contact@example.com');
    });
  });

  describe('Layout structure', () => {
    it('should use grid layout for desktop', () => {
      expect(componentContent).toContain('grid');
      expect(componentContent).toContain('md:grid-cols-2');
    });

    it('should have proper spacing classes', () => {
      expect(componentContent).toContain('py-');
      expect(componentContent).toContain('px-');
      expect(componentContent).toContain('gap-');
    });

    it('should have max-width container', () => {
      expect(componentContent).toContain('max-w-');
    });
  });

  describe('Interactive elements', () => {
    it('should have external links with proper attributes', () => {
      expect(componentContent).toContain('target="_blank"');
      expect(componentContent).toContain('rel="noopener noreferrer"');
    });

    it('should have transition effects', () => {
      expect(componentContent).toContain('transition');
    });

    it('should have scale hover effects', () => {
      expect(componentContent).toContain('hover:scale-');
    });
  });

  describe('Visual design', () => {
    it('should have gradient decorative elements', () => {
      expect(componentContent).toContain('gradient');
    });

    it('should have backdrop blur effects', () => {
      expect(componentContent).toContain('backdrop-blur');
    });

    it('should have border styling', () => {
      expect(componentContent).toContain('border');
    });

    it('should have rounded corners', () => {
      expect(componentContent).toContain('rounded-');
    });
  });

  describe('Skills rendering', () => {
    it('should map over skills array', () => {
      expect(componentContent).toContain('skills.map');
    });

    it('should display skill items in a grid', () => {
      expect(componentContent).toContain('grid-cols-2');
    });
  });

  describe('Conditional rendering', () => {
    it('should conditionally render GitHub link', () => {
      expect(componentContent).toContain('socialLinks.github');
    });

    it('should conditionally render LinkedIn link', () => {
      expect(componentContent).toContain('socialLinks.linkedin');
    });

    it('should conditionally render email link', () => {
      expect(componentContent).toContain('socialLinks.email');
    });

    it('should conditionally render Twitter link', () => {
      expect(componentContent).toContain('socialLinks.twitter');
    });
  });
});
