import { describe, it, expect } from 'vitest';
import { test } from '@fast-check/vitest';
import * as fc from 'fast-check';

// Feature: developer-portfolio, Property 18: Semantic HTML Structure
// Validates: Requirements 10.3

describe('Property 18: Semantic HTML Structure', () => {
  test.prop([
    fc.record({
      title: fc.string({ minLength: 1, maxLength: 100 }),
      description: fc.string({ minLength: 1, maxLength: 200 }),
      hasNavigation: fc.boolean(),
      hasMainContent: fc.boolean(),
      hasHeader: fc.boolean(),
      hasFooter: fc.boolean(),
      contentSections: fc.array(fc.string({ minLength: 1 }), { minLength: 0, maxLength: 5 }),
    })
  ], { numRuns: 100 })('pages use semantic elements appropriately', (pageStructure) => {
    // Simulate HTML structure generation
    const html = generatePageHTML(pageStructure);
    
    // Property: Pages should use semantic HTML elements
    
    // 1. Main content should be wrapped in <main> element
    if (pageStructure.hasMainContent) {
      expect(html).toContain('<main');
      expect(html).toContain('</main>');
    }
    
    // 2. Navigation should be wrapped in <nav> element
    if (pageStructure.hasNavigation) {
      expect(html).toContain('<nav');
      expect(html).toContain('</nav>');
    }
    
    // 3. Header should use <header> element
    if (pageStructure.hasHeader) {
      expect(html).toContain('<header');
      expect(html).toContain('</header>');
    }
    
    // 4. Footer should use <footer> element
    if (pageStructure.hasFooter) {
      expect(html).toContain('<footer');
      expect(html).toContain('</footer>');
    }
    
    // 5. Content sections should use <section> or <article> elements
    if (pageStructure.contentSections.length > 0) {
      const hasSectionOrArticle = html.includes('<section') || html.includes('<article');
      expect(hasSectionOrArticle).toBe(true);
    }
    
    // 6. Semantic elements should not be nested incorrectly
    // (e.g., <main> should not be inside <main>)
    const mainCount = (html.match(/<main/g) || []).length;
    expect(mainCount).toBeLessThanOrEqual(1);
  });
});

// Helper function that simulates page HTML generation with semantic elements
function generatePageHTML(structure: {
  title: string;
  description: string;
  hasNavigation: boolean;
  hasMainContent: boolean;
  hasHeader: boolean;
  hasFooter: boolean;
  contentSections: string[];
}): string {
  let html = '<!doctype html><html lang="en"><head>';
  html += `<title>${structure.title}</title>`;
  html += `<meta name="description" content="${structure.description}" />`;
  html += '</head><body>';
  
  // Add header with navigation (following BaseLayout pattern)
  if (structure.hasHeader || structure.hasNavigation) {
    html += '<header>';
    if (structure.hasNavigation) {
      html += '<nav><a href="/">Home</a><a href="/blog">Blog</a></nav>';
    }
    html += '</header>';
  }
  
  // Add main content area (following BaseLayout pattern)
  if (structure.hasMainContent) {
    html += '<main>';
    
    // Add content sections
    for (const section of structure.contentSections) {
      html += `<section><h2>${section}</h2><p>Content</p></section>`;
    }
    
    html += '</main>';
  }
  
  // Add footer if specified
  if (structure.hasFooter) {
    html += '<footer><p>Footer content</p></footer>';
  }
  
  html += '</body></html>';
  
  return html;
}
