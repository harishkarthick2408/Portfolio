'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useTransform, animate, MotionValue } from 'framer-motion';
import Image from 'next/image';
import styles from './Projects.module.css';
import { projects } from '@/data/projects';

const CARD_W = 420;
const GAP = 60;
const UNIT = CARD_W + GAP;
const total = projects.length;
const SLIDE_INTERVAL = 3500;

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

function Card({
  project,
  slotIndex,
  trackX,
  containerWidth,
  totalSlots,
  active,
  goNext,
  goPrev,
  showHint,
  onHintMouseEnter,
  onHintMouseLeave,
  cardWidth,
  offsetIndex,
  staticRender,
}: {
  project: (typeof projects)[0];
  slotIndex: number;
  trackX: MotionValue<number>;
  containerWidth: number;
  totalSlots: number;
  active: number;
  goNext: () => void;
  goPrev: () => void;
  showHint: boolean;
  onHintMouseEnter: () => void;
  onHintMouseLeave: () => void;
  cardWidth: number;
  offsetIndex: -1 | 0 | 1;
  staticRender?: boolean;
}) {
  const [logoError, setLogoError] = useState(false);

  // ── All hooks must be called unconditionally (Rules of Hooks) ──
  const cx = containerWidth / 2 - cardWidth / 2;
  const totalWidth = totalSlots * UNIT;

  const x = useTransform(trackX, (tx) => {
    let pos = cx + slotIndex * UNIT + tx;
    const halfTotal = totalWidth / 2;
    while (pos - cx > halfTotal) pos -= totalWidth;
    while (pos - cx < -halfTotal) pos += totalWidth;
    return pos;
  });

  const scale = useTransform(trackX, (tx) => {
    let pos = cx + slotIndex * UNIT + tx;
    const halfTotal = totalWidth / 2;
    while (pos - cx > halfTotal) pos -= totalWidth;
    while (pos - cx < -halfTotal) pos += totalWidth;
    const dist = Math.abs(pos - cx) / UNIT;
    return Math.max(0.82, 1 - Math.min(dist, 1) * 0.18);
  });

  const opacity = useTransform(trackX, (tx) => {
    let pos = cx + slotIndex * UNIT + tx;
    const halfTotal = totalWidth / 2;
    while (pos - cx > halfTotal) pos -= totalWidth;
    while (pos - cx < -halfTotal) pos += totalWidth;
    const dist = Math.abs(pos - cx) / UNIT;
    return Math.max(0.45, 1 - Math.min(dist, 1) * 0.55);
  });

  const isCenter = offsetIndex === 0;
  const clickFn = isCenter ? undefined : offsetIndex === 1 ? goNext : goPrev;

  // ── Mobile static path (after all hooks) ──────────────────
  if (staticRender) {
    return (
      <div className={`${styles.card} ${styles.centerCard} ${styles.mobileCard}`}>
        <div className={styles.cardBanner}>
          {!logoError ? (
            <Image
              src={project.logo}
              alt={`${project.title} banner`}
              fill
              sizes="100vw"
              className={styles.bannerImg}
              style={{
                objectFit: project.bannerFit ?? 'contain',
                padding: project.bannerPadding ?? '8px',
                transform: project.bannerScale ? `scale(${project.bannerScale})` : undefined,
                transformOrigin: 'center',
              }}
              onError={() => setLogoError(true)}
            />
          ) : (
            <span className={styles.bannerFallback}>{project.title[0]}</span>
          )}
        </div>
        <div className={styles.cardBody}>
          <span className={styles.cardTagline}>{project.tagline}</span>
          <h3 className={styles.cardTitle}>{project.title}</h3>
          <p className={styles.cardDesc}>{project.description}</p>
          <div className={styles.techRow}>
            {project.tech.map((t) => (
              <span key={t} className={styles.techPill}>
                {t}
              </span>
            ))}
          </div>
          <a
            href={project.visit}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.visitBtn}
          >
            Visit Project <span className={styles.visitArrow}>&#x2192;</span>
          </a>
        </div>
      </div>
    );
  }

  // ── Desktop animated path ──────────────────────────────────

  return (
    <motion.div
      className={
        isCenter ? `${styles.card} ${styles.centerCard}` : `${styles.card} ${styles.sideCard}`
      }
      style={{
        position: 'absolute',
        top: '50%',
        left: 0,
        width: cardWidth,
        x,
        y: '-50%',
        scale,
        opacity,
        transformOrigin: 'center center',
      }}
      onClick={!isCenter ? clickFn : undefined}
      onMouseEnter={!isCenter ? onHintMouseEnter : undefined}
      onMouseLeave={!isCenter ? onHintMouseLeave : undefined}
    >
      {/* Side card hover hint — JS-controlled, never shown during animation */}
      {!isCenter && showHint && (
        <div className={styles.clickHint} aria-hidden="true">
          {offsetIndex === -1 ? '‹' : '›'}
        </div>
      )}
      {/* Banner */}
      <div className={styles.cardBanner}>
        {!logoError ? (
          <Image
            src={project.logo}
            alt={`${project.title} banner`}
            fill
            sizes="420px"
            className={styles.bannerImg}
            style={{
              objectFit: project.bannerFit ?? 'contain',
              padding: project.bannerPadding ?? '8px',
              transform: project.bannerScale ? `scale(${project.bannerScale})` : undefined,
              transformOrigin: 'center',
            }}
            onError={() => setLogoError(true)}
          />
        ) : (
          <span className={styles.bannerFallback}>{project.title[0]}</span>
        )}
      </div>

      {/* Body */}
      <div className={styles.cardBody}>
        <span className={styles.cardTagline}>{project.tagline}</span>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.cardDesc}>{project.description}</p>
        <div className={styles.techRow}>
          {project.tech.map((t) => (
            <span key={t} className={styles.techPill}>
              {t}
            </span>
          ))}
        </div>
        <a
          href={project.visit}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.visitBtn}
        >
          Visit Project <span className={styles.visitArrow}>&#x2192;</span>
        </a>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isIdle, setIsIdle] = useState(true);
  const [hoveredSlot, setHoveredSlot] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const isMobileRef = useRef(false);

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      isMobileRef.current = mobile;
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // On mobile reduce card width to fit viewport; keep CARD_W for desktop
  const mobileCardW =
    containerWidth > 0 && containerWidth <= 768
      ? Math.max(Math.min(containerWidth - 32, CARD_W), 280)
      : CARD_W;

  const containerRef = useRef<HTMLDivElement>(null);
  const trackX = useMotionValue(0);
  const fadeOpacity = useMotionValue(1);
  const animating = useRef(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // cumulative slide count — trackX = -slideCount * UNIT always
  const slideCount = useRef(0);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    return () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, []);

  const goTo = useCallback(
    (newActive: number, step: 1 | -1) => {
      if (animating.current) return;
      setHoveredSlot(null);
      setIsIdle(false);
      animating.current = true;

      const target = mod(newActive, total);

      // ── Mobile: fade transition ───────────────────────
      if (isMobileRef.current) {
        animate(fadeOpacity, 0, {
          duration: 0.18,
          onComplete: () => {
            setActive(target);
            animating.current = false;
            setIsIdle(true);
            animate(fadeOpacity, 1, { duration: 0.18 });
          },
        });
        return;
      }

      // ── Desktop: slide transition ─────────────────────
      slideCount.current += step;
      const targetX = -slideCount.current * UNIT;

      animate(trackX, targetX, {
        duration: 0.45,
        ease: [0.25, 0.46, 0.45, 0.94],
        onComplete: () => {
          // Normalise trackX every full loop to prevent float drift
          // This is invisible because card positions self-wrap
          if (Math.abs(slideCount.current) >= total) {
            const excess = Math.floor(slideCount.current / total) * total;
            slideCount.current -= excess;
            trackX.set(-slideCount.current * UNIT);
          }
          setActive(target);
          if (idleTimer.current) clearTimeout(idleTimer.current);
          idleTimer.current = setTimeout(() => {
            animating.current = false;
            setIsIdle(true);
          }, 150);
        },
      });
    },
    [trackX, fadeOpacity],
  );

  const goNext = useCallback(() => goTo(active + 1, 1), [active, goTo]);
  const goPrev = useCallback(() => goTo(active - 1, -1), [active, goTo]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;
    if (diff > minSwipeDistance) goNext();
    if (diff < -minSwipeDistance) goPrev();
  };

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(goNext, SLIDE_INTERVAL);
    return () => clearTimeout(t);
  }, [active, paused, goNext]);

  const handleDotClick = (i: number) => {
    const diff = mod(i - active, total);
    const step = (diff <= Math.floor(total / 2) ? 1 : -1) as 1 | -1;
    goTo(i, step);
  };

  const fadeUp = {
    initial: { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, amount: 0.2 } as const,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  };

  return (
    <section
      id="projects"
      className={styles.section}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div className={styles.headerWrap} {...fadeUp}>
        <span className={styles.label}>What I&apos;ve built</span>
        <h2 className={styles.heading}>
          My <span className={styles.accent}>Projects</span>
        </h2>
      </motion.div>

      <div className={styles.carouselOuter}>
        <div
          ref={containerRef}
          className={styles.carouselViewport}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {containerWidth > 0 &&
            (isMobile ? (
              // ── Mobile: single card with fade transition ──
              <motion.div className={styles.mobileCardWrap} style={{ opacity: fadeOpacity }}>
                <Card
                  key={`mobile-${active}`}
                  project={projects[active]}
                  slotIndex={active}
                  trackX={trackX}
                  containerWidth={containerWidth}
                  totalSlots={total}
                  active={active}
                  goNext={goNext}
                  goPrev={goPrev}
                  showHint={false}
                  onHintMouseEnter={() => {}}
                  onHintMouseLeave={() => {}}
                  cardWidth={mobileCardW}
                  offsetIndex={0}
                  staticRender
                />
              </motion.div>
            ) : (
              // ── Desktop: 3 explicit slot-keyed cards ──────
              // Keyed by visual slot ('slot-left' etc.) so hover
              // handlers are always tied to position, not project.
              [
                { key: 'slot-left', offsetIndex: -1 as const, idx: mod(active - 1, total) },
                { key: 'slot-center', offsetIndex: 0 as const, idx: active },
                { key: 'slot-right', offsetIndex: 1 as const, idx: mod(active + 1, total) },
              ].map(({ key, offsetIndex, idx }) => (
                <Card
                  key={key}
                  project={projects[idx]}
                  slotIndex={idx}
                  trackX={trackX}
                  containerWidth={containerWidth}
                  totalSlots={total}
                  active={active}
                  goNext={goNext}
                  goPrev={goPrev}
                  showHint={
                    isIdle &&
                    hoveredSlot ===
                      (offsetIndex === -1 ? 'left' : offsetIndex === 1 ? 'right' : null)
                  }
                  onHintMouseEnter={() =>
                    isIdle && setHoveredSlot(offsetIndex === -1 ? 'left' : 'right')
                  }
                  onHintMouseLeave={() => setHoveredSlot(null)}
                  cardWidth={mobileCardW}
                  offsetIndex={offsetIndex}
                />
              ))
            ))}
        </div>
      </div>

      <p className={styles.swipeHint}>&#8592; Swipe to explore &#8594;</p>

      <div className={styles.dots}>
        {projects.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
            onClick={() => handleDotClick(i)}
            aria-label={`Go to project ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
