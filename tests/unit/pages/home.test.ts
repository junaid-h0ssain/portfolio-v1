import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * Unit tests for home page (index.astro)
 * Validates Requirement 3.1 - Home page with hero and about sections
 */
describe('Home Page', () => {
  it('should include HeroSection component with client:load directive', () => {
    const indexPath = join(process.cwd(), 'src/pages/index.astro');
    const content = readFileSync(indexPath, 'utf-8');
    
    // Check that HeroSection is imported
    expect(content).toContain("import HeroSection from '../components/home/HeroSection'");
    
    // Check that HeroSection is used with client:load
    expect(content).toContain('<HeroSection');
    expect(content).toContain('client:load');
  });

  it('should include AboutSection component', () => {
    const indexPath = join(process.cwd(), 'src/pages/index.astro');
    const content = readFileSync(indexPath, 'utf-8');
    
    // Check that AboutSection is imported
    expect(content).toContain("import AboutSection from '../components/home/AboutSection.astro'");
    
    // Check that AboutSection is used
    expect(content).toContain('<AboutSection');
  });

  it('should use BaseLayout wrapper', () => {
    const indexPath = join(process.cwd(), 'src/pages/index.astro');
    const content = readFileSync(indexPath, 'utf-8');
    
    // Check that BaseLayout is imported
    expect(content).toContain("import BaseLayout from '../components/layout/BaseLayout.astro'");
    
    // Check that BaseLayout is used
    expect(content).toContain('<BaseLayout');
  });

  it('should include proper meta tags for home page', () => {
    const indexPath = join(process.cwd(), 'src/pages/index.astro');
    const content = readFileSync(indexPath, 'utf-8');
    
    // Check that title and description are provided to BaseLayout
    expect(content).toContain('title=');
    expect(content).toContain('description=');
  });

  it('should pass required props to HeroSection', () => {
    const indexPath = join(process.cwd(), 'src/pages/index.astro');
    const content = readFileSync(indexPath, 'utf-8');
    
    // Check that HeroSection receives name, title, and description props
    expect(content).toMatch(/name=["'][^"']+["']/);
    expect(content).toMatch(/title=["'][^"']+["']/);
    expect(content).toMatch(/description=["'][^"']+["']/);
  });
});
