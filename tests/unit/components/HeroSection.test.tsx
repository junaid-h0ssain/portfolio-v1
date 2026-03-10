import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HeroSection from '../../../src/components/home/HeroSection';

// Feature: developer-portfolio
// Requirements: 3.1, 3.3, 3.5

describe('HeroSection Component', () => {
  const mockProps = {
    name: 'John Doe',
    title: 'Full Stack Developer',
    description: 'Building amazing web experiences with modern technologies',
  };

  describe('Content rendering', () => {
    it('should render name prop', () => {
      const { container } = render(<HeroSection {...mockProps} />);
      
      // Name is split into individual characters for animation
      const h1 = container.querySelector('h1');
      expect(h1).toBeInTheDocument();
      // Space is converted to non-breaking space for animation
      expect(h1?.textContent?.replace(/\u00A0/g, ' ')).toBe('John Doe');
    });

    it('should render title prop', () => {
      render(<HeroSection {...mockProps} />);
      
      expect(screen.getByText('Full Stack Developer')).toBeInTheDocument();
    });

    it('should render description prop', () => {
      render(<HeroSection {...mockProps} />);
      
      expect(screen.getByText('Building amazing web experiences with modern technologies')).toBeInTheDocument();
    });

    it('should render all props correctly', () => {
      const { container } = render(<HeroSection {...mockProps} />);
      
      // Name is split into characters for animation
      const h1 = container.querySelector('h1');
      expect(h1?.textContent?.replace(/\u00A0/g, ' ')).toBe(mockProps.name);
      expect(screen.getByText(mockProps.title)).toBeInTheDocument();
      expect(screen.getByText(mockProps.description)).toBeInTheDocument();
    });
  });

  describe('CTA buttons', () => {
    it('should render View Projects button with correct link', () => {
      render(<HeroSection {...mockProps} />);
      
      const projectsButton = screen.getByLabelText('View my projects');
      expect(projectsButton).toBeInTheDocument();
      expect(projectsButton).toHaveAttribute('href', '/projects');
    });

    it('should render View Resume button with correct link', () => {
      render(<HeroSection {...mockProps} />);
      
      const resumeButton = screen.getByLabelText('View my resume');
      expect(resumeButton).toBeInTheDocument();
      expect(resumeButton).toHaveAttribute('href', '/resume');
    });

    it('should have proper ARIA labels on CTA buttons', () => {
      render(<HeroSection {...mockProps} />);
      
      expect(screen.getByLabelText('View my projects')).toBeInTheDocument();
      expect(screen.getByLabelText('View my resume')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have semantic HTML structure', () => {
      const { container } = render(<HeroSection {...mockProps} />);
      
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('should have proper heading hierarchy', () => {
      render(<HeroSection {...mockProps} />);
      
      const h1 = screen.getByRole('heading', { level: 1 });
      const h2 = screen.getByRole('heading', { level: 2 });
      
      expect(h1).toHaveTextContent('John Doe');
      expect(h2).toHaveTextContent('Full Stack Developer');
    });

    it('should have screen reader text for scroll indicator', () => {
      render(<HeroSection {...mockProps} />);
      
      expect(screen.getByText('Scroll down to see more content')).toBeInTheDocument();
    });

    it('should have aria-hidden on decorative SVG', () => {
      const { container } = render(<HeroSection {...mockProps} />);
      
      const svg = container.querySelector('svg[aria-hidden="true"]');
      expect(svg).toBeInTheDocument();
    });
  });

  describe('Animation elements', () => {
    it('should render background animation elements', () => {
      const { container } = render(<HeroSection {...mockProps} />);
      
      // Check for background container
      const backgroundContainer = container.querySelector('.absolute.inset-0.overflow-hidden');
      expect(backgroundContainer).toBeInTheDocument();
    });

    it('should render content with proper z-index layering', () => {
      const { container } = render(<HeroSection {...mockProps} />);
      
      // Content should have z-10 to be above background
      const content = container.querySelector('.relative.z-10');
      expect(content).toBeInTheDocument();
    });
  });

  describe('Responsive design', () => {
    it('should have responsive text classes', () => {
      const { container } = render(<HeroSection {...mockProps} />);
      
      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1.className).toMatch(/text-5xl|sm:text-6xl|md:text-7xl/);
    });

    it('should have responsive button layout', () => {
      const { container } = render(<HeroSection {...mockProps} />);
      
      const buttonContainer = container.querySelector('.flex.flex-col.sm\\:flex-row');
      expect(buttonContainer).toBeInTheDocument();
    });
  });

  describe('Props validation', () => {
    it('should handle empty name gracefully', () => {
      const { container } = render(<HeroSection name="" title={mockProps.title} description={mockProps.description} />);
      
      // Component should still render without errors
      expect(screen.getByText(mockProps.title)).toBeInTheDocument();
      const h1 = container.querySelector('h1');
      expect(h1).toBeInTheDocument();
    });

    it('should handle empty title gracefully', () => {
      const { container } = render(<HeroSection name={mockProps.name} title="" description={mockProps.description} />);
      
      // Component should still render without errors
      const h1 = container.querySelector('h1');
      expect(h1?.textContent?.replace(/\u00A0/g, ' ')).toBe(mockProps.name);
    });

    it('should handle empty description gracefully', () => {
      const { container } = render(<HeroSection name={mockProps.name} title={mockProps.title} description="" />);
      
      // Component should still render without errors
      const h1 = container.querySelector('h1');
      expect(h1?.textContent?.replace(/\u00A0/g, ' ')).toBe(mockProps.name);
    });
  });
});
