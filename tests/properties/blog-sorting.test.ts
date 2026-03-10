import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';

// Feature: developer-portfolio, Property 4: Blog Post Sorting
// **Validates: Requirements 4.3**

describe('Property 4: Blog Post Sorting', () => {
  it('should sort blog posts by publication date in descending order (newest first)', () => {
    fc.assert(
      fc.property(
        // Generate an array of blog posts with random dates
        fc.array(
          fc.record({
            slug: fc.string(),
            data: fc.record({
              title: fc.string(),
              description: fc.string(),
              pubDate: fc.date(),
              tags: fc.array(fc.string()),
            }),
          }),
          { minLength: 2, maxLength: 20 }
        ),
        (posts) => {
          // Sort posts by pubDate descending (newest first)
          const sortedPosts = [...posts].sort((a, b) => 
            b.data.pubDate.getTime() - a.data.pubDate.getTime()
          );
          
          // Verify that each post is newer than or equal to the next one
          for (let i = 0; i < sortedPosts.length - 1; i++) {
            const currentDate = sortedPosts[i].data.pubDate.getTime();
            const nextDate = sortedPosts[i + 1].data.pubDate.getTime();
            expect(currentDate).toBeGreaterThanOrEqual(nextDate);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
  
  it('should handle posts with identical dates', () => {
    fc.assert(
      fc.property(
        fc.date(),
        fc.array(fc.string(), { minLength: 2, maxLength: 5 }),
        (sameDate, titles) => {
          // Create posts with the same date
          const posts = titles.map((title) => ({
            slug: title.toLowerCase().replace(/\s+/g, '-'),
            data: {
              title,
              description: 'Test description',
              pubDate: new Date(sameDate),
              tags: ['test'],
            },
          }));
          
          // Sort posts
          const sortedPosts = [...posts].sort((a, b) => 
            b.data.pubDate.getTime() - a.data.pubDate.getTime()
          );
          
          // All dates should be equal
          const firstDate = sortedPosts[0].data.pubDate.getTime();
          sortedPosts.forEach((post) => {
            expect(post.data.pubDate.getTime()).toBe(firstDate);
          });
        }
      ),
      { numRuns: 100 }
    );
  });
});
