'use client';
import styles from './Hero.module.css';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import NeonParticles from '@/components/ui/NeonParticles';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import {
  SiJavascript,
  SiTypescript,
  SiCplusplus,
  SiHtml5,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiRedis,
  SiFirebase,
  SiGooglecloud,
  SiGit,
  SiGithub,
  SiDocker,
  SiPostman,
  SiVercel,
  SiNginx,
} from 'react-icons/si';
import { TbBrandAws, TbBrandAzure } from 'react-icons/tb';

const techStack = [
  { icon: SiJavascript, label: 'JavaScript', color: '#F7DF1E' },
  { icon: SiTypescript, label: 'TypeScript', color: '#3178C6' },
  { icon: SiCplusplus, label: 'C++', color: '#00599C' },
  { icon: SiHtml5, label: 'HTML5', color: '#E34F26' },
  { icon: SiReact, label: 'React', color: '#61DAFB' },
  { icon: SiNodedotjs, label: 'Node.js', color: '#339933' },
  { icon: SiExpress, label: 'Express', color: '#ffffff' },
  { icon: SiMongodb, label: 'MongoDB', color: '#47A248' },
  { icon: SiMysql, label: 'MySQL', color: '#4479A1' },
  { icon: SiPostgresql, label: 'PostgreSQL', color: '#4169E1' },
  { icon: SiRedis, label: 'Redis', color: '#DC382D' },
  { icon: SiFirebase, label: 'Firebase', color: '#FFCA28' },
  { icon: TbBrandAws, label: 'AWS', color: '#FF9900' },
  { icon: TbBrandAzure, label: 'Azure', color: '#0078D4' },
  { icon: SiGooglecloud, label: 'Google Cloud', color: '#4285F4' },
  { icon: SiGit, label: 'Git', color: '#F05032' },
  { icon: SiGithub, label: 'GitHub', color: '#ffffff' },
  { icon: SiDocker, label: 'Docker', color: '#2496ED' },
  { icon: SiPostman, label: 'Postman', color: '#FF6C37' },
  { icon: SiVercel, label: 'Vercel', color: '#ffffff' },
  // { icon: SiNginx,       label: 'Nginx',          color: '#009639' },
];

const roles = [
  'Passionate Engineer',
  'Full Stack Developer',
  'MERN Stack Developer',
  'Tech Enthusiast',
];

function TypingText() {
  const [displayed, setDisplayed] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const current = roles[roleIdx];
    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((i) => i + 1), 60);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1200);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((i) => i - 1), 30);
    } else if (deleting && charIdx === 0) {
      timeout = setTimeout(() => {
        setDeleting(false);
        setRoleIdx((idx) => (idx + 1) % roles.length);
      }, 400);
    }
    setDisplayed(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, roleIdx]);

  return (
    <span>
      <span className={styles.neonPink}>{displayed}</span>
      <span className={styles.cursor}>|</span>
    </span>
  );
}

// Parallax toward cursor + continuous floating via rAF
function useParallaxFloating(imgRef: React.RefObject<HTMLDivElement>) {
  useEffect(() => {
    const node = imgRef.current;
    if (!node) return;
    let frame: number;
    let x = 0,
      y = 0;
    let targetX = 0,
      targetY = 0;
    let floatPhase = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (window.innerWidth * 0.5);
      const dy = (e.clientY - cy) / (window.innerHeight * 0.5);
      targetX = Math.max(-9, Math.min(9, dx * 9));
      targetY = Math.max(-9, Math.min(9, dy * 9));
    };

    const onMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const animate = () => {
      x += (targetX - x) * 0.05;
      y += (targetY - y) * 0.05;
      floatPhase += 0.012;
      const floatY = Math.sin(floatPhase) * 6;
      node.style.transform = `translate3d(${x}px, ${y + floatY}px, 0)`;
      frame = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    animate();

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(frame);
    };
  }, [imgRef]);
}

export default function Hero() {
  const profileRef = useRef<HTMLDivElement>(null);
  useParallaxFloating(profileRef as React.RefObject<HTMLDivElement>);

  return (
    <section className={styles.heroSection}>
      {/* Particles wrapper — position:absolute takes it out of the flex flow */}
      <div className={styles.particlesBg}>
        <NeonParticles />
      </div>

      {/* Left side: text content */}
      <div className={styles.heroContent}>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut', delay: 0.1 }}
        >
          <span className={styles.greeting}>Hi There,</span>
          <br />
          <span className={styles.name}>
            I&apos;m <span className={styles.neon}>Harish Karthick S</span>
          </span>
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut', delay: 0.4 }}
        >
          <TypingText />
        </motion.p>

        <motion.div
          className={styles.ctaRow}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut', delay: 0.7 }}
        >
          <a href="#about" className={styles.ctaBtn}>
            About Me <span className={styles.ctaIcon}>&#8595;</span>
          </a>

          <a
            href="https://github.com/harishkarthick2408"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIcon}
            aria-label="GitHub"
          >
            <FaGithub />
          </a>

          <a
            href="https://www.linkedin.com/in/harish-karthick-s-099018184"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIcon}
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
        </motion.div>

        {/* Tech stack icons */}
        <motion.div
          className={styles.techStack}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut', delay: 1.1 }}
        >
          <p className={styles.techLabel}>Technologies I Surf Through</p>
          <div className={styles.techIcons}>
            {techStack.map(({ icon: Icon, label, color }) => (
              <div key={label} className={styles.techIcon} title={label}>
                <Icon color={color} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right side: profile image — entrance handled by motion wrapper,
          parallax + float handled by the inner ref div */}
      <motion.div
        className={styles.heroImageOuter}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: 'easeOut', delay: 1.0 }}
      >
        <div ref={profileRef} className={styles.heroImageWrap}>
          <img
            src="/images/harish profile.jpeg"
            alt="Harish Karthick S"
            className={styles.heroImage}
          />
        </div>
      </motion.div>
    </section>
  );
}
