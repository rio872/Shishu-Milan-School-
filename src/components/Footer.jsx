import { useEffect, useState } from 'react';
import {
  ArrowUp,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  Send,
} from 'lucide-react';

import { navLinks, school } from '../data/schoolData';

/* TikTok icon because Lucide React does not include it */
function TikTokIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M15.5 3c.4 2.2 1.7 3.6 4 4v3.2c-1.5 0-2.8-.4-4-1.2v6.2a6.2 6.2 0 1 1-5.4-6.1v3.3a3 3 0 1 0 2.2 2.9V3h3.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* Newsletter section */
export function Newsletter() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const submit = (event) => {
    event.preventDefault();

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setMessage('Please enter a valid email address.');
      return;
    }

    setMessage('You are subscribed to school updates.');
    setEmail('');
  };

  return (
    <section className="bg-gold-400 py-10">
      <div className="section-shell flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
        <div>
          <h2 className="font-display text-3xl font-extrabold text-navy-950">
            Receive school news and notices.
          </h2>

          <p className="mt-2 text-sm font-semibold text-navy-950/70">
            Important updates delivered directly to your inbox.
          </p>
        </div>

        <form
          onSubmit={submit}
          noValidate
          className="w-full max-w-xl"
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <label
              className="sr-only"
              htmlFor="newsletter-email"
            >
              Email address
            </label>

            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setMessage('');
              }}
              placeholder="Enter your email address"
              className="min-h-13 flex-1 rounded-full border-0 bg-white px-5 text-sm text-navy-950 outline-none ring-4 ring-transparent focus:ring-navy-900/10"
            />

            <button
              type="submit"
              className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-navy-900 px-6 text-sm font-extrabold text-white transition hover:bg-royal-700"
            >
              Subscribe
              <Send size={16} aria-hidden="true" />
            </button>
          </div>

          {message && (
            <p
              className="mt-2 text-sm font-bold text-navy-950"
              role="status"
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

/* Footer section */
export default function Footer() {
  const [showTop, setShowTop] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 650);
    };

    onScroll();

    window.addEventListener('scroll', onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const whatsappNumber = String(school.whatsapp || '').replace(/\D/g, '');
  const hasWhatsapp = whatsappNumber.length >= 8;

  const socialLinks = [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/share/19P2umYQPi/?mibextid=wwXIfr',
      icon: Facebook,
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@shishu.milan.engl',
      icon: TikTokIcon,
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/YOUR_INSTAGRAM_USERNAME',
      icon: Instagram,
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/YOUR_LINKEDIN_PAGE',
      icon: Linkedin,
    },
  ];

  return (
    <>
      <footer className="bg-navy-950 pt-16 text-white">
        <div className="section-shell grid gap-10 pb-12 md:grid-cols-2 lg:grid-cols-[1.35fr_0.75fr_0.9fr_1.1fr]">
          {/* School information */}
          <div>
            <a
              href="#home"
              className="flex items-center gap-3"
              aria-label={`${school.name} homepage`}
            >
              {!logoError ? (
                <img
                  src={school.logo}
                  alt={`${school.name} logo`}
                  className="h-16 w-16 shrink-0 rounded-2xl bg-white object-contain p-1 shadow-md"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-white font-bold text-navy-950">
                  SM
                </div>
              )}

              <strong className="font-display text-xl leading-tight sm:text-2xl">
                {school.name}
              </strong>
            </a>

            <p className="mt-5 max-w-sm leading-7 text-white/60">
              A caring school community committed to academic excellence,
              strong values and confident lifelong learners.
            </p>

            {/* Social media icons */}
            <div className="mt-6 flex flex-wrap gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${school.name} on ${social.name}`}
                    title={social.name}
                    className="grid size-11 place-items-center rounded-full border border-white/15 text-white/70 transition hover:-translate-y-1 hover:border-gold-400 hover:bg-gold-400 hover:text-navy-950"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-display text-lg font-bold">
              Quick Links
            </h3>

            <div className="mt-5 grid gap-3">
              {navLinks.slice(0, 6).map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-semibold text-white/60 transition hover:text-gold-400"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Admissions */}
          <div>
            <h3 className="font-display text-lg font-bold">
              Admissions
            </h3>

            <div className="mt-5 grid gap-3 text-sm font-semibold text-white/60">
              <a
                href="#admission"
                className="transition hover:text-gold-400"
              >
                Admission Process
              </a>

              <a
                href="#academics"
                className="transition hover:text-gold-400"
              >
                Academic Programs
              </a>

              <a
                href="#facilities"
                className="transition hover:text-gold-400"
              >
                Campus Facilities
              </a>

              <a
                href="#contact"
                className="transition hover:text-gold-400"
              >
                Book a School Visit
              </a>

              <a
                href="#contact"
                className="transition hover:text-gold-400"
              >
                Request Information
              </a>
            </div>
          </div>

          {/* Contact details */}
          <div>
            <h3 className="font-display text-lg font-bold">
              Contact Details
            </h3>

            <div className="mt-5 space-y-4 text-sm text-white/60">
              <p>{school.address}</p>

              <a
                href={`tel:${school.phone}`}
                className="block transition hover:text-gold-400"
              >
                {school.phone}
              </a>

              <a
                href={`mailto:${school.email}`}
                className="flex items-center gap-2 break-all transition hover:text-gold-400"
              >
                <Mail size={15} aria-hidden="true" />
                {school.email}
              </a>

              <p>{school.officeHours}</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10">
          <div className="section-shell flex flex-col gap-2 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {school.name}. All rights reserved.
            </p>

            <p>
              Designed for students, parents and teachers.
            </p>
          </div>
        </div>
      </footer>

      {/* WhatsApp button */}
      <a
        href={
          hasWhatsapp
            ? `https://wa.me/${whatsappNumber}`
            : '#contact'
        }
        target={hasWhatsapp ? '_blank' : undefined}
        rel={hasWhatsapp ? 'noopener noreferrer' : undefined}
        className="fixed bottom-5 left-5 z-30 grid size-14 place-items-center rounded-full bg-emerald-500 text-white shadow-2xl transition hover:-translate-y-1 hover:bg-emerald-600"
        aria-label="Chat with the school on WhatsApp"
      >
        <MessageCircle size={27} aria-hidden="true" />
      </a>

      {/* Back-to-top button */}
      {showTop && (
        <button
          type="button"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            })
          }
          className="fixed bottom-5 right-5 z-30 grid size-12 place-items-center rounded-full bg-navy-900 text-white shadow-2xl transition hover:-translate-y-1 hover:bg-royal-600"
          aria-label="Back to top"
        >
          <ArrowUp size={21} aria-hidden="true" />
        </button>
      )}
    </>
  );
}