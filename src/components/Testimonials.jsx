import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { testimonials } from '../data/schoolData';
import { SectionHeading } from './Shared';

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % testimonials.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, []);

  const change = (direction) => {
    setIndex((value) => (value + direction + testimonials.length) % testimonials.length);
  };

  return (
    <section className="section-padding bg-blue-50">
      <div className="section-shell grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          kicker="Community Voices"
          title="What families and students say about us."
          copy="Trust grows through consistent care, communication and positive learning experiences."
        />

        <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] bg-white p-8 shadow-2xl shadow-navy-900/10 sm:p-12">
          <Quote className="absolute right-8 top-8 text-blue-100" size={72} />
          <AnimatePresence mode="wait">
            <motion.article
              key={index}
              initial={{ opacity: 0, x: 35 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -35 }}
              transition={{ duration: 0.45 }}
              className="relative"
            >
              <div className="flex gap-1 text-gold-500" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, starIndex) => <Star key={starIndex} size={18} fill="currentColor" />)}
              </div>
              <blockquote className="mt-7 font-display text-[clamp(1.55rem,3vw,2.3rem)] font-bold leading-snug text-navy-950">
                “{testimonials[index].quote}”
              </blockquote>
              <div className="mt-8">
                <strong className="block text-lg text-navy-950">{testimonials[index].name}</strong>
                <span className="text-sm font-bold text-royal-700">{testimonials[index].role}</span>
              </div>
            </motion.article>
          </AnimatePresence>

          <div className="absolute bottom-8 right-8 flex gap-2">
            <button type="button" onClick={() => change(-1)} className="grid size-11 place-items-center rounded-full border border-slate-200 text-navy-950 hover:bg-navy-900 hover:text-white" aria-label="Previous testimonial">
              <ChevronLeft />
            </button>
            <button type="button" onClick={() => change(1)} className="grid size-11 place-items-center rounded-full bg-navy-900 text-white hover:bg-royal-600" aria-label="Next testimonial">
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
