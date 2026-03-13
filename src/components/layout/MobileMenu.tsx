import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { withBase } from '../../lib/utils';

interface NavigationLink {
  href: string;
  label: string;
}

interface MobileMenuProps {
  links: NavigationLink[];
  currentPath: string;
  isLight?: boolean;
}

export default function MobileMenu({ links, currentPath, isLight = false }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const homeHref = withBase('/');

  const isActive = (href: string) => {
    if (href === '/') {
      return currentPath === '/';
    }
    return currentPath.startsWith(href);
  };

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center justify-center rounded-md p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-inset ${
          isLight
            ? 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-400'
            : 'text-white-smoke-100 hover:bg-jet-black-700/60 hover:text-white-smoke-200 focus:ring-dusty-taupe-500'
        }`}
        aria-label="Toggle mobile menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          aria-hidden="true"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          )}
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/78 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
              data-testid="mobile-menu-overlay"
              aria-hidden="true"
            />

            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="fixed inset-0 z-50 flex min-h-dvh flex-col overflow-y-auto bg-[radial-gradient(circle_at_top,rgba(169,146,125,0.16),transparent_40%),linear-gradient(180deg,rgba(34,51,59,0.98),rgba(10,9,8,0.98))] text-white-smoke"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
            >
              <div className="flex min-h-dvh flex-col px-5 pb-8 pt-5 sm:px-6">
                <div className="flex items-center justify-between border-b border-secondary-500/35 pb-4">
                  <a
                    href={homeHref}
                    className="text-lg font-semibold tracking-tight text-white-smoke-100"
                    onClick={() => setIsOpen(false)}
                  >
                    Junaid Hossain
                  </a>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="rounded-full border border-jet-black-400/35 p-2 text-white-smoke-100/85 transition-colors hover:border-dusty-taupe-300/60 hover:bg-jet-black-500/25 hover:text-white-smoke focus:outline-none focus:ring-2 focus:ring-dusty-taupe-400"
                    aria-label="Close mobile menu"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="flex flex-1 flex-col justify-center py-10">
                  <p className="mb-4 text-sm font-medium uppercase tracking-[0.28em] text-white-smoke-200/70">
                    Navigate
                  </p>
                  <nav>
                    <ul className="space-y-3" role="list">
                    {links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={withBase(link.href)}
                          className={`block rounded-2xl border px-4 py-4 text-2xl font-semibold tracking-tight transition-colors ${
                            isActive(link.href)
                                ? 'border-dusty-taupe-300/55 bg-dusty-taupe-500/22 text-white-smoke shadow-[0_0_0_1px_rgba(169,146,125,0.18)]'
                                : 'border-jet-black-400/35 bg-jet-black-700/28 text-white-smoke-100/90 hover:border-dusty-taupe-300/45 hover:bg-jet-black-600/36 hover:text-white-smoke'
                          }`}
                          aria-current={isActive(link.href) ? 'page' : undefined}
                          onClick={() => setIsOpen(false)}
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                    </ul>
                  </nav>

                  <div className="mt-10 rounded-3xl border border-jet-black-400/35 bg-jet-black-700/34 p-5 backdrop-blur">
                    <p className="text-sm font-medium text-white-smoke-100">Backend Developer</p>
                    <p className="mt-2 text-sm leading-6 text-white-smoke-100/75">
                      Building software with a focus on APIs, systems, and reliable delivery.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
