import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  AnimatePresence,
  motion,
} from 'framer-motion';

import {
  ArrowLeft,
  ArrowRight,
  Camera,
  ChevronRight,
  Expand,
  Images,
  Play,
  X,
} from 'lucide-react';

import Footer from '../components/Footer';
import Header from '../components/Header';

import {
  galleryCategories,
  galleryItems,
  galleryVideos,
} from '../data/galleryData';

import { school } from '../data/schoolData';

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

function GalleryHero() {
  return (
    <section className="relative isolate min-h-[570px] overflow-hidden bg-navy-950 text-white">
      <img
        src={
          school.galleryHeroImage ||
          '/gallery/gallery-hero.jpg'
        }
        alt={`Student activities at ${school.name}`}
        className="absolute inset-0 -z-30 h-full w-full object-cover object-center"
        onError={(event) => {
          event.currentTarget.style.display =
            'none';
        }}
      />

      <div className="absolute inset-0 -z-20 bg-gradient-to-r from-navy-950/95 via-navy-950/80 to-navy-950/35" />

      <div className="absolute -bottom-32 -right-20 -z-10 size-96 rounded-full bg-royal-600/25 blur-3xl" />

      <div className="section-shell flex min-h-[570px] items-center py-24">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.nav
            variants={reveal}
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm font-bold text-white/70"
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

          <motion.div
            variants={reveal}
            className="mt-9 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-extrabold backdrop-blur-md"
          >
            <Camera
              size={17}
              className="text-gold-400"
              aria-hidden="true"
            />

            Life at {school.name}
          </motion.div>

          <motion.h1
            variants={reveal}
            className="mt-6 font-display text-5xl font-extrabold leading-tight sm:text-6xl lg:text-7xl"
          >
            School Gallery
          </motion.h1>

          <motion.p
            variants={reveal}
            className="mt-6 max-w-2xl text-lg leading-8 text-white/80 sm:text-xl"
          >
            Explore memorable moments from
            classroom learning, cultural
            celebrations, sports, educational
            tours, student projects and school
            events.
          </motion.p>

          <motion.a
            variants={reveal}
            href="#gallery-photos"
            className="mt-9 inline-flex min-h-[52px] items-center gap-2 rounded-full bg-royal-600 px-7 font-extrabold text-white shadow-lg transition hover:-translate-y-1 hover:bg-white hover:text-navy-950"
          >
            Explore Photos

            <ArrowRight
              size={18}
              aria-hidden="true"
            />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

function GalleryIntroduction() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="section-shell">
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.25,
          }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-royal-600">
            Our school moments
          </p>

          <h2 className="mt-4 font-display text-4xl font-extrabold text-navy-950 sm:text-5xl">
            Moments From Our School
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Every photograph reflects the
            creativity, confidence, teamwork and
            joyful learning of our students. Our
            gallery captures classroom activities,
            celebrations, achievements and the
            vibrant spirit of school life.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedMoments({
  onOpen,
}) {
  const featuredItems =
    galleryItems
      .filter((item) => item.featured)
      .slice(0, 5);

  if (!featuredItems.length) {
    return null;
  }

  const cardClasses = [
  'md:col-span-2',
  'md:col-span-1',
  'md:col-span-1',
  'md:col-span-1',
  'md:col-span-1',
];

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
          className="flex flex-col justify-between gap-5 md:flex-row md:items-end"
        >
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-royal-600">
              Featured memories
            </p>

            <h2 className="mt-3 font-display text-4xl font-extrabold text-navy-950 sm:text-5xl">
              Highlights of School Life
            </h2>
          </div>

          <p className="max-w-xl leading-7 text-slate-600">
            A selection of celebrations,
            achievements and activities that make
            our school community special.
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
          className="mt-12 grid gap-4 md:auto-rows-[260px] md:grid-cols-4"
        >
          {featuredItems.map(
            (item, index) => {
              const originalIndex =
                galleryItems.findIndex(
                  (galleryItem) =>
                    galleryItem.id === item.id,
                );

              return (
                <motion.button
                  key={item.id}
                  type="button"
                  variants={reveal}
                  onClick={() =>
                    onOpen(originalIndex)
                  }
                  className={`group relative min-h-[270px] overflow-hidden rounded-[2rem] text-left shadow-lg md:min-h-0 ${
                    cardClasses[index] || ''
                  }`}
                  aria-label={`View ${item.title}`}
                >
                  <img
                    src={item.image}
                    alt={item.altText}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <span className="inline-flex rounded-full bg-gold-400 px-3 py-1 text-xs font-extrabold text-navy-950">
                      {item.category}
                    </span>

                    <h3 className="mt-3 font-display text-2xl font-bold text-white">
                      {item.title}
                    </h3>
                  </div>

                  <span className="absolute right-5 top-5 grid size-11 place-items-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur-md transition group-hover:opacity-100">
                    <Expand
                      size={19}
                      aria-hidden="true"
                    />
                  </span>
                </motion.button>
              );
            },
          )}
        </motion.div>
      </div>
    </section>
  );
}

function GalleryFilters({
  activeCategory,
  onChange,
}) {
  return (
    <div className="sticky top-20 z-30 border-y border-slate-200 bg-white/95 py-4 shadow-sm backdrop-blur-xl">
      <div className="section-shell overflow-x-auto">
        <div className="flex min-w-max gap-2">
          {galleryCategories.map(
            (category) => {
              const active =
                activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() =>
                    onChange(category)
                  }
                  aria-pressed={active}
                  className={`rounded-full px-5 py-3 text-sm font-extrabold transition ${
                    active
                      ? 'bg-royal-600 text-white shadow-lg shadow-royal-600/20'
                      : 'border border-slate-200 bg-white text-slate-600 hover:border-royal-500 hover:text-royal-600'
                  }`}
                >
                  {category}
                </button>
              );
            },
          )}
        </div>
      </div>
    </div>
  );
}

function GalleryCard({
  item,
  onOpen,
}) {
  return (
    <motion.button
      type="button"
      variants={reveal}
      onClick={onOpen}
      className="group relative aspect-square overflow-hidden rounded-[1.75rem] bg-slate-200 text-left shadow-sm transition-shadow hover:shadow-2xl"
      aria-label={`Open ${item.title}`}
    >
      <img
        src={item.image}
        alt={item.altText}
        loading="lazy"
        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/15 to-transparent opacity-90 transition group-hover:opacity-100" />

      <span className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur-md transition duration-300 group-hover:opacity-100">
        <Expand
          size={19}
          aria-hidden="true"
        />
      </span>

      <div className="absolute inset-x-0 bottom-0 translate-y-2 p-5 transition duration-300 group-hover:translate-y-0">
        <span className="inline-flex rounded-full bg-gold-400 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-navy-950">
          {item.category}
        </span>

        <h3 className="mt-3 font-display text-xl font-bold text-white">
          {item.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/70 opacity-0 transition duration-300 group-hover:opacity-100">
          {item.description}
        </p>
      </div>
    </motion.button>
  );
}

function GalleryGrid({
  items,
  onOpen,
  onClear,
}) {
  if (!items.length) {
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
        className="rounded-[2rem] border border-dashed border-slate-300 bg-white px-6 py-20 text-center"
      >
        <span className="mx-auto grid size-20 place-items-center rounded-full bg-blue-50 text-royal-600">
          <Images
            size={34}
            aria-hidden="true"
          />
        </span>

        <h3 className="mt-6 font-display text-3xl font-bold text-navy-950">
          No Photos Found
        </h3>

        <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-600">
          There are currently no photographs in
          this category. Select another category
          or view all school photographs.
        </p>

        <button
          type="button"
          onClick={onClear}
          className="mt-7 rounded-full bg-royal-600 px-7 py-3 font-extrabold text-white transition hover:bg-navy-950"
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
      animate="visible"
      className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {items.map((item, index) => (
        <GalleryCard
          key={item.id}
          item={item}
          onOpen={() => onOpen(index)}
        />
      ))}
    </motion.div>
  );
}

function GalleryLightbox({
  items,
  selectedIndex,
  onClose,
  onPrevious,
  onNext,
}) {
  const item =
    selectedIndex !== null
      ? items[selectedIndex]
      : null;

  useEffect(() => {
    if (!item) {
      return undefined;
    }

    document.body.style.overflow =
      'hidden';

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

    window.addEventListener(
      'keydown',
      handleKeyDown,
    );

    return () => {
      document.body.style.overflow =
        '';

      window.removeEventListener(
        'keydown',
        handleKeyDown,
      );
    };
  }, [
    item,
    onClose,
    onNext,
    onPrevious,
  ]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
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
          className="fixed inset-0 z-[200] flex items-center justify-center bg-navy-950/95 p-4 backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close image"
            className="absolute right-5 top-5 z-20 grid size-12 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white hover:text-navy-950"
          >
            <X
              size={23}
              aria-hidden="true"
            />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onPrevious();
            }}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 z-20 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white hover:text-navy-950 sm:left-7"
          >
            <ArrowLeft
              size={22}
              aria-hidden="true"
            />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onNext();
            }}
            aria-label="Next image"
            className="absolute right-3 top-1/2 z-20 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white hover:text-navy-950 sm:right-7"
          >
            <ArrowRight
              size={22}
              aria-hidden="true"
            />
          </button>

          <motion.article
            initial={{
              opacity: 0,
              scale: 0.94,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.94,
              y: 20,
            }}
            onClick={(event) =>
              event.stopPropagation()
            }
            className="grid max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-[2rem] bg-white shadow-2xl lg:grid-cols-[1.4fr_0.6fr]"
          >
            <div className="flex min-h-[350px] items-center justify-center bg-black lg:min-h-[650px]">
              <img
                src={item.image}
                alt={item.altText}
                className="max-h-[70vh] w-full object-contain lg:max-h-[650px]"
              />
            </div>

            <div className="flex flex-col justify-center p-7 sm:p-9">
              <span className="text-sm font-extrabold uppercase tracking-[0.18em] text-royal-600">
                {item.category}
              </span>

              <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-navy-950">
                {item.title}
              </h2>

              <p className="mt-5 leading-8 text-slate-600">
                {item.description}
              </p>

              <div className="mt-8 border-t border-slate-200 pt-5">
                <p className="text-sm font-bold text-slate-500">
                  Image {selectedIndex + 1} of{' '}
                  {items.length}
                </p>
              </div>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function VideoGallery() {
  const [selectedVideo, setSelectedVideo] =
    useState(null);

  useEffect(() => {
    if (!selectedVideo) {
      return undefined;
    }

    document.body.style.overflow =
      'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedVideo(null);
      }
    };

    window.addEventListener(
      'keydown',
      handleKeyDown,
    );

    return () => {
      document.body.style.overflow =
        '';

      window.removeEventListener(
        'keydown',
        handleKeyDown,
      );
    };
  }, [selectedVideo]);

  if (!galleryVideos.length) {
    return null;
  }

  return (
    <section className="bg-navy-950 py-20 text-white sm:py-24">
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
          <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-gold-400">
            Watch our activities
          </p>

          <h2 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">
            School Video Gallery
          </h2>

          <p className="mt-5 text-lg leading-8 text-white/65">
            Watch highlights from school events,
            sports programs, cultural activities
            and student exhibitions.
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
          className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {galleryVideos.map((video) => (
            <motion.article
              key={video.id}
             
              className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 text-left transition hover:-translate-y-2 hover:bg-white/10"
            >
              <div className="aspect-video overflow-hidden bg-navy-950">
  <video
    src={video.videoUrl}
    poster={video.thumbnail}
    controls
    preload="metadata"
    playsInline
    className="h-full w-full object-cover"
    aria-label={video.title}
  >
    Your browser does not support the video element.
  </video>
</div>

              <div className="p-6">
                <h3 className="font-display text-2xl font-bold">
                  {video.title}
                </h3>

                <p className="mt-3 leading-7 text-white/60">
                  {video.description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={() =>
              setSelectedVideo(null)
            }
            className="fixed inset-0 z-[220] flex items-center justify-center bg-navy-950/95 p-4 backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              onClick={() =>
                setSelectedVideo(null)
              }
              aria-label="Close video"
              className="absolute right-5 top-5 grid size-12 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white hover:text-navy-950"
            >
              <X size={23} />
            </button>

            <motion.div
              initial={{
                scale: 0.94,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.94,
                opacity: 0,
              }}
              onClick={(event) =>
                event.stopPropagation()
              }
              className="w-full max-w-5xl overflow-hidden rounded-[2rem] bg-black shadow-2xl"
            >
              <div className="aspect-video">
                <iframe
                  src={selectedVideo.videoUrl}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function GalleryCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-royal-600 py-20 text-white">
      <div className="absolute -left-24 -top-24 -z-10 size-80 rounded-full bg-white/10 blur-3xl" />

      <div className="absolute -bottom-32 -right-20 -z-10 size-96 rounded-full bg-navy-950/25 blur-3xl" />

      <motion.div
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.3,
        }}
        className="section-shell text-center"
      >
        <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-gold-400">
          Join our school
        </p>

        <h2 className="mx-auto mt-4 max-w-4xl font-display text-4xl font-extrabold leading-tight sm:text-5xl">
          Become Part of Our School Community
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/80">
          Give your child the opportunity to
          learn, participate, create and grow in a
          supportive school environment.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href="/apply"
            className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-gold-400 px-8 font-extrabold text-navy-950 transition hover:-translate-y-1 hover:bg-white"
          >
            Apply for Admission
          </a>

          <a
            href="/contact"
            className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/35 px-8 font-extrabold text-white transition hover:-translate-y-1 hover:bg-white hover:text-navy-950"
          >
            Contact Us
          </a>
        </div>
      </motion.div>
    </section>
  );
}

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] =
    useState('All');

  const [selectedIndex, setSelectedIndex] =
    useState(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') {
      return galleryItems;
    }

    return galleryItems.filter(
      (item) =>
        item.category === activeCategory,
    );
  }, [activeCategory]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    const previousTitle =
      document.title;

    document.title =
      `School Gallery | ${school.name}`;

    let description =
      document.querySelector(
        'meta[name="description"]',
      );

    const createdDescription =
      !description;

    const previousDescription =
      description?.getAttribute(
        'content',
      );

    if (!description) {
      description =
        document.createElement('meta');

      description.setAttribute(
        'name',
        'description',
      );

      document.head.appendChild(
        description,
      );
    }

    description.setAttribute(
      'content',
      `Explore photographs and videos of classroom activities, sports, cultural programs, educational tours and student life at ${school.name}.`,
    );

    return () => {
      document.title = previousTitle;

      if (createdDescription) {
        description.remove();
      } else {
        description.setAttribute(
          'content',
          previousDescription || '',
        );
      }
    };
  }, []);

  const openFeaturedImage = (
    originalIndex,
  ) => {
    const selectedItem =
      galleryItems[originalIndex];

    setActiveCategory('All');

    const newIndex =
      galleryItems.findIndex(
        (item) =>
          item.id === selectedItem.id,
      );

    setSelectedIndex(newIndex);
  };

  const showPrevious = () => {
    setSelectedIndex((current) => {
      if (current === null) {
        return null;
      }

      return (
        current -
        1 +
        filteredItems.length
      ) % filteredItems.length;
    });
  };

  const showNext = () => {
    setSelectedIndex((current) => {
      if (current === null) {
        return null;
      }

      return (
        current + 1
      ) % filteredItems.length;
    });
  };

  const changeCategory = (category) => {
    setActiveCategory(category);
    setSelectedIndex(null);
  };

  return (
    <>
      <Header />

      <main>
        <GalleryHero />

        <GalleryIntroduction />

        <FeaturedMoments
          onOpen={openFeaturedImage}
        />

        <section
          id="gallery-photos"
          className="scroll-mt-28 bg-white"
        >
          <GalleryFilters
            activeCategory={activeCategory}
            onChange={changeCategory}
          />

          <div className="section-shell py-16 sm:py-20">
            <motion.div
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
              }}
              className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
            >
              <div>
                <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-royal-600">
                  Photo collection
                </p>

                <h2 className="mt-2 font-display text-3xl font-extrabold text-navy-950 sm:text-4xl">
                  {activeCategory === 'All'
                    ? 'All School Moments'
                    : activeCategory}
                </h2>
              </div>

              <p className="text-sm font-bold text-slate-500">
                {filteredItems.length}{' '}
                {filteredItems.length === 1
                  ? 'photo'
                  : 'photos'}
              </p>
            </motion.div>

            <GalleryGrid
              items={filteredItems}
              onOpen={setSelectedIndex}
              onClear={() =>
                changeCategory('All')
              }
            />
          </div>
        </section>

        <VideoGallery />

        <GalleryCTA />
      </main>

      <Footer />

      <GalleryLightbox
        items={filteredItems}
        selectedIndex={selectedIndex}
        onClose={() =>
          setSelectedIndex(null)
        }
        onPrevious={showPrevious}
        onNext={showNext}
      />
    </>
  );
}