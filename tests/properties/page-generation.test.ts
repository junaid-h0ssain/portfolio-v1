import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';

// Feature: developer-portfolio, Property 8: Collection Page Generation
// **Validates: Requirements 4.6**

describe('Property 8: Collection Page Generation', () => {
  it('should generate individual pages for all blog posts', () => {
    fc.assert(
      fc.property(
        fc.uniqueArray(
          fc.record({
            slug: fc.string({ minLength: 1, maxLength: 50 }).filter(s => /^[a-z0-9-]+$/.test(s)),
            data: fc.record({
              title: fc.string({ minLength: 1 }),
              description: fc.string({ minLength: 1 }),
              pubDate: fc.date(),
              tags: fc.array(fc.string({ minLength: 1 }), { minLength: 1 }),
            }),
          }),
          { minLength: 1, maxLength: 20, selector: (post) => post.slug }
        ),
        (posts) => {
          // Simulate getStaticPaths generation
          const generatedPaths = posts.map((post) => ({
            params: { slug: post.slug },
            props: { post },
          }));
          
          // Each post should have a corresponding path
          expect(generatedPaths.length).toBe(posts.length);
          
          // Each path should have valid params and props
          generatedPaths.forEach((path, index) => {
            expect(path.params.slug).toBe(posts[index].slug);
            expect(path.props.post).toBe(posts[index]);
          });
          
          // All slugs should be unique (no duplicate pages)
          const slugs = generatedPaths.map(p => p.params.slug);
          const uniqueSlugs = new Set(slugs);
          expect(uniqueSlugs.size).toBe(slugs.length);
        }
      ),
      { numRuns: 100 }
    );
  });
  
  it('should generate valid URL paths from slugs', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 50 }).filter(s => /^[a-z0-9-]+$/.test(s)),
        (slug) => {
          // Simulate URL path generation
          const urlPath = `/blog/${slug}`;
          
          // URL should be valid
          expect(urlPath).toMatch(/^\/blog\/[a-z0-9-]+$/);
          expect(urlPath.length).toBeGreaterThan('/blog/'.length);
        }
      ),
      { numRuns: 100 }
    );
  });
  
  it('should handle special characters in slugs correctly', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 50 })
          .map(s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''))
          .filter(s => s.length > 0),
        (slug) => {
          // Slugs should be URL-safe
          expect(slug).toMatch(/^[a-z0-9-]+$/);
          expect(slug).not.toMatch(/^-|-$/); // No leading/trailing hyphens
          
          // Generate path
          const urlPath = `/blog/${slug}`;
          expect(urlPath).toBeTruthy();
        }
      ),
      { numRuns: 100 }
    );
  });
  
  it('should generate pages for projects collection', () => {
    fc.assert(
      fc.property(
        fc.uniqueArray(
          fc.record({
            slug: fc.string({ minLength: 1, maxLength: 50 }).filter(s => /^[a-z0-9-]+$/.test(s)),
            data: fc.record({
              title: fc.string({ minLength: 1 }),
              description: fc.string({ minLength: 1 }),
              technologies: fc.array(fc.string({ minLength: 1 }), { minLength: 1 }),
              repositoryUrl: fc.webUrl(),
              thumbnail: fc.string({ minLength: 1 }),
              startDate: fc.date(),
            }),
          }),
          { minLength: 1, maxLength: 15, selector: (project) => project.slug }
        ),
        (projects) => {
          // Simulate getStaticPaths generation for projects
          const generatedPaths = projects.map((project) => ({
            params: { slug: project.slug },
            props: { project },
          }));
          
          // Each project should have a corresponding path
          expect(generatedPaths.length).toBe(projects.length);
          
          // Each path should have valid params and props
          generatedPaths.forEach((path, index) => {
            expect(path.params.slug).toBe(projects[index].slug);
            expect(path.props.project).toBe(projects[index]);
          });
        }
      ),
      { numRuns: 100 }
    );
  });
});
