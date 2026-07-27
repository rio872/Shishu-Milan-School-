import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function Reveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.62, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ kicker, title, copy, align = 'left' }) {
  const centered = align === 'center';
  return (
    <Reveal className={centered ? 'flex flex-col items-center text-center' : ''}>
      <p className="section-kicker">{kicker}</p>
      <h2 className={`section-title text-balance ${centered ? 'mx-auto' : ''}`}>{title}</h2>
      {copy && <p className={`section-copy ${centered ? 'mx-auto' : ''}`}>{copy}</p>}
    </Reveal>
  );
}

export function PrimaryButton({ href = '#contact', children, className = '', onClick }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-gold-400 px-6 py-3.5 text-sm font-extrabold text-navy-950 shadow-lg shadow-gold-500/20 transition hover:-translate-y-0.5 hover:bg-white ${className}`}
    >
      {children}
      <ArrowRight size={17} aria-hidden="true" />
    </a>
  );
}

export function OutlineButton({ href, children, className = '' }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-white/45 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:text-navy-950 ${className}`}
    >
      {children}
    </a>
  );
}
