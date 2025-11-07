'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap, Shield, Globe } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Engine } from '@tsparticles/engine';
import Typed from 'react-typed';
import Countdown from 'react-countdown';

type BackgroundPattern = 'dots' | 'grid' | 'gradient';

const DEFAULT_HERO = {
  badge: '🚀 Product Launch in',
  title: 'Build the future of',
  titleHighlight: 'AI-powered SaaS',
  subtitle:
    'TechFlow empowers startups to build, deploy, and scale revolutionary AI applications with enterprise-grade infrastructure and lightning-fast development tools.',
  primaryCTA: 'Start Free Trial',
  secondaryCTA: 'Watch Demo',
  primaryCTAHref: '/signup',
  secondaryCTAHref: '/demo',
  feature1Icon: 'zap',
  feature1Text: 'Deploy in seconds',
  feature2Icon: 'shield',
  feature2Text: 'Enterprise security',
  feature3Icon: 'globe',
  feature3Text: 'Global CDN',
  trustedByText: 'Trusted by 500+ innovative startups',
  showTrustedLogos: true,
  backgroundPattern: 'dots' as BackgroundPattern,
  showAnimatedBadge: true,
  launchDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
  typedStrings: [
    'AI-powered SaaS',
    'next-gen platforms',
    'scalable solutions',
    'intelligent systems',
  ],
} as const;

type HeroProps = Partial<typeof DEFAULT_HERO>;

export default function Hero(props: HeroProps) {
  const config = { ...DEFAULT_HERO, ...props };
  const navigate = useSmartNavigation();
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const particlesInit = async (engine: Engine) => {
    await loadSlim(engine);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((event.clientX - centerX) * 0.1);
    mouseY.set((event.clientY - centerY) * 0.1);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'zap':
        return Zap;
      case 'shield':
        return Shield;
      case 'globe':
        return Globe;
      default:
        return Sparkles;
    }
  };

  const Feature1Icon = getIcon(config.feature1Icon);
  const Feature2Icon = getIcon(config.feature2Icon);
  const Feature3Icon = getIcon(config.feature3Icon);

  const countdownRenderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) {
      return <span className="text-primary font-semibold">🎉 Launched!</span>;
    }
    return (
      <div className="flex items-center gap-2 text-sm">
        <div className="flex items-center gap-1">
          <span className="font-mono font-bold text-primary">{days}</span>
          <span className="text-muted-foreground">d</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="font-mono font-bold text-primary">{hours}</span>
          <span className="text-muted-foreground">h</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="font-mono font-bold text-primary">{minutes}</span>
          <span className="text-muted-foreground">m</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="font-mono font-bold text-primary">{seconds}</span>
          <span className="text-muted-foreground">s</span>
        </div>
      </div>
    );
  };

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] overflow-hidden bg-background"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      data-editable="hero"
    >
      {/* Particles Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: 'transparent',
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: 'push',
              },
              onHover: {
                enable: true,
                mode: 'repulse',
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: 'hsl(var(--primary))',
            },
            links: {
              color: 'hsl(var(--primary))',
              distance: 150,
              enable: true,
              opacity: 0.1,
              width: 1,
            },
            move: {
              direction: 'none',
              enable: true,
              outModes: {
                default: 'bounce',
              },
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.2,
            },
            shape: {
              type: 'circle',
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
        className="absolute inset-0"
      />

      {/* Background Pattern */}
      {config.backgroundPattern === 'dots' && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary)_0.5px,transparent_0.5px)] [background-size:16px_16px] opacity-[0.03]" />
      )}
      {config.backgroundPattern === 'grid' && (
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:64px_64px]" />
      )}
      {config.backgroundPattern === 'gradient' && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-accent/[0.05]" />
      )}

      {/* Floating gradient orbs with parallax */}
      <motion.div
        className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/[0.03] blur-3xl"
        style={{ x: springX, y: springY }}
      />
      <motion.div
        className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-accent/[0.03] blur-3xl"
        style={{ x: springX, y: springY, scale: 0.8 }}
      />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex min-h-[90vh] flex-col items-center justify-center py-20 text-center"
          style={{ y, opacity }}
        >
          {/* Animated Badge with Countdown */}
          {config.showAnimatedBadge && (
            <motion.div
              className="mb-8 inline-flex"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="flex items-center gap-3 rounded-full border border-border bg-background/50 backdrop-blur-sm px-6 py-3 text-sm"
                animate={{
                  boxShadow: [
                    '0 0 0 0 hsl(var(--primary) / 0.3)',
                    '0 0 0 10px hsl(var(--primary) / 0)',
                    '0 0 0 0 hsl(var(--primary) / 0)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className="h-4 w-4 text-primary" />
                </motion.div>
                <span data-editable="badge" className="text-muted-foreground">
                  {config.badge}
                </span>
                <Countdown date={config.launchDate} renderer={countdownRenderer} />
              </motion.div>
            </motion.div>
          )}

          {/* Main Title with Typed Animation */}
          <motion.h1
            className="max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span data-editable="title" className="text-foreground">
              {config.title}
            </span>
            <span className="relative ml-3 block mt-2">
              <span className="bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
                <Typed
                  strings={config.typedStrings}
                  typeSpeed={80}
                  backSpeed={50}
                  backDelay={2000}
                  loop
                  showCursor={true}
                  cursorChar="|"
                />
              </span>
              <motion.svg
                className="absolute -right-2 -top-2 h-6 w-6 text-primary/60"
                fill="currentColor"
                viewBox="0 0 24 24"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </motion.svg>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            data-editable="subtitle"
            className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {config.subtitle}
          </motion.p>

          {/* Feature Pills with Stagger Animation */}
          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {[
              { Icon: Feature1Icon, text: config.feature1Text, editable: 'feature1Text' },
              { Icon: Feature2Icon, text: config.feature2Text, editable: 'feature2Text' },
              { Icon: Feature3Icon, text: config.feature3Text, editable: 'feature3Text' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 rounded-full border border-border bg-background/50 backdrop-blur-sm px-4 py-2 text-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                style={{ x: springX, y: springY }}
              >
                <feature.Icon className="h-4 w-4 text-primary" />
                <span data-editable={feature.editable} className="text-muted-foreground">
                  {feature.text}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="mt-10 flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="group px-8 text-base font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
                onClick={() => navigate(config.primaryCTAHref)}
                data-editable-href="primaryCTAHref"
                data-href={config.primaryCTAHref}
              >
                <span data-editable="primaryCTA">{config.primaryCTA}</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="border-border/50 backdrop-blur-sm text-base font-medium hover:bg-background/50 transition-all"
                onClick={() => navigate(config.secondaryCTAHref)}
                data-editable-href="secondaryCTAHref"
                data-href={config.secondaryCTAHref}
              >
                <span data-editable="secondaryCTA">{config.secondaryCTA}</span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Trusted By Section */}
          {config.showTrustedLogos && (
            <motion.div
              className="mt-20 w-full max-w-4xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <p data-editable="trustedByText" className="mb-6 text-sm text-muted-foreground">
                {config.trustedByText}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8 opacity-50 grayscale">
                {[1, 2, 3, 4, 5].map(i => (
                  <motion.div
                    key={i}
                    className="h-8 w-24 rounded bg-muted-foreground/10"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 1.1 + i * 0.1 }}
                    whileHover={{ opacity: 0.8, scale: 1.1 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
