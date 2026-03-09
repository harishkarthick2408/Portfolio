'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './About.module.css';

const hidden = { opacity: 0, y: 40 };
const visible = { opacity: 1, y: 0 };
const hiddenLeft = { opacity: 0, x: -60 };
const visibleLeft = { opacity: 1, x: 0 };
const viewport = { once: false, amount: 0.3 } as const;

function fadeUp(delay: number) {
  return {
    initial: hidden,
    whileInView: visible,
    exit: hidden,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
    viewport,
  };
}

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        {/* LEFT — photo */}
        <motion.div
          className={styles.photoWrapper}
          initial={hiddenLeft}
          whileInView={visibleLeft}
          exit={hiddenLeft}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          viewport={viewport}
          whileHover={{ y: -10, rotate: 1.5, scale: 1.03 }}
          style={{ cursor: 'pointer' }}
        >
          <div className={styles.photoFrame}>
            <Image
              src="/images/about.jpeg"
              alt="Profile photo"
              fill
              className={styles.photo}
              sizes="(max-width: 768px) 80vw, 380px"
              priority
            />
          </div>
          {/* decorative corner accents */}
          <span className={`${styles.corner} ${styles.cornerTL}`} />
          <span className={`${styles.corner} ${styles.cornerBR}`} />
        </motion.div>

        {/* RIGHT — text content */}
        <div className={styles.content}>
          <motion.span className={styles.label} {...fadeUp(0)}>
            Get to know me
          </motion.span>

          <motion.h2 className={styles.heading} {...fadeUp(0.12)}>
            About <span className={styles.accent}>Me</span>
          </motion.h2>

          <motion.p className={styles.bio} {...fadeUp(0.24)}>
            Full Stack Developer passionate about building scalable web applications and backend
            systems. Experienced in the MERN stack and product development, with hands-on work on
            real-world platforms like TrackBuddy, a fleet tracking solution.
          </motion.p>

          <motion.p className={styles.bio} {...fadeUp(0.36)}>
            With hands-on experience in the MERN stack, cloud platforms, and modern DevOps
            practices, I enjoy building end-to-end products — from intuitive UIs to robust back-end
            systems.
          </motion.p>

          <motion.a
            href="https://drive.google.com/file/d/1LEnKwSIY_9NBPwN5iMZUaXqrTP2LEQjf/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.resumeBtn}
            {...fadeUp(0.44)}
          >
            View Resume
          </motion.a>

          <motion.div className={styles.stats} {...fadeUp(0.48)}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>Yet Too</span>
              <span className={styles.statLabel}>Years Experience</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNumber}>5+</span>
              <span className={styles.statLabel}>Projects Built</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNumber}>10+</span>
              <span className={styles.statLabel}>Technologies</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
