'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './Education.module.css';
import { HiOutlineAcademicCap, HiOutlineCalendar, HiOutlineLocationMarker } from 'react-icons/hi';

const viewport = { once: false, amount: 0.25 } as const;

function fadeLeft(delay = 0) {
  return {
    initial: { opacity: 0, x: -50 },
    whileInView: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
    viewport,
  };
}

function fadeRight(delay = 0) {
  return {
    initial: { opacity: 0, x: 50 },
    whileInView: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
    viewport,
  };
}

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 36 },
    whileInView: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 36 },
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
    viewport,
  };
}

export default function Education() {
  return (
    <section id="education" className={styles.section}>
      {/* section heading */}
      <div className={styles.container}>
        {/* LEFT — content */}
        <motion.div className={styles.content} {...fadeLeft(0.1)}>
          <motion.div {...fadeUp(0)}>
            <span className={styles.label}>Where I studied</span>
            <h2 className={styles.heading}>
              My <span className={styles.accent}>Education</span>
            </h2>
          </motion.div>

          <div className={styles.badge}>
            <HiOutlineAcademicCap className={styles.badgeIcon} />
            <span>B.Tech Information Technology</span>
          </div>

          <h3 className={styles.collegeName}>Sri Eshwar College of Engineering</h3>

          <div className={styles.meta}>
            <span className={styles.metaItem}>
              <HiOutlineLocationMarker className={styles.metaIcon} />
              Coimbatore, Tamil Nadu
            </span>
            <span className={styles.metaItem}>
              <HiOutlineCalendar className={styles.metaIcon} />
              2023 – 2027
            </span>
          </div>

          <p className={styles.desc}>
            Pursuing a B.Tech in Information Technology, building a strong foundation in data
            structures, algorithms, operating systems, and software engineering. Actively involved
            in technical clubs and hands-on project development throughout the program.
          </p>

          <div className={styles.highlights}>
            <div className={styles.highlight}>
              <span className={styles.highlightNum}>8.2</span>
              <span className={styles.highlightLabel}>CGPA</span>
            </div>
            <div className={styles.highlightDivider} />
            <div className={styles.highlight}>
              <span className={styles.highlightNum}>4</span>
              <span className={styles.highlightLabel}>Years Course</span>
            </div>
            <div className={styles.highlightDivider} />
            <div className={styles.highlight}>
              <span className={styles.highlightNum}>B.Tech IT</span>
              <span className={styles.highlightLabel}>Department</span>
            </div>
          </div>

          <motion.a
            href="https://sece.ac.in/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.visitBtn}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Visit College Website ↗
          </motion.a>
        </motion.div>

        {/* RIGHT — college image */}
        <motion.div
          className={styles.imageWrapper}
          {...fadeRight(0.2)}
          whileHover={{ y: -8, scale: 1.02 }}
          style={{ cursor: 'default' }}
        >
          <div className={styles.imageFrame}>
            <Image
              src="/images/secelogo.png"
              alt="Sri Eshwar College of Engineering"
              fill
              className={styles.image}
              sizes="(max-width: 768px) 90vw, 480px"
              priority
            />
          </div>
          <span className={`${styles.corner} ${styles.cornerTL}`} />
          <span className={`${styles.corner} ${styles.cornerBR}`} />
        </motion.div>
      </div>
    </section>
  );
}
