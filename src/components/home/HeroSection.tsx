import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
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
  headshotSrc = '/headshot-placeholder.svg',
  headshotAlt,
}: HeroSectionProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const projectsHref = withBase('/projects');
  const resumeHref = withBase('/resume');
  const resolvedHeadshotSrc = withBase(headshotSrc);

  // Generate particles once and memoize to prevent re-creation on every render
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: `particle-${i}`,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }));
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const resolvedHeadshotAlt = headshotAlt ?? `${name || 'Portfolio'} headshot`;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-b from-secondary-900 via-secondary-800 to-secondary-950">
      {/* Animated Background Beams */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Spotlight Effect */}
        <motion.div
          className="absolute w-96 h-96 rounded-full opacity-30 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(158, 178, 112, 0.38) 0%, transparent 70%)',
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Background Beams */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-linear-to-r from-transparent via-primary-500/50 to-transparent"
              style={{
                width: '100%',
                top: `${20 + i * 15}%`,
                left: 0,
              }}
              animate={{
                opacity: [0.2, 0.5, 0.2],
                scaleX: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        {/* Vertical Beams */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`v-${i}`}
              className="absolute w-px bg-linear-to-b from-transparent via-secondary-500/30 to-transparent"
              style={{
                height: '100%',
                left: `${30 + i * 20}%`,
                top: 0,
              }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                scaleY: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.7,
              }}
            />
          ))}
        </div>

        {/* Floating Particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-primary-400/40 rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 pb-28 sm:px-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:gap-16 lg:px-8">
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="text-5xl font-bold text-primary-50 sm:text-6xl md:text-7xl">
              {name.split('').map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.05,
                    ease: 'easeOut',
                  }}
                  className="inline-block"
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          >
            <h2 className="mt-4 text-2xl font-semibold text-primary-400 sm:text-3xl md:text-4xl">
              {title}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          >
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-primary-100/85 sm:text-xl lg:mx-0">
              {description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: 'easeOut' }}
            className="mt-10 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start"
          >
            <motion.a
              href={projectsHref}
              className="px-8 py-3 bg-primary-600 text-secondary-950 rounded-lg font-medium hover:bg-primary-500 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-secondary-900"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="View my projects"
            >
              View Projects
            </motion.a>
            <motion.a
              href={resumeHref}
              className="px-8 py-3 bg-transparent border-2 border-primary-500 text-primary-300 rounded-lg font-medium hover:bg-primary-500/12 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-secondary-900"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="View my resume"
            >
              View Resume
            </motion.a>
          </motion.div>

        </div>

        <motion.figure
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease:'easeOut' }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="absolute inset-0 rounded-4xl bg-linear-to-br from-primary-500/28 via-primary-400/10 to-secondary-500/26 blur-2xl" />
          <div className="relative overflow-hidden rounded-4xl border border-primary-200/15 bg-secondary-900/35 p-3 shadow-2xl shadow-secondary-950/55 backdrop-blur-sm">
            <div className="relative aspect-4/5 overflow-hidden rounded-3xl bg-secondary-950">
              <img
                src={resolvedHeadshotSrc}
                alt={resolvedHeadshotAlt}
                className="h-full w-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-secondary-950 via-secondary-950/50 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-primary-100/70">Focused on</p>
                  <p className="mt-2 text-lg font-semibold text-primary-50">Systems, APIs, and shipping reliably</p>
                </div>
                <div className="shrink-0 rounded-full border border-primary-300/45 bg-primary-500/20 px-3 py-1 text-xs font-medium text-primary-100">
                  Open to work
                </div>
              </div>
            </div>
          </div>
        </motion.figure>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-block"
        >
          <svg
            className="w-6 h-6 text-primary-200/65"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </motion.div>
        <p className="sr-only">Scroll down to see more content</p>
      </motion.div>
    </section>
  );
}
