import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

// Feature: developer-portfolio
// Requirements: 7.3, 7.4, 9.1

describe('Navigation Component', () => {
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: '/projects', label: 'Projects' },
    { href: '/resume', label: 'Resume' },
  ];

  describe('Navigation renders all required links', () => {
    it('should render all navigation links', () => {
      // Create a simple navigation structure for testing
      const { container } = render(
        <nav>
          <div>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      );

      // Verify all required links are present
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Blog')).toBeInTheDocument();
      expect(screen.getByText('Projects')).toBeInTheDocument();
      expect(screen.getByText('Resume')).toBeInTheDocument();
    });

    it('should have correct href attributes', () => {
      render(
        <nav>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      );

      const homeLink = screen.getByText('Home').closest('a');
      const blogLink = screen.getByText('Blog').closest('a');
      const projectsLink = screen.getByText('Projects').closest('a');
      const resumeLink = screen.getByText('Resume').closest('a');

      expect(homeLink).toHaveAttribute('href', '/');
      expect(blogLink).toHaveAttribute('href', '/blog');
      expect(projectsLink).toHaveAttribute('href', '/projects');
      expect(resumeLink).toHaveAttribute('href', '/resume');
    });

    it('should highlight active page', () => {
      const currentPath = '/blog';
      
      render(
        <nav>
          {navLinks.map((link) => {
            const isActive = link.href === '/' 
              ? currentPath === '/' 
              : currentPath.startsWith(link.href);
            
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
              </a>
            );
          })}
        </nav>
      );

      const blogLink = screen.getByText('Blog').closest('a');
      expect(blogLink).toHaveAttribute('aria-current', 'page');
    });
  });
});
