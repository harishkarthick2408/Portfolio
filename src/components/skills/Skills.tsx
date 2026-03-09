'use client';
import { motion } from 'framer-motion';
import styles from './Skills.module.css';
import { skills } from '@/data/skills';
import { Skill } from '@/types/skill';

const viewport = { once: false, amount: 0.2 } as const;

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 36 },
    whileInView: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 36 },
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
    viewport,
  };
}

const categories: { key: Skill['category']; label: string; sub: string }[] = [
  { key: 'technical', label: 'Technical Skills', sub: 'Languages & Frameworks' },
  { key: 'tools', label: 'Tech Tools', sub: 'Platforms & DevOps' },
  { key: 'soft', label: 'Soft Skills', sub: 'People & Mindset' },
];

export default function Skills() {
  return (
    <section id="skills" className={styles.section}>
      {/* heading */}
      <motion.div className={styles.headerWrap} {...fadeUp(0)}>
        <span className={styles.label}>What I bring</span>
        <h2 className={styles.heading}>
          My <span className={styles.accent}>Skills</span>
        </h2>
      </motion.div>

      <div className={styles.categories}>
        {categories.map((cat, ci) => {
          const items = skills.filter((s) => s.category === cat.key);
          return (
            <motion.div key={cat.key} className={styles.card} {...fadeUp(ci * 0.12)}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>{cat.label}</h3>
                <span className={styles.cardSub}>{cat.sub}</span>
              </div>

              <div className={cat.key === 'soft' ? styles.softGrid : styles.pillGrid}>
                {items.map((skill, i) =>
                  cat.key === 'soft' ? (
                    <motion.span
                      key={skill.name}
                      className={styles.softPill}
                      {...fadeUp(ci * 0.12 + i * 0.04)}
                    >
                      {skill.name}
                    </motion.span>
                  ) : (
                    <motion.div
                      key={skill.name}
                      className={styles.pill}
                      {...fadeUp(ci * 0.12 + i * 0.04)}
                      whileHover={{ scale: 1.06, y: -3 }}
                    >
                      {skill.icon && (
                        <skill.icon className={styles.pillIcon} style={{ color: skill.color }} />
                      )}
                      <span className={styles.pillName}>{skill.name}</span>
                    </motion.div>
                  ),
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
