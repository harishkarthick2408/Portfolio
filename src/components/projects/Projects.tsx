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
}: {
  project: (typeof projects)[0];
  slotIndex: number;
  trackX: MotionValue<number>;
  containerWidth: number;
  totalSlots: number;
}) {
  const [logoError, setLogoError] = useState(false);
  const cx = containerWidth / 2 - CARD_W / 2;
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

  return (
    <motion.div
      className={styles.card}
      style={{
        position: 'absolute',
        top: '50%',
        left: 0,
        width: CARD_W,
        x,
        y: '-50%',
        scale,
        opacity,
        transformOrigin: 'center center',
      }}
    >
      {/* Banner */}
      <div className={styles.cardBanner}>
        {!logoError ? (
          <Image
            src={project.logo}
            alt={`${project.title} banner`}
            fill
            sizes="420px"
            className={styles.bannerImg}
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

  const containerRef = useRef<HTMLDivElement>(null);
  const trackX = useMotionValue(0);
  const animating = useRef(false);
  // cumulative slide count — trackX = -slideCount * UNIT always
  const slideCount = useRef(0);

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const goTo = useCallback(
    (newActive: number, step: 1 | -1) => {
      if (animating.current) return;
      animating.current = true;

      const target = mod(newActive, total);
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
          animating.current = false;
        },
      });
    },
    [trackX],
  );

  const goNext = useCallback(() => goTo(active + 1, 1), [active, goTo]);
  const goPrev = useCallback(() => goTo(active - 1, -1), [active, goTo]);

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
        <button
          className={`${styles.arrowBtn} ${styles.arrowBtnLeft}`}
          onClick={goPrev}
          aria-label="Previous project"
        >
          <svg
            className={styles.arrowSvg}
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: 'block', flexShrink: 0 }}
          >
            <polyline
              points="15 18 9 12 15 6"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div ref={containerRef} className={styles.carouselViewport}>
          {containerWidth > 0 &&
            projects.map((project, i) => (
              <Card
                key={i}
                project={project}
                slotIndex={i}
                trackX={trackX}
                containerWidth={containerWidth}
                totalSlots={total}
              />
            ))}
        </div>

        <button
          className={`${styles.arrowBtn} ${styles.arrowBtnRight}`}
          onClick={goNext}
          aria-label="Next project"
        >
          <svg
            className={styles.arrowSvg}
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: 'block', flexShrink: 0 }}
          >
            <polyline
              points="9 18 15 12 9 6"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

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
