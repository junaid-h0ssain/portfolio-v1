import { withBase } from '../../lib/utils';

interface HeroSectionProps {
  name: string;
  title: string;
  description: string;
  headshotSrc?: string;
  headshotAlt?: string;
}

export default function HeroSection({
  name,
  title,
  description,
}: HeroSectionProps) {
  const projectsHref = withBase('/projects');
  const resumeHref = withBase('/resume');

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden bg-linear-to-b from-secondary-900 via-secondary-800 to-secondary-950">
      {/* Background layers */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute left-1/2 top-1/4 h-96 w-96 -translate-x-1/2 rounded-full opacity-30 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(158, 178, 112, 0.38) 0%, transparent 70%)',
          }}
        />

        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-linear-to-r from-transparent via-primary-500/50 to-transparent"
              style={{
                width: '100%',
                top: `${20 + i * 15}%`,
                left: 0,
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute w-px bg-linear-to-b from-transparent via-secondary-500/30 to-transparent"
              style={{
                height: '100%',
                left: `${30 + i * 20}%`,
                top: 0,
              }}
            />
          ))}
        </div>

        {[...Array(20)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute h-1 w-1 rounded-full bg-primary-400/40"
            style={{
              left: `${(i * 17) % 100}%`,
              top: `${(i * 29) % 100}%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-4 py-16 pb-28 text-center sm:px-6 lg:px-8">
        <div className="flex w-full flex-col items-center">
          <h1 className="mx-auto max-w-[12ch] text-balance text-5xl font-bold leading-[0.95] text-primary-50 sm:text-6xl md:text-7xl lg:max-w-none">
            {name}
          </h1>

          <h2 className="mt-4 text-2xl font-semibold text-primary-400 sm:text-3xl md:text-4xl">
            {title}
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-primary-100/85 sm:text-xl">
            {description}
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href={projectsHref}
              className="rounded-lg bg-primary-600 px-8 py-3 font-medium text-secondary-950 transition-colors hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-secondary-900"
              aria-label="View my projects"
            >
              View Projects
            </a>
            <a
              href={resumeHref}
              className="rounded-lg border-2 border-primary-500 bg-transparent px-8 py-3 font-medium text-primary-300 transition-colors hover:bg-primary-500/12 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-secondary-900"
              aria-label="View my resume"
            >
              View Resume
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <svg
          className="h-10 w-10 text-primary-200/65"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
        <p className="sr-only">Scroll down to see more content</p>
      </div>
    </section>
  );
}
