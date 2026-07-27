import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Expand, X } from 'lucide-react';
import { galleryImages } from '../data/schoolData';
import { Reveal, SectionHeading } from './Shared';

export default function Gallery() {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section id="gallery" className="section-padding bg-white">
      <div className="section-shell">
        <SectionHeading
          kicker="School Gallery"
          title="A glimpse of learning, friendship and achievement."
          copy="Explore everyday moments that make our school community active, joyful and memorable."
          align="center"
        />
        <div className="mt-12 grid auto-rows-[230px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((image, index) => (
            <Reveal key={image.src} className={index === 0 || index === 3 ? 'sm:row-span-2' : ''} delay={index * 0.04}>
              <button
                type="button"
                onClick={() => setSelected(image)}
                className="group relative h-full w-full overflow-hidden rounded-3xl text-left shadow-md"
                aria-label={`Preview ${image.label}`}
              >
                <img src={image.src} alt={image.alt} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                <span className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent opacity-80" />
                <span className="absolute inset-x-5 bottom-5 flex items-center justify-between text-white">
                  <strong className="font-display text-xl">{image.label}</strong>
                  <span className="grid size-10 place-items-center rounded-full bg-white/15 backdrop-blur"><Expand size={18} /></span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] grid place-items-center bg-navy-950/92 p-4 backdrop-blur-lg"
            role="dialog"
            aria-modal="true"
            aria-label="Image preview"
            onClick={() => setSelected(null)}
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="absolute right-5 top-5 grid size-12 place-items-center rounded-full bg-white text-navy-950"
              aria-label="Close image preview"
            >
              <X />
            </button>
            <motion.figure
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="max-w-5xl"
              onClick={(event) => event.stopPropagation()}
            >
              <img src={selected.src} alt={selected.alt} className="max-h-[78vh] w-full rounded-2xl object-contain" />
              <figcaption className="mt-4 text-center font-display text-xl font-bold text-white">{selected.label}</figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
