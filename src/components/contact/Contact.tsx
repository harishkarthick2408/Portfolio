'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion } from 'framer-motion';
import styles from './Contact.module.css';
import { EMAILJS_CONFIG } from '@/lib/emailjs';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

const viewport = { once: false, amount: 0.2 } as const;

function validate(data: FormData): FieldErrors {
  const errs: FieldErrors = {};
  if (!data.name.trim()) errs.name = 'Full name is required.';
  if (!data.email.trim()) {
    errs.email = 'Email address is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errs.email = 'Please enter a valid email address.';
  }
  if (!data.message.trim()) errs.message = 'Message cannot be empty.';
  return errs;
}

export default function Contact() {
  const [form, setForm] = useState<FormData>({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [serverError, setServerError] = useState('');

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FieldErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (status === 'error') setServerError('');
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    setStatus('loading');
    setServerError('');
    try {
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          from_name: form.name,
          from_email: form.email,
          phone_number: form.phone,
          message: form.message,
        },
        EMAILJS_CONFIG.publicKey,
      );
      setStatus('success');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err: unknown) {
      setStatus('error');
      setServerError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        {/* ── LEFT: GIF ─────────────────────────────────────────────── */}
        <motion.div
          className={styles.gifSide}
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          viewport={viewport}
        >
          <div className={styles.gifGlow}>
            <div className={styles.gifFloat}>
              <DotLottieReact
                src="/images/Untitled file.lottie"
                loop
                autoplay
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          </div>

          <div className={styles.gifText}>
            <h2 className={styles.gifHeading}>Let&apos;s Work Together</h2>
            <p className={styles.gifSubtext}>
              Have a project in mind? I&apos;d love to hear about it. Send me a message and
              let&apos;s create something amazing.
            </p>
          </div>
        </motion.div>

        {/* ── RIGHT: FORM ───────────────────────────────────────────── */}
        <motion.div
          className={styles.formSide}
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 60 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] as const }}
          viewport={viewport}
        >
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.sectionLabel}>Contact</span>
              <h3 className={styles.cardTitle}>Get In Touch</h3>
            </div>

            {status === 'success' ? (
              /* ── SUCCESS STATE ── */
              <div className={styles.successState}>
                <div className={styles.checkWrap}>
                  <svg viewBox="0 0 52 52" className={styles.checkSvg}>
                    <circle className={styles.checkCircle} cx="26" cy="26" r="25" fill="none" />
                    <path className={styles.checkMark} fill="none" d="M14 27 l8 8 l16-16" />
                  </svg>
                </div>
                <p className={styles.successText}>Message sent successfully!</p>
                <button className={styles.resetBtn} onClick={() => setStatus('idle')}>
                  Send another message
                </button>
              </div>
            ) : (
              /* ── FORM ── */
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                {/* Full Name */}
                <div className={`${styles.field} ${errors.name ? styles.fieldError : ''}`}>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder=" "
                    autoComplete="name"
                    maxLength={100}
                  />
                  <label htmlFor="contact-name" className={styles.floatingLabel}>
                    Full Name
                  </label>
                  {errors.name && <span className={styles.errorMsg}>{errors.name}</span>}
                </div>

                {/* Email */}
                <div className={`${styles.field} ${errors.email ? styles.fieldError : ''}`}>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder=" "
                    autoComplete="email"
                    maxLength={254}
                  />
                  <label htmlFor="contact-email" className={styles.floatingLabel}>
                    Email Address
                  </label>
                  {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
                </div>

                {/* Phone (optional) */}
                <div className={styles.field}>
                  <input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder=" "
                    autoComplete="tel"
                    maxLength={30}
                  />
                  <label htmlFor="contact-phone" className={styles.floatingLabel}>
                    Phone Number <span className={styles.optional}>(optional)</span>
                  </label>
                </div>

                {/* Message */}
                <div
                  className={`${styles.field} ${styles.textareaField} ${
                    errors.message ? styles.fieldError : ''
                  }`}
                >
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    className={`${styles.input} ${styles.textarea}`}
                    placeholder=" "
                    rows={4}
                    maxLength={5000}
                  />
                  <label htmlFor="contact-message" className={styles.floatingLabel}>
                    Message
                  </label>
                  {errors.message && <span className={styles.errorMsg}>{errors.message}</span>}
                </div>

                {/* Server-side error */}
                {serverError && <p className={styles.serverError}>{serverError}</p>}

                {/* Submit */}
                <button type="submit" className={styles.submitBtn} disabled={status === 'loading'}>
                  {status === 'loading' ? (
                    <>
                      <span className={styles.spinner} />
                      Sending…
                    </>
                  ) : (
                    'Send Message →'
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
