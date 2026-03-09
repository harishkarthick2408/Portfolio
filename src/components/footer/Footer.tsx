'use client';
import styles from './Footer.module.css';
import { FaLinkedinIn, FaGithub, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        {/* ── Col 1: Branding ── */}
        <div className={styles.col}>
          <h2 className={styles.brand}>
            Harish Karthick <span className={styles.accent}>S</span>
          </h2>
          <p className={styles.brandDesc}>
            Full Stack Developer crafting clean, scalable web experiences with modern technologies.
            Developer by passion, debugger by necessity. Building scalable systems and clean user
            experiences with modern web technologies. Turning coffee ☕ into code and ideas into
            digital products.
          </p>
        </div>

        {/* ── Col 2: Quick Links ── */}
        <div className={styles.col}>
          <h3 className={styles.colHeading}>Quick Links</h3>
          <ul className={styles.linkList}>
            {quickLinks.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className={styles.link}
                  onClick={
                    label === 'Home'
                      ? (e) => {
                          e.preventDefault();
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                      : undefined
                  }
                >
                  <span className={styles.arrow}>›</span> {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Col 3: Contact Info ── */}
        <div className={styles.col}>
          <h3 className={styles.colHeading}>Contact Info</h3>
          <ul className={styles.contactList}>
            <li>
              <FaPhone className={styles.contactIcon} />
              <span>+91 87788 75778</span>
            </li>
            <li>
              <FaEnvelope className={styles.contactIcon} />
              <span>karthickh18@gmail.com</span>
            </li>
            <li>
              <FaMapMarkerAlt className={styles.contactIcon} />
              <span>Coimbatore, Tamil Nadu, India</span>
            </li>
          </ul>

          <div className={styles.socials}>
            <a
              href="https://www.linkedin.com/in/harish-karthick-s-099018184"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://github.com/harishkarthick2408"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a href="mailto:karthickh18@gmail.com" className={styles.socialBtn} aria-label="Email">
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <span>Designed with ❤️ by Harish Karthick S</span>
      </div>
    </footer>
  );
}
