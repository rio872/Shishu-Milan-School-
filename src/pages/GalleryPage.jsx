import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { motion } from 'framer-motion';

import {
  ArrowRight,
  Phone,
} from 'lucide-react';

import Footer from '../components/Footer';
import Header from '../components/Header';

import {
  FeaturedMoments,
  GalleryFilters,
  GalleryGrid,
  GalleryHero,
  GalleryLightbox,
  VideoGallery,
  VideoModal,
} from '../components/gallery/GalleryComponents';

import {
  galleryCategories,
  galleryItems,
  galleryVideos,
} from '../data/galleryData';

import { school } from '../data/schoolData';

export default function GalleryPage() {
  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState('All');

  const [loading, setLoading] =
    useState(true);

  const [
    lightboxItems,
    setLightboxItems,
  ] = useState([]);

  const [
    lightboxIndex,
    setLightboxIndex,
  ] = useState(-1);

  const [
    selectedVideo,
    setSelectedVideo,
  ] = useState(null);

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'All') {
      return galleryItems;
    }

    return galleryItems.filter(
      (item) =>
        item.category === selectedCategory,
    );
  }, [selectedCategory]);

  const featuredItems = useMemo(() => {
    return galleryItems
      .filter((item) => item.featured)
      .slice(0, 6);
  }, []);

  const currentImage =
    lightboxIndex >= 0
      ? lightboxItems[lightboxIndex]
      : null;

  const openLightbox = (
    items,
    index,
  ) => {
    setLightboxItems(items);
    setLightboxIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(-1);
    setLightboxItems([]);
  }, []);

  const showPrevious = useCallback(() => {
    setLightboxIndex((currentIndex) => {
      if (lightboxItems.length === 0) {
        return -1;
      }

      return currentIndex === 0
        ? lightboxItems.length - 1
        : currentIndex - 1;
    });
  }, [lightboxItems]);

  const showNext = useCallback(() => {
    setLightboxIndex((currentIndex) => {
      if (lightboxItems.length === 0) {
        return -1;
      }

      return currentIndex ===
        lightboxItems.length - 1
        ? 0
        : currentIndex + 1;
    });
  }, [lightboxItems]);

  const changeCategory = (category) => {
    setSelectedCategory(category);
    closeLightbox();
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoading(false);
    }, 450);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    const previousTitle = document.title;

    document.title =
      `School Gallery | ${school.name}`;

    let description = document.querySelector(
      'meta[name="description"]',
    );

    const createdDescription = !description;

    const previousDescription =
      description?.getAttribute('content');

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
      `Explore classroom activities, sports, cultural programs, science exhibitions, educational tours and student achievements at ${school.name}.`,
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

  const phoneNumber = String(
    school.phone || '',
  ).replace(/[^\d+]/g, '');

  return (
    <>
      <Header />

      <main>
        <GalleryHero
          image={
            school.galleryHeroImage ||
            '/gallery/gallery-hero.jpg'
          }
        />

        <section className="bg-white py-20 sm:py-24">
          <div className="section-shell">
            <motion.div
              initial={{
                opacity: 0,
                y: 28,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.25,
              }}
              className="mx-auto max-w-4xl text-center"
            >
              <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-royal-600">
                Student life and learning
              </p>

              <h2 className="mt-3 font-display text-4xl font-extrabold text-navy-950 sm:text-5xl">
                Moments From Our School
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-600">
                Our gallery captures classroom activities,
                practical learning, celebrations, achievements,
                student projects, cultural programs, sports and
                memorable moments shared by our school community.
              </p>
            </motion.div>

            <div className="mt-12">
              <GalleryFilters
                categories={galleryCategories}
                selectedCategory={
                  selectedCategory
                }
                onChange={changeCategory}
              />
            </div>

            <div className="mt-12">
              <GalleryGrid
                items={filteredItems}
                loading={loading}
                onSelect={(index) =>
                  openLightbox(
                    filteredItems,
                    index,
                  )
                }
                onViewAll={() =>
                  setSelectedCategory('All')
                }
              />
            </div>
          </div>
        </section>

        <FeaturedMoments
          items={featuredItems}
          onSelect={(index) =>
            openLightbox(
              featuredItems,
              index,
            )
          }
        />

        <VideoGallery
          videos={galleryVideos}
          onSelect={setSelectedVideo}
        />

        <section className="relative isolate overflow-hidden bg-royal-600 py-20 text-white">
          <div className="absolute -left-20 -top-24 -z-10 size-80 rounded-full bg-white/10 blur-3xl" />

          <div className="absolute -bottom-32 -right-20 -z-10 size-96 rounded-full bg-navy-950/25 blur-3xl" />

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
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
              Give your child an opportunity to learn, grow,
              participate and create lasting memories in a
              supportive school environment.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="/apply"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-gold-400 px-7 font-extrabold text-navy-950 transition hover:-translate-y-1 hover:bg-white"
              >
                Apply for Admission

                <ArrowRight
                  size={18}
                  aria-hidden="true"
                />
              </a>

              <a
                href="/#contact"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-white/35 px-7 font-extrabold text-white transition hover:-translate-y-1 hover:bg-white hover:text-navy-950"
              >
                <Phone
                  size={18}
                  aria-hidden="true"
                />

                Contact Us
              </a>

              {phoneNumber && (
                <a
                  href={`tel:${phoneNumber}`}
                  className="sr-only"
                >
                  Call {school.name}
                </a>
              )}
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />

      <GalleryLightbox
        image={currentImage}
        index={lightboxIndex}
        total={lightboxItems.length}
        onClose={closeLightbox}
        onPrevious={showPrevious}
        onNext={showNext}
      />

      <VideoModal
        video={selectedVideo}
        onClose={() =>
          setSelectedVideo(null)
        }
      />
    </>
  );
}