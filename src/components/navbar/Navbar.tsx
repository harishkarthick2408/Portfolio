'use client';
import { useEffect, useState } from 'react';
import styles from './Navbar.module.css';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Projects', href: '#projects' },
  // { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  // Add scrolled class after 10px
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight active section via IntersectionObserver
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace('#', ''));
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: '-10% 0px -85% 0px', threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });

    // Fallback: if scrolled to very top, always highlight Home
    const onScroll = () => {
      if (window.scrollY < 100) setActive('home');
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const handleLinkClick = (href: string) => {
    setMenuOpen(false);
    setActive(href.replace('#', ''));
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      {/* Left: name */}
      <a href="#home" className={styles.brand} onClick={() => handleLinkClick('#home')}>
        Harish Karthick S
      </a>

      {/* Right: desktop links */}
      <ul className={styles.navLinks}>
        {navLinks.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className={active === link.href.replace('#', '') ? styles.active : ''}
              onClick={() => handleLinkClick(link.href)}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Hamburger for mobile */}
      <button
        className={styles.hamburger}
        aria-label="Toggle menu"
        onClick={() => setMenuOpen((o) => !o)}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Mobile dropdown */}
      <ul className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`}>
        {navLinks.map((link) => (
          <li key={link.href}>
            <a href={link.href} onClick={() => handleLinkClick(link.href)}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
