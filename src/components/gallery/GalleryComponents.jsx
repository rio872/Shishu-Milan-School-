import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import {
  Camera,
  ChevronLeft,
  ChevronRight,
  Eye,
  ImageOff,
  Images,
  Play,
  Sparkles,
  X,
} from 'lucide-react';

import { school } from '../../data/schoolData';

const reveal = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: 'easeOut',
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

/* --------------------------------------------------
   Gallery Hero
-------------------------------------------------- */

export function GalleryHero({
  image = '/gallery-hero.jpg',
}) {
  return (
    <section className="relative isolate min-h-[560px] overflow-hidden bg-navy-950 text-white">
      <img
        src={image}
        alt={`School gallery at ${school.name}`}
        className="absolute inset-0 -z-30 h-full w-full object-cover object-center"
        onError={(event) => {
          event.currentTarget.style.display = 'none';
        }}
      />

      <div className="absolute inset-0 -z-20 bg-gradient-to-r from-navy-950/95 via-navy-950/80 to-navy-950/35" />

      <div className="section-shell relative z-10 flex min-h-[560px] items-center py-20">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.nav
            variants={reveal}
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm font-bold text-white/75"
          >
            <a
              href="/"
              className="transition hover:text-gold-400"
            >
              Home
            </a>

            <ChevronRight
              size={16}
              aria-hidden="true"
            />

            <span className="text-gold-400">
              Gallery
            </span>
          </motion.nav>

          <motion.p
            variants={reveal}
            className="mt-9 text-sm font-extrabold uppercase tracking-[0.22em] text-gold-400"
          >
            Life at our school
          </motion.p>

          <motion.h1
            variants={reveal}
            className="mt-4 font-display text-5xl font-extrabold leading-tight sm:text-6xl lg:text-7xl"
          >
            School Gallery
          </motion.h1>

          <motion.p
            variants={reveal}
            className="mt-6 max-w-2xl text-lg leading-8 text-white/80 sm:text-xl"
          >
            Explore memorable moments from classroom learning,
            school celebrations, sports, educational visits,
            student projects and special events at {school.name}.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------------------------------
   Gallery Filters
-------------------------------------------------- */

export function GalleryFilters({
  categories,
  selectedCategory,
  onChange,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      className="flex flex-wrap justify-center gap-3"
      role="group"
      aria-label="Gallery categories"
    >
      {categories.map((category) => {
        const isSelected =
          selectedCategory === category;

        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            aria-pressed={isSelected}
            className={`rounded-full px-5 py-3 text-sm font-extrabold transition ${
              isSelected
                ? 'bg-royal-600 text-white shadow-lg shadow-royal-600/20'
                : 'border border-slate-200 bg-white text-slate-600 hover:border-royal-500 hover:text-royal-600'
            }`}
          >
            {category}
          </button>
        );
      })}
    </motion.div>
  );
}

/* --------------------------------------------------
   Gallery Card
-------------------------------------------------- */

export function GalleryCard({
  item,
  onClick,
}) {
  const [loaded, setLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.article
      variants={reveal}
      className="group relative aspect-square overflow-hidden rounded-[1.75rem] bg-slate-200 shadow-sm"
    >
      {!loaded && !imageError && (
        <div className="absolute inset-0 animate-pulse bg-slate-200" />
      )}

      {imageError ? (
        <div className="grid h-full place-items-center bg-slate-100 text-slate-400">
          <div className="text-center">
            <ImageOff
              size={38}
              className="mx-auto"
              aria-hidden="true"
            />

            <p className="mt-3 text-sm font-bold">
              Image unavailable
            </p>
          </div>
        </div>
      ) : (
        <img
          src={item.image}
          alt={item.altText}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => {
            setLoaded(true);
            setImageError(true);
          }}
          className={`h-full w-full object-cover transition duration-700 group-hover:scale-110 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {!imageError && (
        <button
          type="button"
          onClick={onClick}
          aria-label={`View ${item.title}`}
          className="absolute inset-0 flex items-end bg-gradient-to-t from-navy-950/95 via-navy-950/20 to-transparent p-5 text-left opacity-100 transition duration-300 sm:opacity-0 sm:group-hover:opacity-100"
        >
          <div className="w-full translate-y-0 transition duration-300 sm:translate-y-4 sm:group-hover:translate-y-0">
            <span className="inline-flex items-center gap-2 rounded-full bg-gold-400 px-3 py-1.5 text-xs font-extrabold text-navy-950">
              <Eye
                size={14}
                aria-hidden="true"
              />

              View Photo
            </span>

            <h3 className="mt-3 font-display text-xl font-bold text-white">
              {item.title}
            </h3>

            <p className="mt-1 text-sm font-semibold text-white/70">
              {item.category}
            </p>
          </div>
        </button>
      )}
    </motion.article>
  );
}

/* --------------------------------------------------
   Gallery Loading Skeleton
-------------------------------------------------- */

function GallerySkeleton() {
  return (
    <div className="aspect-square animate-pulse rounded-[1.75rem] bg-slate-200" />
  );
}

/* --------------------------------------------------
   Gallery Grid
-------------------------------------------------- */

export function GalleryGrid({
  items,
  loading,
  onSelect,
  onViewAll,
}) {
  if (loading) {
    return (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({
          length: 12,
        }).map((_, index) => (
          <GallerySkeleton key={index} />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="rounded-[2rem] border border-dashed border-slate-300 bg-white px-6 py-16 text-center"
      >
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-slate-100 text-slate-400">
          <Images
            size={30}
            aria-hidden="true"
          />
        </span>

        <h3 className="mt-6 font-display text-2xl font-bold text-navy-950">
          No photos in this category
        </h3>

        <p className="mx-auto mt-3 max-w-md leading-7 text-slate-600">
          We are still adding photos to this gallery category.
          View all school photos to explore other moments.
        </p>

        <button
          type="button"
          onClick={onViewAll}
          className="mt-6 rounded-full bg-royal-600 px-6 py-3 font-extrabold text-white transition hover:bg-navy-950"
        >
          View All Photos
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.05,
      }}
      className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {items.map((item, index) => (
        <GalleryCard
          key={item.id}
          item={item}
          onClick={() => onSelect(index)}
        />
      ))}
    </motion.div>
  );
}

/* --------------------------------------------------
   Gallery Lightbox
-------------------------------------------------- */

export function GalleryLightbox({
  image,
  index,
  total,
  onClose,
  onPrevious,
  onNext,
}) {
  useEffect(() => {
    if (!image) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }

      if (event.key === 'ArrowLeft') {
        onPrevious();
      }

      if (event.key === 'ArrowRight') {
        onNext();
      }
    };

    document.body.style.overflow = 'hidden';

    window.addEventListener(
      'keydown',
      handleKeyDown,
    );

    return () => {
      document.body.style.overflow = '';

      window.removeEventListener(
        'keydown',
        handleKeyDown,
      );
    };
  }, [
    image,
    onClose,
    onPrevious,
    onNext,
  ]);

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="gallery-lightbox-title"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          onClick={onClose}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-navy-950/95 p-4 backdrop-blur-lg"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close gallery image"
            className="absolute right-4 top-4 z-20 grid size-12 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white hover:text-navy-950 sm:right-7 sm:top-7"
          >
            <X
              size={24}
              aria-hidden="true"
            />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onPrevious();
            }}
            aria-label="View previous image"
            className="absolute left-3 top-1/2 z-20 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white hover:text-navy-950 sm:left-7 sm:size-13"
          >
            <ChevronLeft
              size={25}
              aria-hidden="true"
            />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onNext();
            }}
            aria-label="View next image"
            className="absolute right-3 top-1/2 z-20 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white hover:text-navy-950 sm:right-7 sm:size-13"
          >
            <ChevronRight
              size={25}
              aria-hidden="true"
            />
          </button>

          <motion.article
            initial={{
              opacity: 0,
              scale: 0.94,
              y: 24,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.94,
              y: 24,
            }}
            transition={{
              duration: 0.25,
            }}
            onClick={(event) =>
              event.stopPropagation()
            }
            className="grid max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-[2rem] bg-white shadow-2xl lg:grid-cols-[1.35fr_0.65fr]"
          >
            <div className="flex min-h-[350px] items-center justify-center bg-black lg:min-h-[650px]">
              <img
                src={image.image}
                alt={image.altText}
                className="max-h-[75vh] w-full object-contain"
              />
            </div>

            <div className="flex flex-col justify-center p-7 sm:p-9">
              <span className="inline-flex w-fit rounded-full bg-blue-50 px-4 py-2 text-xs font-extrabold text-royal-600">
                {image.category}
              </span>

              <h2
                id="gallery-lightbox-title"
                className="mt-5 font-display text-3xl font-extrabold text-navy-950"
              >
                {image.title}
              </h2>

              <p className="mt-5 leading-8 text-slate-600">
                {image.description}
              </p>

              <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-5">
                <span className="text-sm font-bold text-slate-500">
                  Image {index + 1} of {total}
                </span>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={onPrevious}
                    aria-label="Previous image"
                    className="grid size-10 place-items-center rounded-full border border-slate-200 text-navy-950 transition hover:bg-navy-950 hover:text-white"
                  >
                    <ChevronLeft
                      size={19}
                      aria-hidden="true"
                    />
                  </button>

                  <button
                    type="button"
                    onClick={onNext}
                    aria-label="Next image"
                    className="grid size-10 place-items-center rounded-full border border-slate-200 text-navy-950 transition hover:bg-navy-950 hover:text-white"
                  >
                    <ChevronRight
                      size={19}
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* --------------------------------------------------
   Featured Moments
-------------------------------------------------- */

export function FeaturedMoments({
  items,
  onSelect,
}) {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="section-shell">
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-royal-600">
            Special memories
          </p>

          <h2 className="mt-3 font-display text-3xl font-extrabold text-navy-950 sm:text-4xl lg:text-5xl">
            Featured School Moments
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Important moments that represent student achievement,
            creativity, participation and school community life.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.08,
          }}
          className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((item, index) => (
            <motion.button
              key={item.id}
              variants={reveal}
              type="button"
              onClick={() => onSelect(index)}
              className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.altText}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent" />

                <span className="absolute left-5 top-5 grid size-11 place-items-center rounded-2xl bg-gold-400 text-navy-950">
                  <Sparkles
                    size={21}
                    aria-hidden="true"
                  />
                </span>
              </div>

              <div className="p-6">
                <p className="text-xs font-extrabold uppercase tracking-wider text-royal-600">
                  {item.category}
                </p>

                <h3 className="mt-3 font-display text-2xl font-bold text-navy-950">
                  {item.title}
                </h3>

                <p className="mt-3 line-clamp-2 leading-7 text-slate-600">
                  {item.description}
                </p>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------------------------------
   Video Gallery
-------------------------------------------------- */

export function VideoGallery({
  videos,
  onSelect,
}) {
  return (
    <section className="bg-slate-50 py-20 sm:py-24">
      <div className="section-shell">
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-royal-600">
            Watch our activities
          </p>

          <h2 className="mt-3 font-display text-3xl font-extrabold text-navy-950 sm:text-4xl lg:text-5xl">
            Video Gallery
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Watch highlights from school events, educational
            activities, exhibitions and student performances.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.1,
          }}
          className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {videos.map((video) => (
            <motion.article
              key={video.id}
              variants={reveal}
              className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <button
                type="button"
                onClick={() => onSelect(video)}
                aria-label={`Play ${video.title}`}
                className="relative block aspect-video w-full overflow-hidden"
              >
                <img
                  src={video.thumbnail}
                  alt={`${video.title} video thumbnail`}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-navy-950/45 transition group-hover:bg-navy-950/60" />

                <span className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gold-400 text-navy-950 shadow-xl transition group-hover:scale-110">
                  <Play
                    size={27}
                    fill="currentColor"
                    aria-hidden="true"
                  />
                </span>
              </button>

              <div className="p-6">
                <h3 className="font-display text-2xl font-bold text-navy-950">
                  {video.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {video.description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------------------------------
   Video Modal
-------------------------------------------------- */

export function VideoModal({
  video,
  onClose,
}) {
  useEffect(() => {
    if (!video) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';

    window.addEventListener(
      'keydown',
      handleKeyDown,
    );

    return () => {
      document.body.style.overflow = '';

      window.removeEventListener(
        'keydown',
        handleKeyDown,
      );
    };
  }, [video, onClose]);

  const isPlaceholder =
    video?.videoUrl?.includes('VIDEO_ID');

  return (
    <AnimatePresence>
      {video && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-modal-title"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          onClick={onClose}
          className="fixed inset-0 z-[130] flex items-center justify-center bg-navy-950/95 p-4 backdrop-blur-lg"
        >
          <motion.article
            initial={{
              opacity: 0,
              scale: 0.94,
              y: 25,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.94,
              y: 25,
            }}
            onClick={(event) =>
              event.stopPropagation()
            }
            className="w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-royal-600">
                  School Video
                </p>

                <h2
                  id="video-modal-title"
                  className="mt-1 font-display text-xl font-bold text-navy-950"
                >
                  {video.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close video"
                className="grid size-10 place-items-center rounded-full border border-slate-200 text-navy-950 transition hover:bg-slate-100"
              >
                <X
                  size={21}
                  aria-hidden="true"
                />
              </button>
            </div>

            <div className="aspect-video bg-black">
              {isPlaceholder ? (
                <div className="flex h-full items-center justify-center px-6 text-center text-white">
                  <div>
                    <Camera
                      size={46}
                      className="mx-auto text-gold-400"
                      aria-hidden="true"
                    />

                    <p className="mt-5 text-xl font-bold">
                      Add your school video link
                    </p>

                    <p className="mx-auto mt-2 max-w-lg text-white/70">
                      Replace the placeholder YouTube video ID in
                      galleryData.js with the actual school video ID.
                    </p>
                  </div>
                </div>
              ) : (
                <iframe
                  src={video.videoUrl}
                  title={video.title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>

            <div className="p-6">
              <p className="leading-7 text-slate-600">
                {video.description}
              </p>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}