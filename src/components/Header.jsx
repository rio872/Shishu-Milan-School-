import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Clock3,
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
} from 'lucide-react';
import { navLinks, school } from '../data/schoolData';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    onScroll();

    window.addEventListener('scroll', onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      {/* Top contact bar */}
      <div className="hidden bg-navy-950 text-white lg:block">
        <div className="section-shell flex min-h-10 items-center justify-between gap-6 text-xs">
          <div className="flex items-center gap-5">
            <a
              className="flex items-center gap-2 transition hover:text-gold-400"
              href={`tel:${school.phone}`}
            >
              <Phone size={13} aria-hidden="true" />
              {school.phone}
            </a>

            <a
              className="flex items-center gap-2 transition hover:text-gold-400"
              href={`mailto:${school.email}`}
            >
              <Mail size={13} aria-hidden="true" />
              {school.email}
            </a>
          </div>

          <div className="flex items-center gap-5 text-white/75">
            <span className="flex items-center gap-2">
              <Clock3 size={13} aria-hidden="true" />
              {school.officeHours}
            </span>

            <span className="flex items-center gap-2">
              <MapPin size={13} aria-hidden="true" />
              {school.address}
            </span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? 'border-slate-200/80 bg-white/95 shadow-[0_8px_30px_rgba(15,35,75,0.09)] backdrop-blur-xl'
            : 'border-slate-100 bg-white'
        }`}
      >
        <div className="section-shell flex h-[82px] items-center justify-between gap-4">
          {/* Logo and school name */}
          <a
            href="#home"
            className="flex min-w-0 items-center gap-3"
            aria-label={`${school.name} homepage`}
          >
            {!logoError ? (
              <img
                src={school.logo}
                alt={`${school.name} logo`}
                className="h-14 w-14 shrink-0 rounded-xl bg-white object-contain p-1 shadow-md"
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-navy-900 text-lg font-bold text-gold-400 shadow-md">
                SM
              </div>
            )}

            <span className="min-w-0">
              <strong className="block truncate font-display text-base leading-tight text-navy-950 sm:text-xl">
                {school.name}
              </strong>

              <span className="block truncate text-[10px] font-bold uppercase tracking-[0.14em] text-royal-700 sm:text-[11px] sm:tracking-[0.16em]">
                {school.slogan}
              </span>
            </span>
          </a>

          {/* Desktop navigation */}
          <nav
            className="hidden items-center gap-1 xl:flex"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-3.5 py-2 text-sm font-bold text-slate-700 transition hover:bg-blue-50 hover:text-royal-700"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right buttons */}
          <div className="flex items-center gap-2">
            <a
              href="#admission"
              className="hidden rounded-full bg-royal-600 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-royal-600/20 transition hover:-translate-y-0.5 hover:bg-navy-900 sm:inline-flex"
            >
              Apply Now
            </a>

            <button
              type="button"
              className="grid size-11 place-items-center rounded-full border border-slate-200 text-navy-950 transition hover:bg-slate-50 xl:hidden"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={
                open
                  ? 'Close navigation menu'
                  : 'Open navigation menu'
              }
            >
              {open ? (
                <X aria-hidden="true" />
              ) : (
                <Menu aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile navigation */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-navy-950/45 backdrop-blur-sm xl:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{
                type: 'spring',
                damping: 28,
                stiffness: 260,
              }}
              className="ml-auto flex h-full w-[min(88vw,390px)] flex-col bg-white px-6 pb-8 pt-28 shadow-2xl"
              aria-label="Mobile navigation"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-5">
                {!logoError ? (
                  <img
                    src={school.logo}
                    alt={`${school.name} logo`}
                    className="h-12 w-12 rounded-xl object-contain"
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-navy-900 font-bold text-gold-400">
                    SM
                  </div>
                )}

                <div>
                  <h2 className="font-bold text-navy-950">
                    {school.name}
                  </h2>

                  <p className="text-xs font-semibold uppercase tracking-wider text-royal-700">
                    {school.slogan}
                  </p>
                </div>
              </div>

              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-slate-100 py-4 text-lg font-bold text-navy-950 transition hover:text-royal-600"
                >
                  {link.label}
                </a>
              ))}

              <a
                href="#admission"
                onClick={() => setOpen(false)}
                className="mt-7 rounded-full bg-royal-600 px-5 py-3.5 text-center font-extrabold text-white transition hover:bg-navy-900"
              >
                Apply for Admission
              </a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}