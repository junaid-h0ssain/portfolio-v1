import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MobileMenu from '../../../src/components/layout/MobileMenu';

// Feature: developer-portfolio
// Requirements: 7.4, 9.1

describe('MobileMenu Component', () => {
  const mockLinks = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: '/projects', label: 'Projects' },
    { href: '/resume', label: 'Resume' },
  ];

  describe('Mobile menu toggle functionality', () => {
    it('should render toggle button', () => {
      render(<MobileMenu links={mockLinks} currentPath="/" />);
      
      const toggleButton = screen.getByLabelText('Toggle mobile menu');
      expect(toggleButton).toBeInTheDocument();
    });

    it('should open menu when toggle button is clicked', async () => {
      render(<MobileMenu links={mockLinks} currentPath="/" />);
      
      const toggleButton = screen.getByLabelText('Toggle mobile menu');
      expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
      
      fireEvent.click(toggleButton);
      
      await waitFor(() => {
        expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
      });
      
      // Menu should be visible
      const menu = screen.getByRole('dialog');
      expect(menu).toBeInTheDocument();
    });

    it('should close menu when close button is clicked', async () => {
      render(<MobileMenu links={mockLinks} currentPath="/" />);
      
      // Open menu
      const toggleButton = screen.getByLabelText('Toggle mobile menu');
      fireEvent.click(toggleButton);
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
      
      // Close menu
      const closeButton = screen.getByLabelText('Close mobile menu');
      fireEvent.click(closeButton);
      
      await waitFor(() => {
        expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
      });
    });

    it('should close menu when overlay is clicked', async () => {
      render(<MobileMenu links={mockLinks} currentPath="/" />);
      
      // Open menu
      const toggleButton = screen.getByLabelText('Toggle mobile menu');
      fireEvent.click(toggleButton);
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
      
      const overlay = screen.getByTestId('mobile-menu-overlay');
      fireEvent.click(overlay);
      
      await waitFor(() => {
        expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
      });
    });

    it('should display all navigation links in menu', async () => {
      render(<MobileMenu links={mockLinks} currentPath="/" />);
      
      // Open menu
      const toggleButton = screen.getByLabelText('Toggle mobile menu');
      fireEvent.click(toggleButton);
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
      
      // Verify all links are present
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Blog')).toBeInTheDocument();
      expect(screen.getByText('Projects')).toBeInTheDocument();
      expect(screen.getByText('Resume')).toBeInTheDocument();
    });
  });

  describe('Keyboard accessibility', () => {
    it('should close menu on Escape key', async () => {
      render(<MobileMenu links={mockLinks} currentPath="/" />);
      
      // Open menu
      const toggleButton = screen.getByLabelText('Toggle mobile menu');
      fireEvent.click(toggleButton);
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
      
      // Press Escape
      fireEvent.keyDown(document, { key: 'Escape' });
      
      await waitFor(() => {
        expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
      });
    });

    it('should have proper ARIA labels on toggle button', () => {
      render(<MobileMenu links={mockLinks} currentPath="/" />);
      
      const toggleButton = screen.getByLabelText('Toggle mobile menu');
      expect(toggleButton).toHaveAttribute('aria-label', 'Toggle mobile menu');
      expect(toggleButton).toHaveAttribute('aria-expanded');
      expect(toggleButton).toHaveAttribute('aria-controls', 'mobile-menu');
    });

    it('should have proper ARIA labels on close button', async () => {
      render(<MobileMenu links={mockLinks} currentPath="/" />);
      
      // Open menu
      const toggleButton = screen.getByLabelText('Toggle mobile menu');
      fireEvent.click(toggleButton);
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
      
      const closeButton = screen.getByLabelText('Close mobile menu');
      expect(closeButton).toHaveAttribute('aria-label', 'Close mobile menu');
    });

    it('should have proper role and aria-modal on menu panel', async () => {
      render(<MobileMenu links={mockLinks} currentPath="/" />);
      
      // Open menu
      const toggleButton = screen.getByLabelText('Toggle mobile menu');
      fireEvent.click(toggleButton);
      
      await waitFor(() => {
        const dialog = screen.getByRole('dialog');
        expect(dialog).toBeInTheDocument();
        expect(dialog).toHaveAttribute('aria-modal', 'true');
        expect(dialog).toHaveAttribute('aria-label', 'Mobile navigation menu');
      });
    });

    it('should be keyboard navigable through links', async () => {
      const user = userEvent.setup();
      render(<MobileMenu links={mockLinks} currentPath="/" />);
      
      // Open menu
      const toggleButton = screen.getByLabelText('Toggle mobile menu');
      await user.click(toggleButton);
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
      
      const links = mockLinks.map((link) => screen.getByRole('link', { name: link.label }));
      expect(links).toHaveLength(mockLinks.length);
      
      // Links should be keyboard accessible
      for (const link of links) {
        expect(link).toBeVisible();
      }
    });

    it('should highlight active page in mobile menu', async () => {
      render(<MobileMenu links={mockLinks} currentPath="/projects" />);
      
      // Open menu
      const toggleButton = screen.getByLabelText('Toggle mobile menu');
      fireEvent.click(toggleButton);
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
      
      const projectsLink = screen.getByText('Projects').closest('a');
      expect(projectsLink).toHaveAttribute('aria-current', 'page');
    });
  });
});
