# PortfolioV1

This is a personal portfolio website built with Astro. It includes pages for projects, blog posts, and a resume, with reusable components for the homepage and navigation.

## Tech Stack

- Astro for the core site framework and routing
- React for interactive UI pieces
- MDX for content-driven pages like blog posts and project entries
- Tailwind CSS for styling
- Cloudflare adapter for deployment and runtime support
- Vitest, Testing Library, and fast-check for testing

## Project Structure

- `src/pages` contains the site routes
- `src/components` contains reusable UI components
- `src/content` stores blog and project content
- `src/data` contains resume data and other structured content
- `public` stores static assets

## Available Scripts

- `npm install` installs dependencies
- `npm run dev` starts the local development server
- `npm run build` builds the production site
- `npm run preview` builds the site and previews it locally with Wrangler
- `npm run test` runs the test suite
- `npm run deploy` builds and deploys with Wrangler

## Notes

The project is configured for static output in `astro.config.mjs` and uses Cloudflare by default. A separate build path is available for GitHub Pages through `npm run build:pages`.
