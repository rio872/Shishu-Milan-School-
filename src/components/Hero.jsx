import { motion } from 'framer-motion';
import { CheckCircle2, PlayCircle, Sparkles } from 'lucide-react';
import { school } from '../data/schoolData';
import { OutlineButton, PrimaryButton } from './Shared';

export default function Hero() {
  return (
    <section id="home" className="hero-mesh relative isolate min-h-[calc(100vh-118px)] overflow-hidden text-white">
      
      {/* Background image */}
      <div className="absolute inset-0 -z-20">
        <img
           src="/hero-background.png"
            alt="Shishu Milan English School students"
            className="h-full w-full object-cover opacity-30"
        />
      </div>
      <div className="absolute -left-28 top-24 -z-10 size-80 rounded-full bg-royal-500/25 blur-3xl" />
      <div className="absolute -right-36 bottom-0 -z-10 size-[28rem] rounded-full bg-gold-400/10 blur-3xl" />

      <div className="section-shell grid min-h-[calc(100vh-118px)] items-center gap-14 py-20 lg:grid-cols-[1.06fr_0.94fr]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="glass-card inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-gold-400">
            <Sparkles size={15} /> Admissions Open for 2026–27
          </span>
          <h1 className="mt-6 max-w-3xl font-display text-[clamp(3rem,7vw,6.1rem)] font-extrabold leading-[0.98] tracking-[-0.035em] text-balance">
            Building bright minds for a <span className="text-gold-400">better tomorrow.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80 sm:text-xl">
            {school.slogan}. We nurture curiosity, character and confidence through inspiring teaching and meaningful opportunities.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <PrimaryButton href="#admission">Start Your Admission</PrimaryButton>
            <OutlineButton href="#about">
              <PlayCircle size={18} /> Explore Our School
            </OutlineButton>
          </div>

          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-white/80">
            {['Qualified teachers', 'Safe learning environment', 'Holistic development'].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-gold-400" /> {item}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[560px] lg:mx-0"
        >
          <div className="absolute -inset-4 rotate-2 rounded-[2.6rem] border border-white/15 bg-white/5" />
          <div className="relative overflow-hidden rounded-[2.2rem] border border-white/20 bg-white/10 p-2 shadow-2xl backdrop-blur">
            
            {/* Main hero photo */} 
            <img
            
  src="/hero-photo.png"
  alt="Students of Shishu Milan English School"
  className="h-[430px] w-full rounded-[1.8rem] object-cover sm:h-[540px]"
/>
          
            <div className="absolute inset-x-6 bottom-6 rounded-2xl bg-navy-950/88 p-5 shadow-xl backdrop-blur-md">
              <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-gold-400">Every child matters</p>
              <p className="mt-1 font-display text-xl font-bold">A community where learners feel known, supported and inspired.</p>
            </div>
          </div>
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -left-6 top-14 hidden rounded-2xl bg-white p-4 text-navy-950 shadow-2xl sm:block"
          >
            <strong className="block text-2xl text-royal-600">96%</strong>
            <span className="text-xs font-bold text-slate-500">Success Rate</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
