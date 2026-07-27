import { CheckCircle2 } from 'lucide-react';
import { PrimaryButton, Reveal } from './Shared';

export default function Admission() {
  return (
    <section id="admission" className="relative overflow-hidden bg-royal-600 py-20 text-white">
      <div className="absolute inset-0 subtle-grid opacity-20" />
      <div className="absolute -right-20 -top-28 size-96 rounded-full bg-gold-400/20 blur-3xl" />
      <Reveal className="section-shell relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-gold-400">Admissions Now Open</p>
          <h2 className="mt-3 max-w-3xl font-display text-[clamp(2.2rem,5vw,4.25rem)] font-extrabold leading-tight text-balance">
            Give your child a confident start to their future.
          </h2>
          <div className="mt-6 flex flex-wrap gap-5 text-sm font-bold text-white/85">
            {['Simple enquiry process', 'Campus visit available', 'Friendly admission support'].map((item) => (
              <span key={item} className="flex items-center gap-2"><CheckCircle2 size={17} className="text-gold-400" /> {item}</span>
            ))}
          </div>
        </div>
        <PrimaryButton href="#contact" className="shrink-0 px-8 py-4">Enquire About Admission</PrimaryButton>
      </Reveal>
    </section>
  );
}
