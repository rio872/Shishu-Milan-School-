import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  Award,
  BookOpen,
  Bus,
  CheckCircle2,
  ChevronRight,
  Computer,
  Eye,
  FlaskConical,
  GraduationCap,
  HeartHandshake,
  Home,
  Library,
  Lightbulb,
  MapPin,
  Medal,
  Monitor,
  Palette,
  Quote,
  School as SchoolIcon,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  Users,
  Utensils,
} from 'lucide-react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { school } from '../data/schoolData';

/* --------------------------------------------------
   Animations
-------------------------------------------------- */

const reveal = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: 'easeOut',
    },
  },
};

const containerAnimation = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

/* --------------------------------------------------
   Image With Fallback
-------------------------------------------------- */

function ImageWithFallback({
  src,
  alt,
  className = '',
  imageClassName = 'object-cover',
  imageStyle = {},
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
            size={50}
            className="mx-auto"
            aria-hidden="true"
          />

          <p className="mt-3 text-sm font-bold">
            School image
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
        style={imageStyle}
        className={`h-full w-full transition duration-700 ${imageClassName} ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}

/* --------------------------------------------------
   Section Heading
-------------------------------------------------- */

function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
}) {
  return (
    <motion.div
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.25,
      }}
      className={
        centered
          ? 'mx-auto max-w-3xl text-center'
          : 'max-w-3xl'
      }
    >
      <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-royal-600">
        {eyebrow}
      </p>

      <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-navy-950 sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
          {description}
        </p>
      )}
    </motion.div>
  );
}

/* --------------------------------------------------
   Animated Counter
-------------------------------------------------- */

function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
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
    let startTime;

    const duration = 1300;

    const animate = (time) => {
      if (!startTime) {
        startTime = time;
      }

      const progress = Math.min(
        (time - startTime) / duration,
        1,
      );

      const nextValue = Math.floor(
        progress * value,
      );

      setCount(nextValue);

      if (progress < 1) {
        animationFrame =
          requestAnimationFrame(animate);
      }
    };

    animationFrame =
      requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [isVisible, value]);

  return (
    <span ref={counterRef}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

/* --------------------------------------------------
   Timeline
-------------------------------------------------- */

const timelineItems = [
  {
    year: '2049 B.S.',
    title: 'The School Was Established',
    description:
      'Shishu Milan English School began its educational journey in 2049 B.S. with a clear commitment to provide accessible and quality education to children in the local community.',
  },
  {
    year: 'Early Growth',
    title: 'Building a Strong Foundation',
    description:
      'The school gradually expanded its classes, teaching team and learning activities while maintaining a caring and disciplined educational environment.',
  },
  {
    year: 'Continued Progress',
    title: 'Improving Learning Opportunities',
    description:
      'New teaching approaches, practical activities, computer education, sports and co-curricular programs were introduced to support balanced student development.',
  },
  {
    year: 'Today',
    title: 'A Trusted Learning Community',
    description:
      'Today, the school continues to serve students and families through committed teachers, responsible leadership and a strong focus on academic and personal growth.',
  },
];

/* --------------------------------------------------
   Mission Cards
-------------------------------------------------- */

const missionCards = [
  {
    title: 'Our Mission',
    description:
      'To provide meaningful, affordable and quality education that develops knowledgeable, disciplined, creative and responsible learners.',
    icon: Target,
  },
  {
    title: 'Our Vision',
    description:
      'To become a trusted learning community where every student is encouraged to discover their potential and prepare for a successful future.',
    icon: Eye,
  },
  {
    title: 'Our Objectives',
    description:
      'To strengthen academic knowledge, practical skills, moral values, confidence, communication, teamwork and lifelong learning habits.',
    icon: Lightbulb,
  },
];

/* --------------------------------------------------
   Core Values
-------------------------------------------------- */

const coreValues = [
  {
    title: 'Discipline',
    icon: ShieldCheck,
  },
  {
    title: 'Integrity',
    icon: Medal,
  },
  {
    title: 'Respect',
    icon: HeartHandshake,
  },
  {
    title: 'Responsibility',
    icon: CheckCircle2,
  },
  {
    title: 'Creativity',
    icon: Palette,
  },
  {
    title: 'Excellence',
    icon: Award,
  },
  {
    title: 'Teamwork',
    icon: Users,
  },
  {
    title: 'Lifelong Learning',
    icon: BookOpen,
  },
];

/* --------------------------------------------------
   Why Choose
-------------------------------------------------- */

const reasons = [
  'Experienced and qualified teachers',
  'Safe, caring and student-friendly environment',
  'Modern and practical teaching methods',
  'Affordable quality education',
  'Activity-based and participatory learning',
  'Sports and extracurricular opportunities',
  'Strong communication with parents',
  'Focus on discipline and moral values',
];

/* --------------------------------------------------
   Achievements
-------------------------------------------------- */

const achievementCards = [
  {
    title: 'Academic Development',
    description:
      'Students receive structured academic support, regular assessment and guidance for continuous improvement.',
    icon: GraduationCap,
  },
  {
    title: 'Sports Participation',
    description:
      'Students are encouraged to participate in physical activities, games and school-level sports programs.',
    icon: Trophy,
  },
  {
    title: 'Cultural Activities',
    description:
      'School events provide opportunities for students to develop creativity, confidence and stage performance skills.',
    icon: Palette,
  },
  {
    title: 'Student Growth',
    description:
      'Learners are supported in building communication, leadership, responsibility and problem-solving abilities.',
    icon: Sparkles,
  },
  {
    title: 'Community Connection',
    description:
      'The school maintains close relationships with families and contributes positively to the local community.',
    icon: HeartHandshake,
  },
];

/* --------------------------------------------------
   Leadership / Staff
-------------------------------------------------- */

const leadershipMembers = [
  {
    name:
      school.chairpersonName ||
      'RADHE SHYAM SHRESTHA',
    position: 'Chairperson',
    image: '/chairperson.png',
  },
  {
    name: 'PARBATI SHRESTHA',
    position: 'Principal',
    image: '/principal.jpg',
  },
  {
    name: 'ROSY SHRESTHA',
    position: 'Vice Principal',
    image: '/vice-principal.jpg',
  },
  {
    name: 'BUDDHA GOLAY',
    position: 'Coordinator',
    image: '/coordinator.jpg',
  },
  {
    name: 'Romi Shrestha',
    position: 'Account Head',
    image: '/account-head.jpg',
  },

  /* Add your remaining teachers here */

  {
    name: 'Ranjana Dhahal',
    position: 'Nepali Teacher',
    image: '/staff/nepali.jpg',
  },
  {
    name: 'Manish Baral',
    position: 'Computer Teacher',
    image: '/staff/computer.jpg',
  },
  {
    name: 'Madan',
    position: 'Science Teacher',
    image: '/staff/science.jpg',
  },
  {
    name: 'Ritesh Kuikel',
    position: 'Health Teacher',
    image: '/staff/health.jpg',
  },
  
  {
    name: 'Namrata Shiwakoti',
    position: 'Secondary Teacher',
    image: '/staff/staff-5.jpg',
  },
  
  {
    name: 'Sunita Thami',
    position: 'Mathematics Teacher',
    image: '/staff/staff-7.jpg',
  },
   {
    name: 'Gautam Magar',
    position: 'English Teacher',
    image: '/staff/staff-6.jpg',
  },
  {
    name: 'Sajani Shrestha',
    position: 'Science Teacher',
    image: '/staff/staff-8.jpg',
  },
  {
    name: 'Srijana Shrestha',
    position: 'Computer Teacher',
    image: '/staff/staff-9.jpg',
  },
  {
    name: 'Kumari Tamang',
    position: 'Administrative Staff',
    image: '/staff/staff-10.jpg',
  },
  {
    name: 'Puja Sharma Akangme',
    position: 'Administrative Staff',
    image: '/staff/staff-11.jpg',
  },
  {
    name: 'Phoolmaya Shrestha',
    position: 'Administrative Staff',
    image: '/staff/staff-12.jpg',
  },
  {
    name: 'Binita Basnet',
    position: 'Administrative Staff',
    image: '/staff/staff-13.jpg',
  },
  {
    name: 'Hema Gubhaju',
    position: 'Administrative Staff',
    image: '/staff/staff-14.jpg',
  },
  {
    name: 'Mira Shrestha',
    position: 'Administrative Staff',
    image: '/staff/staff-15.jpg',
  },
  {
    name: 'Kamala Tamang',
    position: 'Administrative Staff',
    image: '/staff/staff-16.jpg',
  },
  {
    name: 'Chanda Dhakal Shrestha',
    position: 'Administrative Staff',
    image: '/staff/staff-17.jpg',
  },
  {
    name: 'Goma Shrestha',
    position: 'Administrative Staff',
    image: '/staff/staff-18.jpg',
  },
  {
    name: 'Anjana Shrestha',
    position: 'Administrative Staff',
    image: '/staff/staff-19.jpg',
  },
  {
    name: 'Sita Maya Shrestha',
    position: 'Administrative Staff',
    image: '/staff/staff-20.jpg',
  },
  {
    name: 'Amit Shrestha',
    position: 'ECA Incharge',
    image: '/staff/staff-21.jpg',
  },
  {
    name: 'Sarmila Shrestha',
    position: 'Administrative Staff',
    image: '/staff/staff-22.jpg',
  },
  {
    name: 'Ratna Maya Tamang',
    position: 'Administrative Staff',
    image: '/staff/staff-23.jpg',
  },
  {
    name: 'Amrita Manandhar',
    position: 'Administrative Staff',
    image: '/staff/staff-24.jpg',
  },
  {
    name: 'Ram Tamang',
    position: 'Administrative Staff',
    image: '/staff/staff-25.jpg',
  },
  {
    name: 'Nisha Shrestha',
    position: 'Administrative Staff',
    image: '/staff/staff-26.jpg',
  },
  {
    name: 'STAFF NAME',
    position: 'Administrative Staff',
    image: '/staff/staff-27.jpg',
  },
  {
    name: 'STAFF NAME',
    position: 'Administrative Staff',
    image: '/staff/staff-28.jpg',
  },
  {
    name: 'STAFF NAME',
    position: 'Administrative Staff',
    image: '/staff/staff-29.jpg',
  },
  {
    name: 'STAFF NAME',
    position: 'Administrative Staff',
    image: '/staff/staff-30.jpg',
  },
  {
    name: 'STAFF NAME',
    position: 'Administrative Staff',
    image: '/staff/staff-31.jpg',
  },
  {
    name: 'STAFF NAME',
    position: 'Administrative Staff',
    image: '/staff/staff-32.jpg',
  },
  {
    name: 'STAFF NAME',
    position: 'Administrative Staff',
    image: '/staff/staff-33.jpg',
  },
];

/* --------------------------------------------------
   Facilities
-------------------------------------------------- */

const facilities = [
  {
    title: 'Library',
    description:
      'A quiet learning space with useful academic and general reading materials.',
    icon: Library,
  },
  {
    title: 'Computer Laboratory',
    description:
      'Computer learning facilities that support digital skills and practical knowledge.',
    icon: Computer,
  },
  {
    title: 'Science Laboratory',
    description:
      'Practical learning opportunities that help students understand scientific concepts.',
    icon: FlaskConical,
  },
  {
    title: 'Smart Classrooms',
    description:
      'Classrooms supported by visual resources and modern teaching approaches.',
    icon: Monitor,
  },
  {
    title: 'Playground',
    description:
      'Space for physical development, games, teamwork and recreational activities.',
    icon: Trophy,
  },
  {
    title: 'Transportation',
    description:
      'School transportation support for safe and convenient student travel.',
    icon: Bus,
  },
  {
    title: 'CCTV and Security',
    description:
      'Safety measures that help create a secure environment for students and staff.',
    icon: ShieldCheck,
  },
  {
    title: 'Cafeteria',
    description:
      'A clean area where students can enjoy refreshments during school hours.',
    icon: Utensils,
  },
];

/* --------------------------------------------------
   Statistics
-------------------------------------------------- */

const schoolStatistics = [
  {
    value: 2049,
    suffix: ' B.S.',
    label: 'Established',
  },
  {
    value: 30,
    suffix: '+',
    label: 'Years of Experience',
  },
  {
    value: 10,
    suffix: '',
    label: 'Highest Grade',
  },
  {
    value: 8,
    suffix: '',
    label: 'Core Values',
  },
];

/* ==================================================
   ABOUT PAGE
================================================== */

export default function AboutPage() {
  const [showAllTeam, setShowAllTeam] =
    useState(false);

  /* ------------------------------------------------
     SEO
  ------------------------------------------------ */

  useEffect(() => {
    const previousTitle = document.title;

    document.title = `About Us | ${school.name}`;

    let description = document.querySelector(
      'meta[name="description"]',
    );

    const oldDescription =
      description?.getAttribute('content');

    if (!description) {
      description =
        document.createElement('meta');

      description.setAttribute(
        'name',
        'description',
      );

      document.head.appendChild(description);
    }

    description.setAttribute(
      'content',
      `Learn about ${school.name}, established in 2049 B.S., its history, mission, vision, values, leadership, achievements and school facilities.`,
    );

    return () => {
      document.title = previousTitle;

      if (oldDescription) {
        description.setAttribute(
          'content',
          oldDescription,
        );
      }
    };
  }, []);

  return (
    <>
      <Header />

      <main>
        {/* ==================================================
            ABOUT HERO
        ================================================== */}

        <section className="relative isolate min-h-[610px] overflow-hidden text-white">
          <img
            src={
              school.aboutHeroImage ||
              '/about-hero.jpg'
            }
            alt={`${school.name} students and school activities`}
            className="absolute inset-0 -z-30 h-full w-full object-cover object-center"
          />

          <div className="absolute inset-0 -z-20 bg-gradient-to-r from-navy-950/95 via-navy-950/80 to-navy-950/40" />

          <div className="absolute inset-0 -z-10 bg-navy-950/15" />

          <div className="section-shell relative z-10 flex min-h-[600px] items-center py-20">
            <motion.div
              variants={containerAnimation}
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
                  <Home
                    size={16}
                    aria-hidden="true"
                  />

                  Home
                </a>

                <ChevronRight
                  size={16}
                  aria-hidden="true"
                />

                <span className="text-gold-400">
                  About Us
                </span>
              </motion.nav>

              <motion.p
                variants={reveal}
                className="mt-10 text-sm font-extrabold uppercase tracking-[0.22em] text-gold-400"
              >
                Established in 2049 B.S.
              </motion.p>

              <motion.h1
                variants={reveal}
                className="mt-4 font-display text-5xl font-extrabold leading-tight sm:text-6xl lg:text-7xl"
              >
                About Us
              </motion.h1>

              <motion.p
                variants={reveal}
                className="mt-6 max-w-2xl text-lg leading-8 text-white/85 sm:text-xl"
              >
                Discover the story, purpose, values and
                people behind {school.name}, a trusted
                school community committed to quality
                education and responsible student
                development.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ==================================================
            INTRODUCTION
        ================================================== */}

        <section className="bg-white py-20 sm:py-24">
          <div className="section-shell grid items-center gap-14 lg:grid-cols-2">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
              }}
              variants={containerAnimation}
              className="relative grid grid-cols-2 gap-4"
            >
              <motion.div
                variants={reveal}
                className="pt-12"
              >
                <ImageWithFallback
                  src={
                    school.aboutImageOne ||
                    '/school-1.png'
                  }
                  alt={`Students learning at ${school.name}`}
                  className="h-[400px] rounded-[2rem] shadow-xl"
                />
              </motion.div>

              <motion.div variants={reveal}>
                <ImageWithFallback
                  src={
                    school.aboutImageTwo ||
                    '/school-.png'
                  }
                  alt={`School activities at ${school.name}`}
                  className="h-[400px] rounded-[2rem] shadow-xl"
                />
              </motion.div>

              <motion.div
                variants={reveal}
                className="absolute bottom-4 left-1/2 w-[230px] -translate-x-1/2 rounded-3xl bg-navy-950 p-6 text-white shadow-2xl"
              >
                <Quote
                  size={28}
                  className="text-gold-400"
                  aria-hidden="true"
                />

                <p className="mt-3 font-display text-lg font-bold leading-7">
                  Education is Light.
                </p>

                <p className="mt-2 text-sm text-white/65">
                  Learning today for a better
                  tomorrow.
                </p>
              </motion.div>
            </motion.div>

            <div>
              <SectionHeading
                eyebrow="Welcome to our school"
                title={`Welcome to ${school.name}`}
                description={`${school.name} was established in 2049 B.S. and has spent decades supporting children through quality education, discipline, creativity, confidence and responsible personal development.`}
              />

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                variants={containerAnimation}
                className="mt-7 space-y-5 text-base leading-8 text-slate-600"
              >
                <motion.p variants={reveal}>
                  We believe that education should help
                  students develop knowledge as well as
                  character. Our learning environment
                  encourages students to ask questions,
                  participate actively, communicate
                  confidently and take responsibility
                  for their progress.
                </motion.p>

                <motion.p variants={reveal}>
                  Through committed teachers, supportive
                  leadership and close cooperation with
                  parents, the school works to provide a
                  safe, welcoming and meaningful
                  educational experience for every
                  learner.
                </motion.p>

                <motion.div
                  variants={reveal}
                  className="flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-5"
                >
                  <MapPin
                    className="mt-1 shrink-0 text-royal-600"
                    size={21}
                    aria-hidden="true"
                  />

                  <div>
                    <p className="font-extrabold text-navy-950">
                      Our location
                    </p>

                    <p className="mt-1 text-sm text-slate-600">
                      {school.address}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ==================================================
            STATISTICS
        ================================================== */}

        <section className="bg-navy-950 py-14 text-white">
          <motion.div
            variants={containerAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            className="section-shell grid grid-cols-2 gap-8 lg:grid-cols-4"
          >
            {schoolStatistics.map((item) => (
              <motion.div
                key={item.label}
                variants={reveal}
                className="text-center"
              >
                <p className="font-display text-4xl font-extrabold text-gold-400 sm:text-5xl">
                  <AnimatedCounter
                    value={item.value}
                    suffix={item.suffix}
                  />
                </p>

                <p className="mt-3 text-sm font-bold text-white/65 sm:text-base">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ==================================================
            HISTORY
        ================================================== */}

        <section className="bg-slate-50 py-20 sm:py-24">
          <div className="section-shell">
            <SectionHeading
              eyebrow="Our journey"
              title="Our History"
              description={`The history of ${school.name} began in 2049 B.S. with a commitment to serve children and families through caring, disciplined and quality education.`}
              centered
            />

            <div className="relative mx-auto mt-14 max-w-5xl">
              <div className="absolute bottom-0 left-5 top-0 w-px bg-blue-200 md:left-1/2" />

              <div className="space-y-10">
                {timelineItems.map(
                  (item, index) => (
                    <motion.article
                      key={item.title}
                      initial={{
                        opacity: 0,
                        y: 35,
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                      }}
                      viewport={{
                        once: true,
                        amount: 0.25,
                      }}
                      transition={{
                        duration: 0.55,
                        delay: index * 0.08,
                      }}
                      className={`relative grid gap-7 pl-14 md:grid-cols-2 md:pl-0 ${
                        index % 2 === 0
                          ? ''
                          : 'md:[&>div:first-child]:order-2'
                      }`}
                    >
                      <div
                        className={`rounded-3xl border border-slate-200 bg-white p-7 shadow-sm ${
                          index % 2 === 0
                            ? 'md:mr-10'
                            : 'md:ml-10'
                        }`}
                      >
                        <span className="inline-flex rounded-full bg-gold-400 px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-navy-950">
                          {item.year}
                        </span>

                        <h3 className="mt-5 font-display text-2xl font-bold text-navy-950">
                          {item.title}
                        </h3>

                        <p className="mt-3 leading-7 text-slate-600">
                          {item.description}
                        </p>
                      </div>

                      <div />

                      <span className="absolute left-0 top-8 grid size-10 place-items-center rounded-full border-4 border-slate-50 bg-royal-600 text-white shadow-lg md:left-1/2 md:-translate-x-1/2">
                        <CheckCircle2
                          size={17}
                          aria-hidden="true"
                        />
                      </span>
                    </motion.article>
                  ),
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            MISSION / VISION
        ================================================== */}

        <section className="bg-white py-20 sm:py-24">
          <div className="section-shell">
            <SectionHeading
              eyebrow="Our direction"
              title="Mission, Vision and Objectives"
              description="Our educational direction is centred on academic growth, strong character, practical skills and responsible citizenship."
              centered
            />

            <motion.div
              variants={containerAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
              }}
              className="mt-12 grid gap-6 lg:grid-cols-3"
            >
              {missionCards.map((card) => {
                const Icon = card.icon;

                return (
                  <motion.article
                    key={card.title}
                    variants={reveal}
                    whileHover={{
                      y: -8,
                    }}
                    className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-xl"
                  >
                    <span className="grid size-14 place-items-center rounded-2xl bg-blue-50 text-royal-600">
                      <Icon
                        size={27}
                        aria-hidden="true"
                      />
                    </span>

                    <h3 className="mt-6 font-display text-2xl font-bold text-navy-950">
                      {card.title}
                    </h3>

                    <p className="mt-4 leading-7 text-slate-600">
                      {card.description}
                    </p>
                  </motion.article>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ==================================================
            CORE VALUES
        ================================================== */}

        <section className="bg-navy-950 py-20 text-white sm:py-24">
          <div className="section-shell">
            <SectionHeading
              eyebrow="What guides us"
              title="Our Core Values"
              description="These values guide the way our students learn, our teachers teach and our school community works together."
              centered
            />

            <motion.div
              variants={containerAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.15,
              }}
              className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4"
            >
              {coreValues.map((value) => {
                const Icon = value.icon;

                return (
                  <motion.article
                    key={value.title}
                    variants={reveal}
                    whileHover={{
                      y: -6,
                    }}
                    className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur transition hover:border-gold-400/60 hover:bg-white/10"
                  >
                    <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-gold-400 text-navy-950">
                      <Icon
                        size={23}
                        aria-hidden="true"
                      />
                    </span>

                    <h3 className="mt-4 font-display text-lg font-bold">
                      {value.title}
                    </h3>
                  </motion.article>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ==================================================
            WHY CHOOSE OUR SCHOOL
        ================================================== */}

        <section className="bg-white py-20 sm:py-24">
          <div className="section-shell grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <SectionHeading
                eyebrow="Why families choose us"
                title="Why Choose Our School?"
                description="We create a balanced learning experience that supports academic development, discipline, confidence, creativity and responsible behaviour."
              />

              <motion.div
                variants={containerAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                className="mt-8 grid gap-4 sm:grid-cols-2"
              >
                {reasons.map((reason) => (
                  <motion.div
                    key={reason}
                    variants={reveal}
                    className="flex items-start gap-3 rounded-2xl border border-slate-200 p-4"
                  >
                    <CheckCircle2
                      size={21}
                      className="mt-0.5 shrink-0 text-royal-600"
                      aria-hidden="true"
                    />

                    <p className="font-bold leading-6 text-navy-950">
                      {reason}
                    </p>
                  </motion.div>
                ))}
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
              className="relative"
            >
              <img
                src={school.whyChooseImage}
                alt={`Students learning at ${school.name}`}
                className="h-[520px] w-full rounded-[2rem] object-cover"
              />

              <div className="absolute bottom-6 left-6 right-6 rounded-3xl bg-navy-950/90 p-6 text-white backdrop-blur">
                <p className="text-sm font-extrabold uppercase tracking-wider text-gold-400">
                  Education is Light
                </p>

                <p className="mt-2 font-display text-xl font-bold">
                  Helping every learner become
                  knowledgeable, confident and
                  responsible.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ==================================================
            ACHIEVEMENTS
        ================================================== */}

        <section className="bg-slate-50 py-20 sm:py-24">
          <div className="section-shell">
            <SectionHeading
              eyebrow="Student development"
              title="School Achievements and Activities"
              description="Our school celebrates progress not only in academic learning but also in creativity, sports, leadership and community participation."
              centered
            />

            <motion.div
              variants={containerAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.15,
              }}
              className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5"
            >
              {achievementCards.map((card) => {
                const Icon = card.icon;

                return (
                  <motion.article
                    key={card.title}
                    variants={reveal}
                    whileHover={{
                      y: -7,
                    }}
                    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-xl"
                  >
                    <span className="grid size-12 place-items-center rounded-2xl bg-blue-50 text-royal-600">
                      <Icon
                        size={23}
                        aria-hidden="true"
                      />
                    </span>

                    <h3 className="mt-5 font-display text-xl font-bold text-navy-950">
                      {card.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {card.description}
                    </p>
                  </motion.article>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ==================================================
            SCHOOL LEADERSHIP / TEAM
        ================================================== */}

        <section className="overflow-hidden bg-white py-20 sm:py-24">
          <div className="section-shell">
            <SectionHeading
              eyebrow="The people behind our school"
              title="Meet Our School Team"
              description="Meet the dedicated leaders, teachers and staff who work together to guide, support and inspire our students every day."
              centered
            />

            {/* Team Grid */}

            <motion.div
              layout
              className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
            >
              {(showAllTeam
                ? leadershipMembers
                : leadershipMembers.slice(0, 5)
              ).map((member, index) => (
                <motion.article
                  layout
                  key={`${member.name}-${member.position}-${index}`}
                  initial={{
                    opacity: 0,
                    y: 45,
                    scale: 0.95,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.1,
                  }}
                  transition={{
                    duration: 0.55,
                    delay: Math.min(
                      index * 0.06,
                      0.3,
                    ),
                    ease: 'easeOut',
                  }}
                  whileHover={{
                    y: -10,
                  }}
                  className="group relative overflow-hidden rounded-[2rem] bg-navy-950 shadow-md transition-shadow duration-500 hover:shadow-2xl"
                >
                  {/* Staff Photo */}

                  <div className="relative aspect-[4/5] overflow-hidden">
                    <ImageWithFallback
                      src={member.image}
                      alt={`${member.name}, ${member.position} at ${school.name}`}
                      className="absolute inset-0 h-full w-full bg-slate-100"
                      imageClassName="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      imageStyle={{
                        objectPosition:
                          'center 20%',
                      }}
                    />

                    {/* Dark Gradient */}

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/15 to-transparent opacity-90 transition-all duration-500 group-hover:opacity-100" />

                    {/* Blue Hover Effect */}

                    <div className="pointer-events-none absolute inset-0 bg-royal-600/0 transition-all duration-500 group-hover:bg-royal-600/10" />

                   

                    {/* Person Information */}

                    <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                      <div className="transition-transform duration-500 group-hover:-translate-y-2">
                        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-gold-400">
                          {member.position}
                        </p>

                        <h3 className="mt-2 font-display text-xl font-bold leading-tight text-white">
                          {member.name}
                        </h3>

                        {/* Revealed on Hover */}

                        <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:mt-4 group-hover:max-h-24 group-hover:opacity-100">
                          <div className="h-[2px] w-10 rounded-full bg-gold-400" />

                          <p className="mt-3 text-sm font-medium leading-6 text-white/75">
                            {school.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>

            {/* See More / Show Less */}

            {leadershipMembers.length > 5 && (
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
                }}
                transition={{
                  duration: 0.5,
                }}
                className="mt-12 flex justify-center"
              >
                <motion.button
                  type="button"
                  onClick={() =>
                    setShowAllTeam(
                      (previous) => !previous,
                    )
                  }
                  whileHover={{
                    scale: 1.04,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-navy-950 px-8 font-extrabold text-white shadow-lg transition-colors duration-300 hover:bg-royal-600"
                >
                  {showAllTeam
                    ? 'Show Less'
                    : 'See More Staff'}

                  <ArrowRight
                    size={18}
                    aria-hidden="true"
                    className={`transition-transform duration-300 ${
                      showAllTeam
                        ? '-rotate-90'
                        : 'group-hover:translate-x-1'
                    }`}
                  />
                </motion.button>
              </motion.div>
            )}
          </div>
        </section>

        {/* ==================================================
            ADMISSION CTA
        ================================================== */}

        <section className="relative isolate overflow-hidden bg-royal-600 py-20 text-white">
          <div className="absolute -left-24 -top-24 -z-10 size-80 rounded-full bg-white/10 blur-3xl" />

          <div className="absolute -bottom-32 -right-20 -z-10 size-96 rounded-full bg-navy-950/25 blur-3xl" />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.3,
            }}
            variants={containerAnimation}
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
              Become Part of Our School Community
            </motion.h2>

            <motion.p
              variants={reveal}
              className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/80"
            >
              Give your child an opportunity to
              learn in a caring, disciplined and
              encouraging environment at{' '}
              {school.name}.
            </motion.p>

            <motion.div
              variants={reveal}
              className="mt-9 flex flex-col justify-center gap-4 sm:flex-row"
            >
              <a
                href="/apply"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-gold-400 px-7 font-extrabold text-navy-950 transition hover:-translate-y-1 hover:bg-white"
              >
                Apply Now

                <ArrowRight
                  size={18}
                  aria-hidden="true"
                />
              </a>

              <a
                href="/#contact"
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/35 px-7 font-extrabold text-white transition hover:-translate-y-1 hover:bg-white hover:text-navy-950"
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