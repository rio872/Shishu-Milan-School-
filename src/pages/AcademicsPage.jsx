import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useInView,
} from 'framer-motion';

import {
  Activity,
  ArrowRight,
  Award,
  Baby,
  BarChart3,
  BookOpen,
  Bus,
  Calculator,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  CircleCheckBig,
  ClipboardCheck,
  Download,
  Dumbbell,
  FileText,
  FlaskConical,
  FolderKanban,
  Globe2,
  GraduationCap,
  HeartPulse,
  Home,
  Languages,
  Laptop,
  Library,
  Lightbulb,
  Medal,
  MessageSquareText,
  Monitor,
  Music,
  Palette,
  Presentation,
  Scale,
  School as SchoolIcon,
  Shapes,
  Sparkles,
  Target,
  Trophy,
  UserCheck,
  Users,
} from 'lucide-react';

import Header from '../components/Header';
import Footer from '../components/Footer';

import { school } from '../data/schoolData';

import {
  academicDetails,
  academicFaqs,
  academicLevels,
  achievementCards,
  assessmentItems,
  calendarItems,
  extracurricularActivities,
  studentSupportItems,
  subjects,
  teachingMethods,
} from '../data/academicsData';

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
  Activity,
  Award,
  Baby,
  BarChart3,
  BookOpen,
  Bus,
  Calculator,
  CalendarDays,
  ClipboardCheck,
  Dumbbell,
  FileText,
  FlaskConical,
  FolderKanban,
  Globe2,
  GraduationCap,
  HeartPulse,
  Languages,
  Laptop,
  Library,
  Lightbulb,
  Medal,
  MessageSquareText,
  Monitor,
  Music,
  Palette,
  Presentation,
  Scale,
  School: SchoolIcon,
  Shapes,
  Sparkles,
  Target,
  Trophy,
  UserCheck,
  Users,
};

function getIcon(iconName) {
  return iconMap[iconName] || BookOpen;
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
            Academic image
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
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={`h-full w-full transition duration-700 ${imageClassName} ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}

function AnimatedCounter({
  value,
  suffix = '',
}) {
  const counterRef = useRef(null);

  const isVisible = useInView(counterRef, {
    once: true,
    amount: 0.6,
  });

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      return undefined;
    }

    let animationFrame;
    let startingTime;
    const duration = 1200;

    const animateCounter = (time) => {
      if (!startingTime) {
        startingTime = time;
      }

      const progress = Math.min(
        (time - startingTime) / duration,
        1,
      );

      setCount(Math.floor(progress * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(
          animateCounter,
        );
      }
    };

    animationFrame = requestAnimationFrame(
      animateCounter,
    );

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [isVisible, value]);

  return (
    <span ref={counterRef}>
      {count}
      {suffix}
    </span>
  );
}

function AcademicLevelCard({ level }) {
  const Icon = getIcon(level.icon);

  return (
    <motion.article
      variants={reveal}
      whileHover={{
        y: -8,
      }}
      className="group flex h-full flex-col rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition-shadow hover:shadow-xl"
    >
      <span className="grid size-14 place-items-center rounded-2xl bg-blue-50 text-royal-600 transition group-hover:bg-royal-600 group-hover:text-white">
        <Icon size={27} aria-hidden="true" />
      </span>

      <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.18em] text-gold-500">
        {level.grades}
      </p>

      <h3 className="mt-2 font-display text-2xl font-bold text-navy-950">
        {level.title}
      </h3>

      <p className="mt-4 leading-7 text-slate-600">
        {level.description}
      </p>

      <div className="mt-5 space-y-3">
        {level.focus.map((item) => (
          <div
            key={item}
            className="flex items-start gap-2 text-sm font-semibold text-slate-700"
          >
            <CircleCheckBig
              size={17}
              className="mt-0.5 shrink-0 text-royal-600"
              aria-hidden="true"
            />

            <span>{item}</span>
          </div>
        ))}
      </div>

      <a
        href={`#${level.id}`}
        className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-extrabold text-royal-600 transition hover:gap-3 hover:text-navy-950"
      >
        Learn More
        <ArrowRight size={17} aria-hidden="true" />
      </a>
    </motion.article>
  );
}

function AcademicDetail({ detail, index }) {
  const Icon = getIcon(detail.icon);

  return (
    <section
      id={detail.id}
      className={`scroll-mt-28 py-16 sm:py-20 ${
        index % 2 === 0
          ? 'bg-white'
          : 'bg-slate-50'
      }`}
    >
      <div
        className={`section-shell grid items-center gap-12 lg:grid-cols-2 ${
          index % 2 !== 0
            ? 'lg:[&>div:first-child]:order-2'
            : ''
        }`}
      >
        <motion.div
          initial={{
            opacity: 0,
            x: index % 2 === 0 ? -35 : 35,
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
          className="relative overflow-hidden rounded-[2.5rem] bg-navy-950 p-8 text-white shadow-xl sm:p-10"
        >
          <div className="absolute -right-16 -top-16 size-48 rounded-full bg-royal-600/30 blur-3xl" />

          <span className="relative grid size-16 place-items-center rounded-2xl bg-gold-400 text-navy-950">
            <Icon size={31} aria-hidden="true" />
          </span>

          <p className="relative mt-8 text-sm font-extrabold uppercase tracking-[0.2em] text-gold-400">
            {detail.eyebrow}
          </p>

          <h2 className="relative mt-3 font-display text-3xl font-extrabold sm:text-4xl">
            {detail.title}
          </h2>

          <p className="relative mt-5 leading-8 text-white/70">
            {detail.description}
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="grid gap-4 sm:grid-cols-2"
        >
          {detail.items.map((item) => (
            <motion.div
              key={item}
              variants={reveal}
              className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <CircleCheckBig
                size={21}
                className="mt-0.5 shrink-0 text-royal-600"
                aria-hidden="true"
              />

              <p className="font-bold leading-6 text-navy-950">
                {item}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FAQItem({
  faq,
  index,
  openIndex,
  setOpenIndex,
}) {
  const isOpen = openIndex === index;

  return (
    <motion.article
      variants={reveal}
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
    >
      <button
        type="button"
        onClick={() =>
          setOpenIndex(isOpen ? null : index)
        }
        className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-display text-lg font-bold text-navy-950">
          {faq.question}
        </span>

        <ChevronDown
          size={21}
          className={`shrink-0 text-royal-600 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: 'auto',
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
            }}
          >
            <p className="border-t border-slate-100 px-6 py-5 leading-7 text-slate-600">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

const academicStatistics = [
  {
    value: 4,
    suffix: '',
    label: 'Academic Levels',
  },
  {
    value: 9,
    suffix: '',
    label: 'Core Subject Areas',
  },
  {
    value: 8,
    suffix: '',
    label: 'Teaching Methods',
  },
  {
    value: 8,
    suffix: '',
    label: 'Student Support Areas',
  },
];

export default function AcademicsPage() {
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    const previousTitle = document.title;

    document.title = `Academics | ${school.name}`;

    let description = document.querySelector(
      'meta[name="description"]',
    );

    const previousDescription =
      description?.getAttribute('content');

    if (!description) {
      description = document.createElement('meta');
      description.setAttribute('name', 'description');
      document.head.appendChild(description);
    }

    description.setAttribute(
      'content',
      `Explore academic levels, subjects, teaching methods, assessment, student support and learning resources at ${school.name}.`,
    );

    return () => {
      document.title = previousTitle;

      if (previousDescription) {
        description.setAttribute(
          'content',
          previousDescription,
        );
      }
    };
  }, []);

  return (
    <>
      <Header />

      <main>
        {/* Academics hero */}
        <section className="relative isolate min-h-[610px] overflow-hidden bg-navy-950 text-white">
          <img
            src={
              school.academicsHeroImage ||
              '/academics-hero.jpg'
            }
            alt={`${school.name} students participating in academic learning`}
            className="absolute inset-0 -z-30 h-[690px] w-full object-cover object-center"
          />

          <div className="absolute inset-0 -z-20 bg-gradient-to-r from-navy-950/95 via-navy-950/80 to-navy-950/35" />

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
                  Academics
                </span>
              </motion.nav>

              <motion.p
                variants={reveal}
                className="mt-9 text-sm font-extrabold uppercase tracking-[0.22em] text-gold-400"
              >
                Knowledge • Skills • Character
              </motion.p>

              <motion.h1
                variants={reveal}
                className="mt-4 font-display text-5xl font-extrabold leading-tight sm:text-6xl lg:text-7xl"
              >
                Academics
              </motion.h1>

              <motion.p
                variants={reveal}
                className="mt-6 max-w-2xl text-lg leading-8 text-white/80 sm:text-xl"
              >
                Quality education that develops academic
                knowledge, practical skills, discipline,
                creativity, communication and confidence.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Academic overview */}
        <section className="bg-white py-20 sm:py-24">
          <div className="section-shell grid items-center gap-14 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Meaningful learning"
                title="Our Academic Approach"
                description={`${school.name} provides a balanced learning experience that combines academic knowledge with practical activities, discipline, creativity, confidence, communication and overall student development.`}
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
                  Our teachers create active classrooms where
                  students are encouraged to ask questions,
                  solve problems, communicate clearly and
                  participate responsibly.
                </motion.p>

                <motion.p
                  variants={reveal}
                  className="leading-8 text-slate-600"
                >
                  Lessons are supported by projects, group
                  activities, practical learning, regular
                  assessment and individual guidance.
                </motion.p>

                <motion.a
                  variants={reveal}
                  href="#academic-levels"
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-royal-600 px-7 font-extrabold text-white shadow-lg shadow-royal-600/20 transition hover:-translate-y-1 hover:bg-navy-950"
                >
                  Explore Our Programs
                  <ArrowRight
                    size={18}
                    aria-hidden="true"
                  />
                </motion.a>
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
              className="group relative"
            >
              <ImageWithFallback
                src={
                  school.academicOverviewImage ||
                  '/academic-overview.jpg'
                }
                alt={`Students learning at ${school.name}`}
                className="h-[540px] rounded-[2.5rem] shadow-2xl"
                imageClassName="object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute bottom-6 left-6 right-6 rounded-3xl bg-navy-950/90 p-6 text-white backdrop-blur">
                <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-gold-400">
                  Education is Light
                </p>

                <p className="mt-2 font-display text-xl font-bold">
                  Building knowledge, confidence and strong
                  character.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Academic levels */}
        <section
          id="academic-levels"
          className="scroll-mt-28 bg-slate-50 py-20 sm:py-24"
        >
          <div className="section-shell">
            <SectionHeading
              eyebrow="Programs"
              title="Academic Levels"
              description="Our academic programs support every stage of student development from early childhood to Grade 10."
              centered
            />

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.15,
              }}
              className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4"
            >
              {academicLevels.map((level) => (
                <AcademicLevelCard
                  key={level.id}
                  level={level}
                />
              ))}
            </motion.div>
          </div>
        </section>

        {/* Academic statistics */}
        <section className="bg-navy-950 py-14 text-white">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            className="section-shell grid grid-cols-2 gap-8 lg:grid-cols-4"
          >
            {academicStatistics.map((stat) => (
              <motion.div
                key={stat.label}
                variants={reveal}
                className="text-center"
              >
                <p className="font-display text-4xl font-extrabold text-gold-400 sm:text-5xl">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                  />
                </p>

                <p className="mt-3 text-sm font-bold text-white/65 sm:text-base">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Detailed academic levels */}
        {academicDetails.map((detail, index) => (
          <AcademicDetail
            key={detail.id}
            detail={detail}
            index={index}
          />
        ))}

        {/* Subjects */}
        <section
          id="subjects"
          className="scroll-mt-28 bg-slate-50 py-20 sm:py-24"
        >
          <div className="section-shell">
            <SectionHeading
              eyebrow="Curriculum"
              title="Subjects Offered"
              description="Students learn through a balanced combination of language, mathematics, science, technology, social understanding, creativity and physical development."
              centered
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
              {subjects.map((subject) => {
                const Icon = getIcon(subject.icon);

                return (
                  <motion.article
                    key={subject.name}
                    variants={reveal}
                    whileHover={{
                      y: -6,
                    }}
                    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-xl"
                  >
                    <span className="grid size-12 place-items-center rounded-2xl bg-blue-50 text-royal-600">
                      <Icon size={24} aria-hidden="true" />
                    </span>

                    <h3 className="mt-5 font-display text-xl font-bold text-navy-950">
                      {subject.name}
                    </h3>

                    <p className="mt-3 leading-7 text-slate-600">
                      {subject.description}
                    </p>
                  </motion.article>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Teaching methodology */}
        <section className="bg-white py-20 sm:py-24">
          <div className="section-shell">
            <SectionHeading
              eyebrow="How students learn"
              title="Teaching Methodology"
              description="Our teaching methods encourage participation, practical understanding, communication, creativity and regular academic improvement."
              centered
            />

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.15,
              }}
              className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            >
              {teachingMethods.map((method) => {
                const Icon = getIcon(method.icon);

                return (
                  <motion.article
                    key={method.title}
                    variants={reveal}
                    whileHover={{
                      y: -6,
                    }}
                    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-xl"
                  >
                    <span className="grid size-12 place-items-center rounded-2xl bg-gold-400 text-navy-950">
                      <Icon size={23} aria-hidden="true" />
                    </span>

                    <h3 className="mt-5 font-display text-xl font-bold text-navy-950">
                      {method.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {method.description}
                    </p>
                  </motion.article>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Assessment */}
        <section className="bg-navy-950 py-20 text-white sm:py-24">
          <div className="section-shell grid items-center gap-14 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Monitoring progress"
                title="Assessment and Evaluation"
                description="Assessment helps teachers understand student progress, recognise strengths, identify learning needs and provide appropriate academic support."
                light
              />

              <motion.p
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
                  amount: 0.25,
                }}
                className="mt-6 leading-8 text-white/70"
              >
                Evaluation is continuous and considers not
                only examination performance but also effort,
                practical work, assignments, attendance and
                classroom involvement.
              </motion.p>
            </div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.15,
              }}
              className="grid gap-4 sm:grid-cols-2"
            >
              {assessmentItems.map((item) => (
                <motion.div
                  key={item}
                  variants={reveal}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
                >
                  <ClipboardCheck
                    size={21}
                    className="shrink-0 text-gold-400"
                    aria-hidden="true"
                  />

                  <p className="font-bold">
                    {item}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Academic calendar */}
        <section className="bg-slate-50 py-20 sm:py-24">
          <div className="section-shell">
            <SectionHeading
              eyebrow="Important dates"
              title="Academic Calendar"
              description="The academic calendar helps students and parents prepare for examinations, meetings, holidays, results and major learning events."
              centered
            />

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.15,
              }}
              className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
            >
              {calendarItems.map((item) => (
                <motion.article
                  key={item.title}
                  variants={reveal}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <CalendarDays
                    size={25}
                    className="text-royal-600"
                    aria-hidden="true"
                  />

                  <h3 className="mt-5 font-display text-xl font-bold text-navy-950">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm font-bold text-royal-600">
                    {item.period}
                  </p>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>
                </motion.article>
              ))}
            </motion.div>

            <div className="mt-10 text-center">
              <a
                href={
                  school.academicCalendarFile ||
                  '/academic-calendar.pdf'
                }
                download
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-royal-600 px-7 font-extrabold text-white transition hover:-translate-y-1 hover:bg-navy-950"
              >
                <Download size={18} aria-hidden="true" />
                Download Academic Calendar
              </a>
            </div>
          </div>
        </section>

    

        {/* Extracurricular */}
        <section className="bg-white py-20 sm:py-24">
          <div className="section-shell">
            <SectionHeading
              eyebrow="Learning beyond textbooks"
              title="Extracurricular Learning"
              description="Activities beyond the classroom help students build creativity, confidence, teamwork, leadership and healthy habits."
              centered
            />

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.15,
              }}
              className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
            >
              {extracurricularActivities.map(
                (activityItem) => {
                  const Icon = getIcon(
                    activityItem.icon,
                  );

                  return (
                    <motion.article
                      key={activityItem.title}
                      variants={reveal}
                      whileHover={{
                        y: -6,
                      }}
                      className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-xl"
                    >
                      <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-gold-400 text-navy-950">
                        <Icon
                          size={23}
                          aria-hidden="true"
                        />
                      </span>

                      <h3 className="mt-4 font-display font-bold text-navy-950">
                        {activityItem.title}
                      </h3>
                    </motion.article>
                  );
                },
              )}
            </motion.div>
          </div>
        </section>

        {/* Achievements */}
        <section className="bg-navy-950 py-20 text-white sm:py-24">
          <div className="section-shell">
            <SectionHeading
              eyebrow="Celebrating progress"
              title="Academic Achievements"
              description="We recognise student progress, effort, creativity, participation and success across academic and extracurricular learning."
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
              className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5"
            >
              {achievementCards.map((achievement) => {
                const Icon = getIcon(
                  achievement.icon,
                );

                return (
                  <motion.article
                    key={achievement.title}
                    variants={reveal}
                    whileHover={{
                      y: -7,
                    }}
                    className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-gold-400/50 hover:bg-white/10"
                  >
                    <span className="grid size-12 place-items-center rounded-2xl bg-gold-400 text-navy-950">
                      <Icon size={23} aria-hidden="true" />
                    </span>

                    <h3 className="mt-5 font-display text-xl font-bold">
                      {achievement.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-white/65">
                      {achievement.description}
                    </p>
                  </motion.article>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-slate-50 py-20 sm:py-24">
          <div className="section-shell">
            <SectionHeading
              eyebrow="Questions and answers"
              title="Frequently Asked Questions"
              description="Find answers to common questions about academic levels, subjects, assessment, practical learning and student support."
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
              className="mx-auto mt-12 grid max-w-4xl gap-4"
            >
              {academicFaqs.map((faq, index) => (
                <FAQItem
                  key={faq.question}
                  faq={faq}
                  index={index}
                  openIndex={openFaq}
                  setOpenIndex={setOpenFaq}
                />
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
              Admissions
            </motion.p>

            <motion.h2
              variants={reveal}
              className="mx-auto mt-4 max-w-4xl font-display text-4xl font-extrabold leading-tight sm:text-5xl"
            >
              Start Your Child’s Learning Journey With Us
            </motion.h2>

            <motion.p
              variants={reveal}
              className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/80"
            >
              Join a caring school community focused on
              academic knowledge, confidence, discipline,
              creativity and responsible development.
            </motion.p>

            <motion.div
              variants={reveal}
              className="mt-9 flex flex-col justify-center gap-4 sm:flex-row"
            >
              <a
                href="/apply"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-gold-400 px-7 font-extrabold text-navy-950 transition hover:-translate-y-1 hover:bg-white"
              >
                Apply for Admission
                <ArrowRight size={18} aria-hidden="true" />
              </a>

              <a
                href="/#contact"
                className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/35 px-7 font-extrabold text-white transition hover:-translate-y-1 hover:bg-white hover:text-navy-950"
              >
                Contact the School
              </a>
            </motion.div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
}