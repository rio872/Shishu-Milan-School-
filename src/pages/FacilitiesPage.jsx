import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import {
  ArrowRight,
  Bus,
  ChevronLeft,
  ChevronRight,
  CircleCheckBig,
  Droplets,
  Dumbbell,
  FlaskConical,
  HeartPulse,
  Home,
  Laptop,
  Library,
  Monitor,
  Presentation,
  School as SchoolIcon,
  ShieldCheck,
  Sparkles,
  Utensils,
  X,
} from 'lucide-react';

import Footer from '../components/Footer';
import Header from '../components/Header';

import { school } from '../data/schoolData';

import {
  facilityBenefits,
  facilityCards,
  facilityDetails,
  facilityGallery,
} from '../data/facilitiesData';

const reveal = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const iconMap = {
  Bus,
  Droplets,
  Dumbbell,
  FlaskConical,
  HeartPulse,
  Laptop,
  Library,
  Monitor,
  Presentation,
  ShieldCheck,
  Sparkles,
  Utensils,
};

function getIcon(iconName) {
  return iconMap[iconName] || SchoolIcon;
}

function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
  light = false,
}) {
  return (
    <motion.div
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.2,
      }}
      className={
        centered
          ? 'mx-auto max-w-3xl text-center'
          : 'max-w-3xl'
      }
    >
      <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-royal-600">
        {eyebrow}
      </p>

      <h2
        className={`mt-3 font-display text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl ${
          light ? 'text-white' : 'text-navy-950'
        }`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`mt-5 text-base leading-8 sm:text-lg ${
            light ? 'text-white/70' : 'text-slate-600'
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}

function ImageWithFallback({
  src,
  alt,
  className = '',
  imageClassName = 'object-cover',
  eager = false,
}) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (failed) {
    return (
      <div
        className={`grid place-items-center bg-slate-100 text-slate-400 ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="text-center">
          <SchoolIcon
            size={52}
            className="mx-auto"
            aria-hidden="true"
          />

          <p className="mt-3 font-bold">
            Facility image
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-slate-200" />
      )}

      <img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={`h-full w-full transition duration-700 ${imageClassName} ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}

function FacilityCard({ facility }) {
  const Icon = getIcon(facility.icon);

  return (
    <motion.article
      variants={reveal}
      whileHover={{
        y: -7,
      }}
      className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-xl"
    >
      <div className="relative overflow-hidden">
        <ImageWithFallback
          src={facility.image}
          alt={`${facility.title} at ${school.name}`}
          className="h-[240px] w-full"
          imageClassName="object-cover transition duration-700 group-hover:scale-110"
        />

        <span className="absolute bottom-4 left-4 grid size-12 place-items-center rounded-2xl bg-gold-400 text-navy-950 shadow-lg">
          <Icon size={23} aria-hidden="true" />
        </span>
      </div>

      <div className="p-6">
        <h3 className="font-display text-xl font-bold text-navy-950">
          {facility.title}
        </h3>

        <p className="mt-3 leading-7 text-slate-600">
          {facility.description}
        </p>
      </div>
    </motion.article>
  );
}

function FacilityDetail({ detail, index }) {
  const Icon = getIcon(detail.icon);
  const reverse = index % 2 !== 0;

  return (
    <section
      id={detail.id}
      className={`scroll-mt-28 py-20 sm:py-24 ${
        reverse ? 'bg-slate-50' : 'bg-white'
      }`}
    >
      <div
        className={`section-shell grid items-center gap-14 lg:grid-cols-2 ${
          reverse ? 'lg:[&>div:first-child]:order-2' : ''
        }`}
      >
        <motion.div
          initial={{
            opacity: 0,
            x: reverse ? 35 : -35,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.65,
          }}
          className="group"
        >
          <ImageWithFallback
            src={detail.image}
            alt={`${detail.title} at ${school.name}`}
            className="h-[500px] rounded-[2.5rem] shadow-2xl"
            imageClassName="object-cover transition duration-700 group-hover:scale-105"
          />
        </motion.div>

        <div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={stagger}
          >
            <motion.span
              variants={reveal}
              className="grid size-14 place-items-center rounded-2xl bg-gold-400 text-navy-950"
            >
              <Icon size={27} aria-hidden="true" />
            </motion.span>

            <motion.p
              variants={reveal}
              className="mt-7 text-sm font-extrabold uppercase tracking-[0.2em] text-royal-600"
            >
              {detail.eyebrow}
            </motion.p>

            <motion.h2
              variants={reveal}
              className="mt-3 font-display text-3xl font-extrabold text-navy-950 sm:text-4xl lg:text-5xl"
            >
              {detail.title}
            </motion.h2>

            <motion.p
              variants={reveal}
              className="mt-5 leading-8 text-slate-600"
            >
              {detail.description}
            </motion.p>

            <motion.div
              variants={stagger}
              className="mt-8 grid gap-4 sm:grid-cols-2"
            >
              {detail.points.map((point) => (
                <motion.div
                  key={point}
                  variants={reveal}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <CircleCheckBig
                    size={20}
                    className="mt-0.5 shrink-0 text-royal-600"
                    aria-hidden="true"
                  />

                  <p className="font-bold leading-6 text-navy-950">
                    {point}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FacilitiesGallery() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const selectedImage =
    selectedIndex !== null
      ? facilityGallery[selectedIndex]
      : null;

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const showPrevious = () => {
    setSelectedIndex((currentIndex) =>
      currentIndex === 0
        ? facilityGallery.length - 1
        : currentIndex - 1,
    );
  };

  const showNext = () => {
    setSelectedIndex((currentIndex) =>
      currentIndex === facilityGallery.length - 1
        ? 0
        : currentIndex + 1,
    );
  };

  useEffect(() => {
    if (selectedIndex === null) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeLightbox();
      }

      if (event.key === 'ArrowLeft') {
        showPrevious();
      }

      if (event.key === 'ArrowRight') {
        showNext();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIndex]);

  return (
    <>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedImage.title} image preview`}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/95 p-4 backdrop-blur-md"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.92,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.92,
              }}
              transition={{
                duration: 0.25,
              }}
              className="relative w-full max-w-6xl"
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-h-[82vh] w-full rounded-3xl object-contain"
              />

              <div className="mt-4 text-center text-white">
                <h3 className="font-display text-xl font-bold">
                  {selectedImage.title}
                </h3>

                <p className="mt-1 text-sm text-white/60">
                  {selectedIndex + 1} of {facilityGallery.length}
                </p>
              </div>

              <button
                type="button"
                onClick={closeLightbox}
                className="absolute right-3 top-3 grid size-11 place-items-center rounded-full bg-white text-navy-950 shadow-lg transition hover:bg-gold-400"
                aria-label="Close image preview"
              >
                <X size={22} aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={showPrevious}
                className="absolute left-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-navy-950 shadow-lg transition hover:bg-gold-400"
                aria-label="Show previous facility image"
              >
                <ChevronLeft size={26} aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={showNext}
                className="absolute right-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-navy-950 shadow-lg transition hover:bg-gold-400"
                aria-label="Show next facility image"
              >
                <ChevronRight size={26} aria-hidden="true" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function FacilitiesPage() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    const previousTitle = document.title;

    document.title = `Our Facilities | ${school.name}`;

    let description = document.querySelector(
      'meta[name="description"]',
    );

    const createdDescription = !description;
    const previousDescription =
      description?.getAttribute('content');

    if (!description) {
      description = document.createElement('meta');
      description.setAttribute('name', 'description');
      document.head.appendChild(description);
    }

    description.setAttribute(
      'content',
      `Explore the classrooms, laboratories, library, playground, transportation, security and student facilities available at ${school.name}.`,
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

  return (
    <>
      <Header />

      <main>
        {/* Hero */}
        <section className="relative isolate min-h-[600px] overflow-hidden bg-navy-950 text-white">
          <img
            src="/facilities-hero.jpg"
            alt={`Facilities and students at ${school.name}`}
            className="absolute inset-0 -z-30 h-full w-full object-cover object-center"
            onError={(event) => {
              event.currentTarget.style.display = 'none';
            }}
          />

          <div className="absolute inset-0 -z-20 bg-gradient-to-r from-navy-950/95 via-navy-950/82 to-navy-950/35" />

          <div className="section-shell relative z-10 flex min-h-[580px] items-center py-20">
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
                  className="flex items-center gap-2 transition hover:text-gold-400"
                >
                  <Home size={16} aria-hidden="true" />
                  Home
                </a>

                <ChevronRight
                  size={16}
                  aria-hidden="true"
                />

                <span className="text-gold-400">
                  Facilities
                </span>
              </motion.nav>

              <motion.p
                variants={reveal}
                className="mt-9 text-sm font-extrabold uppercase tracking-[0.22em] text-gold-400"
              >
                Safe • Supportive • Student-Friendly
              </motion.p>

              <motion.h1
                variants={reveal}
                className="mt-4 font-display text-5xl font-extrabold leading-tight sm:text-6xl lg:text-7xl"
              >
                Our Facilities
              </motion.h1>

              <motion.p
                variants={reveal}
                className="mt-6 max-w-2xl text-lg leading-8 text-white/80 sm:text-xl"
              >
                Explore the spaces and resources that help our students
                learn safely, confidently, practically and creatively.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Overview */}
        <section className="bg-white py-20 sm:py-24">
          <div className="section-shell grid items-center gap-14 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Our learning environment"
                title="A Safe and Supportive Learning Environment"
                description={`${school.name} provides facilities designed to support academic learning, practical education, creativity, physical development, comfort and student safety.`}
              />

              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                className="mt-7 space-y-5"
              >
                <motion.p
                  variants={reveal}
                  className="leading-8 text-slate-600"
                >
                  Our classrooms and learning spaces are organised to
                  create a welcoming and student-friendly environment.
                  Students have opportunities to learn through reading,
                  technology, experiments, projects, sports and group
                  activities.
                </motion.p>

                <motion.p
                  variants={reveal}
                  className="leading-8 text-slate-600"
                >
                  The school also gives attention to cleanliness,
                  transportation, supervision, drinking water, first aid
                  and security so students can learn with confidence.
                </motion.p>

              </motion.div>
            </div>

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.94,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{
                once: true,
                amount: 0.25,
              }}
              transition={{
                duration: 0.7,
              }}
              className="group"
            >
              <ImageWithFallback
                src="/facilities/facilities-overview.jpg"
                alt={`Safe and supportive facilities at ${school.name}`}
                className="h-[540px] rounded-[2.5rem] shadow-2xl"
                imageClassName="object-cover transition duration-700 group-hover:scale-105"
              />
            </motion.div>
          </div>
        </section>

        {/* Facility cards */}
        <section
          id="all-facilities"
          className="scroll-mt-28 bg-slate-50 py-20 sm:py-24"
        >
          <div className="section-shell">
            <SectionHeading
              eyebrow="school facilities"
              title="Facilities Available at Our School"
              description="Our facilities support classroom learning, practical education, reading, health, security, sports and extracurricular activities."
              centered
            />

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.1,
              }}
              className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {facilityCards.map((facility) => (
                <FacilityCard
                  key={facility.id}
                  facility={facility}
                />
              ))}
            </motion.div>
          </div>
        </section>

        {/* Detailed facilities */}
        {facilityDetails.map((detail, index) => (
          <FacilityDetail
            key={detail.id}
            detail={detail}
            index={index}
          />
        ))}

        {/* Gallery */}
        <FacilitiesGallery />

        {/* Why facilities matter */}
        <section className="bg-navy-950 py-20 text-white sm:py-24">
          <div className="section-shell">
            <SectionHeading
              eyebrow="Supporting every learner"
              title="Why Our Facilities Matter"
              description="Good facilities help students learn effectively, remain safe, explore new ideas and participate confidently in school life."
              centered
              light
            />

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.15,
              }}
              className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {facilityBenefits.map((benefit) => (
                <motion.article
                  key={benefit}
                  variants={reveal}
                  whileHover={{
                    y: -6,
                  }}
                  className="flex items-start gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-gold-400/50 hover:bg-white/10"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-gold-400 text-navy-950">
                    <CircleCheckBig
                      size={21}
                      aria-hidden="true"
                    />
                  </span>

                  <h3 className="font-display text-xl font-bold">
                    {benefit}
                  </h3>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Admission CTA */}
        <section className="relative isolate overflow-hidden bg-royal-600 py-20 text-white">
          <div className="absolute -left-24 -top-24 -z-10 size-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-32 -right-20 -z-10 size-96 rounded-full bg-navy-950/25 blur-3xl" />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.3,
            }}
            className="section-shell text-center"
          >
            <motion.p
              variants={reveal}
              className="text-sm font-extrabold uppercase tracking-[0.2em] text-gold-400"
            >
              Visit our school
            </motion.p>

            <motion.h2
              variants={reveal}
              className="mx-auto mt-4 max-w-4xl font-display text-4xl font-extrabold leading-tight sm:text-5xl"
            >
              Visit Our School and Explore Our Facilities
            </motion.h2>

            <motion.p
              variants={reveal}
              className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/80"
            >
              Meet our team, explore the learning environment and discover
              how our facilities support students throughout their school
              journey.
            </motion.p>

            <motion.div
              variants={reveal}
              className="mt-9 flex flex-col justify-center gap-4 sm:flex-row"
            >
              <a
                href="/#contact"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-gold-400 px-7 font-extrabold text-navy-950 transition hover:-translate-y-1 hover:bg-white"
              >
                Book a School Visit
                <ArrowRight size={18} aria-hidden="true" />
              </a>

              <a
                href="/#contact"
                className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/35 px-7 font-extrabold text-white transition hover:-translate-y-1 hover:bg-white hover:text-navy-950"
              >
                Contact Us
              </a>
            </motion.div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
}