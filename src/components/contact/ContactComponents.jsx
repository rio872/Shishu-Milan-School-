import {
  useEffect,
  useState,
} from 'react';

import {
  AnimatePresence,
  motion,
} from 'framer-motion';

import {
  ArrowRight,
  Building2,
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock3,
  ExternalLink,
  Facebook,
  GraduationCap,
  Instagram,
  Linkedin,
  LoaderCircle,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  Truck,
  UserRound,
  WalletCards,
  XCircle,
} from 'lucide-react';

import {
  contactFaqs,
  contactInfoCards,
  departmentContacts,
  enquirySubjects,
  socialMediaLinks,
} from '../../data/contactData';

import { school } from '../../data/schoolData';

import {
  sendContactEnquiry,
} from '../../services/contactService';

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
      staggerChildren: 0.08,
    },
  },
};

const initialForm = {
  fullName: '',
  phone: '',
  email: '',
  grade: '',
  subject: '',
  message: '',
};

function normalizePhone(value) {
  return String(value || '').replace(
    /[^\d+]/g,
    '',
  );
}

function normalizeWhatsApp(value) {
  return String(value || '').replace(
    /\D/g,
    '',
  );
}

function TikTokIcon({
  size = 24,
  className = '',
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16.7 2c.3 2.6 1.8 4.2 4.3 4.4v3.1c-1.5.1-2.9-.3-4.2-1.1v6.3c0 4-3.2 7.3-7.3 7.3S2.2 18.7 2.2 14.7s3.2-7.3 7.3-7.3c.4 0 .8 0 1.2.1v3.3c-.4-.1-.8-.2-1.2-.2-2.2 0-4 1.8-4 4.1s1.8 4.1 4 4.1 4-1.8 4-4.1V2h3.2Z" />
    </svg>
  );
}

function getContactIcon(icon) {
  const icons = {
    address: MapPin,
    phone: Phone,
    email: Mail,
    hours: Clock3,
    whatsapp: MessageCircle,
  };

  return icons[icon] || MapPin;
}

function getDepartmentIcon(icon) {
  const icons = {
    admission: UserRound,
    administration: Building2,
    accounts: WalletCards,
    academic: GraduationCap,
    transport: Truck,
  };

  return icons[icon] || Building2;
}

function getSocialIcon(icon) {
  const icons = {
    facebook: Facebook,
    instagram: Instagram,
    linkedin: Linkedin,
  };

  return icons[icon] || ExternalLink;
}

/* --------------------------------------------------
   Contact Hero
-------------------------------------------------- */

export function ContactHero({
  image = '/contact-hero.jpg',
}) {
  return (
    <section className="relative min-h-[610px] overflow-hidden bg-navy-950 text-white">

      {/* Background Image */}
      <img
        src="/contact-hero.jpg"
        alt={`Contact ${school.name}`}
        className="absolute inset-0 z-0 h-full w-full object-cover object-center"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-navy-950/90 via-navy-950/70 to-navy-950/30" />

      {/* Content */}
      <div className="section-shell relative z-20 flex min-h-[560px] items-center py-20">
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
              Contact
            </span>
          </motion.nav>

          <motion.p
            variants={reveal}
            className="mt-9 text-sm font-extrabold uppercase tracking-[0.22em] text-gold-400"
          >
            We are here to help
          </motion.p>

          <motion.h1
            variants={reveal}
            className="mt-4 font-display text-5xl font-extrabold leading-tight sm:text-6xl lg:text-7xl"
          >
            Contact Us
          </motion.h1>

          <motion.p
            variants={reveal}
            className="mt-6 max-w-2xl text-lg leading-8 text-white/80 sm:text-xl"
          >
            Contact {school.name} for admission information,
            academic enquiries, school visits, transportation
            and general support.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------------------------------
   Contact Information Cards
-------------------------------------------------- */

export function ContactInfoCards() {
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
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-royal-600">
            Contact information
          </p>

          <h2 className="mt-3 font-display text-4xl font-extrabold text-navy-950 sm:text-5xl">
            Reach Our School
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Choose the most convenient way to
            contact the school administration.
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
          className="mx-auto mt-12 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {contactInfoCards.map((item) => {
            const Icon =
              getContactIcon(item.icon);

            const content = (
              <>
                <span className="grid size-14 place-items-center rounded-2xl bg-blue-50 text-royal-600 transition group-hover:bg-royal-600 group-hover:text-white">
                  <Icon
                    size={25}
                    aria-hidden="true"
                  />
                </span>

                <h3 className="mt-6 font-display text-xl font-bold text-navy-950">
                  {item.title}
                </h3>

                <p className="mt-3 break-words font-bold leading-7 text-slate-700">
                  {item.detail}
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {item.subtext}
                </p>

                {item.href &&
                  item.linkText && (
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-royal-600">
                      {item.linkText}

                      <ArrowRight
                        size={16}
                        aria-hidden="true"
                      />
                    </span>
                  )}
              </>
            );

            if (item.href) {
              return (
                <motion.a
                  key={item.id}
                  variants={reveal}
                  whileHover={{
                    y: -7,
                  }}
                  href={item.href}
                  target={
                    item.icon === 'address' ||
                    item.icon === 'whatsapp'
                      ? '_blank'
                      : undefined
                  }
                  rel={
                    item.icon === 'address' ||
                    item.icon === 'whatsapp'
                      ? 'noopener noreferrer'
                      : undefined
                  }
                  className="group rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-xl"
                >
                  {content}
                </motion.a>
              );
            }

            return (
              <motion.article
                key={item.id}
                variants={reveal}
                whileHover={{
                  y: -7,
                }}
                className="group rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-xl"
              >
                {content}
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------------------------------
   Contact Form
-------------------------------------------------- */

export function ContactForm() {
  const [form, setForm] =
    useState(initialForm);

  const [errors, setErrors] =
    useState({});

  const [loading, setLoading] =
    useState(false);

  const [status, setStatus] =
    useState(null);

  const validate = () => {
    const nextErrors = {};

    if (form.fullName.trim().length < 2) {
      nextErrors.fullName =
        'Please enter your full name.';
    }

    if (
      !/^[+\d][\d\s()-]{7,}$/.test(
        form.phone.trim(),
      )
    ) {
      nextErrors.phone =
        'Please enter a valid phone number.';
    }

    if (
      !/^\S+@\S+\.\S+$/.test(
        form.email.trim(),
      )
    ) {
      nextErrors.email =
        'Please enter a valid email address.';
    }

    if (!form.subject) {
      nextErrors.subject =
        'Please choose an enquiry subject.';
    }

    if (
      form.message.trim().length < 10
    ) {
      nextErrors.message =
        'Please enter at least 10 characters.';
    }

    return nextErrors;
  };

  const updateField = (event) => {
    const {
      name,
      value,
    } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((current) => ({
        ...current,
        [name]: '',
      }));
    }

    setStatus(null);
  };

  const submitForm = async (event) => {
    event.preventDefault();

    const nextErrors = validate();

    setErrors(nextErrors);
    setStatus(null);

    if (
      Object.keys(nextErrors).length > 0
    ) {
      return;
    }

    setLoading(true);

    try {
      const result =
        await sendContactEnquiry({
          ...form,
          fullName:
            form.fullName.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          message:
            form.message.trim(),
          submittedAt:
            new Date().toISOString(),
        });

      if (result.demoMode) {
        setStatus({
          type: 'demo',
          message:
            'The form is working in demo mode. Connect a backend API to deliver this enquiry to the school.',
        });
      } else {
        setStatus({
          type: 'success',
          message:
            'Thank you. Your enquiry has been sent successfully.',
        });
      }

      setForm(initialForm);
      setErrors({});
    } catch (error) {
      setStatus({
        type: 'error',
        message:
          error.message ||
          'The enquiry could not be submitted. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const fieldClass =
    'mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-navy-950 outline-none transition placeholder:text-slate-400 focus:border-royal-500 focus:ring-4 focus:ring-blue-100';

  return (
    <section className="bg-slate-50 py-20 sm:py-24">
      <div className="section-shell grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="lg:sticky lg:top-32"
        >
          <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-royal-600">
            Send an enquiry
          </p>

          <h2 className="mt-3 font-display text-4xl font-extrabold leading-tight text-navy-950 sm:text-5xl">
            How can we help you?
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Complete the enquiry form and
            provide enough information for the
            school team to understand your
            request.
          </p>

          <div className="mt-8 rounded-[1.75rem] bg-navy-950 p-6 text-white">
            <ShieldCheck
              size={30}
              className="text-gold-400"
              aria-hidden="true"
            />

            <h3 className="mt-5 font-display text-xl font-bold">
              Your information is important
            </h3>

            <p className="mt-3 leading-7 text-white/70">
              Information submitted through the
              form should only be used to respond
              to the school enquiry.
            </p>
          </div>
        </motion.div>

        <motion.form
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
            amount: 0.15,
          }}
          onSubmit={submitForm}
          noValidate
          className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl sm:p-9"
        >
          <h3 className="font-display text-3xl font-bold text-navy-950">
            Contact Form
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Fields marked with * are required.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-bold text-navy-950">
              Full Name *

              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={updateField}
                autoComplete="name"
                placeholder="Enter your full name"
                className={fieldClass}
                aria-invalid={Boolean(
                  errors.fullName,
                )}
              />

              {errors.fullName && (
                <span className="mt-1 block text-xs font-semibold text-red-600">
                  {errors.fullName}
                </span>
              )}
            </label>

            <label className="text-sm font-bold text-navy-950">
              Phone Number *

              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={updateField}
                autoComplete="tel"
                inputMode="tel"
                placeholder="+977 98XXXXXXXX"
                className={fieldClass}
                aria-invalid={Boolean(
                  errors.phone,
                )}
              />

              {errors.phone && (
                <span className="mt-1 block text-xs font-semibold text-red-600">
                  {errors.phone}
                </span>
              )}
            </label>

            <label className="text-sm font-bold text-navy-950">
              Email Address *

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={updateField}
                autoComplete="email"
                placeholder="you@example.com"
                className={fieldClass}
                aria-invalid={Boolean(
                  errors.email,
                )}
              />

              {errors.email && (
                <span className="mt-1 block text-xs font-semibold text-red-600">
                  {errors.email}
                </span>
              )}
            </label>

            <label className="text-sm font-bold text-navy-950">
              Student Class or Grade

              <select
                name="grade"
                value={form.grade}
                onChange={updateField}
                className={fieldClass}
              >
                <option value="">
                  Select grade level
                </option>

                <option value="Pre-Primary">
                  Pre-Primary
                </option>

                <option value="Grades 1–5">
                  Grades 1–5
                </option>

                <option value="Grades 6–8">
                  Grades 6–8
                </option>

                <option value="Grades 9–10">
                  Grades 9–10
                </option>

                <option value="Not Applicable">
                  Not Applicable
                </option>
              </select>
            </label>
          </div>

          <label className="mt-5 block text-sm font-bold text-navy-950">
            Enquiry Subject *

            <select
              name="subject"
              value={form.subject}
              onChange={updateField}
              className={fieldClass}
              aria-invalid={Boolean(
                errors.subject,
              )}
            >
              <option value="">
                Select an enquiry subject
              </option>

              {enquirySubjects.map(
                (subject) => (
                  <option
                    key={subject}
                    value={subject}
                  >
                    {subject}
                  </option>
                ),
              )}
            </select>

            {errors.subject && (
              <span className="mt-1 block text-xs font-semibold text-red-600">
                {errors.subject}
              </span>
            )}
          </label>

          <label className="mt-5 block text-sm font-bold text-navy-950">
            Message *

            <textarea
              name="message"
              value={form.message}
              onChange={updateField}
              placeholder="Write your enquiry here..."
              className={`${fieldClass} min-h-36 resize-y`}
              aria-invalid={Boolean(
                errors.message,
              )}
            />

            {errors.message && (
              <span className="mt-1 block text-xs font-semibold text-red-600">
                {errors.message}
              </span>
            )}
          </label>

          {status && (
            <div
              role={
                status.type === 'error'
                  ? 'alert'
                  : 'status'
              }
              className={`mt-6 flex items-start gap-3 rounded-2xl p-4 text-sm font-bold ${
                status.type === 'success'
                  ? 'bg-emerald-50 text-emerald-700'
                  : status.type === 'demo'
                    ? 'bg-amber-50 text-amber-700'
                    : 'bg-red-50 text-red-700'
              }`}
            >
              {status.type === 'success' ? (
                <CheckCircle2
                  size={20}
                  className="mt-0.5 shrink-0"
                  aria-hidden="true"
                />
              ) : (
                <XCircle
                  size={20}
                  className="mt-0.5 shrink-0"
                  aria-hidden="true"
                />
              )}

              {status.message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-7 inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full bg-royal-600 px-7 font-extrabold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-navy-950 disabled:cursor-not-allowed disabled:opacity-65"
          >
            {loading ? (
              <>
                <LoaderCircle
                  size={19}
                  className="animate-spin"
                  aria-hidden="true"
                />

                Sending...
              </>
            ) : (
              <>
                Send Enquiry

                <Send
                  size={18}
                  aria-hidden="true"
                />
              </>
            )}
          </button>
        </motion.form>
      </div>
    </section>
  );
}

/* --------------------------------------------------
   Location and Map
-------------------------------------------------- */

export function LocationSection() {
  const phoneNumber =
    normalizePhone(school.phone);

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="section-shell grid overflow-hidden rounded-[2.25rem] border border-slate-200 bg-slate-50 shadow-xl lg:grid-cols-2">
        <motion.div
          initial={{
            opacity: 0,
            x: -30,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="p-7 sm:p-10 lg:p-12"
        >
          <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-royal-600">
            School location
          </p>

          <h2 className="mt-3 font-display text-4xl font-extrabold text-navy-950 sm:text-5xl">
            Visit Our School
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Parents and visitors are welcome to
            contact the school before visiting so
            that the appropriate staff member can
            assist them.
          </p>

          <div className="mt-8 space-y-5">
            <div className="flex gap-4">
              <MapPin
                className="mt-1 shrink-0 text-royal-600"
                aria-hidden="true"
              />

              <div>
                <h3 className="font-bold text-navy-950">
                  Full Address
                </h3>

                <p className="mt-1 text-slate-600">
                  {school.address ||
                    '[FULL SCHOOL ADDRESS]'}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Landmark:{' '}
                  {school.landmark ||
                    '[NEARBY LANDMARK]'}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <CalendarClock
                className="mt-1 shrink-0 text-royal-600"
                aria-hidden="true"
              />

              <div>
                <h3 className="font-bold text-navy-950">
                  Office Hours
                </h3>

                <p className="mt-1 text-slate-600">
                  {school.officeHours ||
                    '[OFFICE HOURS]'}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Phone
                className="mt-1 shrink-0 text-royal-600"
                aria-hidden="true"
              />

              <div>
                <h3 className="font-bold text-navy-950">
                  Phone
                </h3>

                <a
                  href={`tel:${phoneNumber}`}
                  className="mt-1 block text-slate-600 transition hover:text-royal-600"
                >
                  {school.phone ||
                    '[SCHOOL PHONE]'}
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <Mail
                className="mt-1 shrink-0 text-royal-600"
                aria-hidden="true"
              />

              <div>
                <h3 className="font-bold text-navy-950">
                  Email
                </h3>

                <a
                  href={`mailto:${
                    school.email || ''
                  }`}
                  className="mt-1 block break-all text-slate-600 transition hover:text-royal-600"
                >
                  {school.email ||
                    '[SCHOOL EMAIL]'}
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl bg-blue-50 p-5">
            <h3 className="font-bold text-navy-950">
              Transportation and Access
            </h3>

            <p className="mt-2 text-sm leading-7 text-slate-600">
              The school can be reached by local
              public transportation, taxi or
              private vehicle. Use Google Maps for
              the latest route and traffic
              information.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={
                school.mapLink ||
                '[GOOGLE MAPS LOCATION LINK]'
              }
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full bg-royal-600 px-6 font-extrabold text-white transition hover:bg-navy-950"
            >
              <MapPin
                size={18}
                aria-hidden="true"
              />

              Get Directions
            </a>

            <a
              href={`tel:${phoneNumber}`}
              className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full border border-slate-300 px-6 font-extrabold text-navy-950 transition hover:border-gold-400 hover:bg-gold-400"
            >
              <Phone
                size={18}
                aria-hidden="true"
              />

              Call School
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            x: 30,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="min-h-[430px] bg-slate-200 lg:min-h-full"
        >
          {school.mapEmbed ? (
            <iframe
              src={school.mapEmbed}
              title={`${school.name} location on Google Maps`}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[430px] w-full border-0"
            />
          ) : (
            <div className="grid h-full min-h-[430px] place-items-center p-8 text-center">
              <div>
                <MapPin
                  size={48}
                  className="mx-auto text-royal-600"
                  aria-hidden="true"
                />

                <h3 className="mt-5 font-display text-2xl font-bold text-navy-950">
                  Google Map
                </h3>

                <p className="mt-3 text-slate-600">
                  Add the Google Maps embed link
                  inside schoolData.js.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------------------------------
   Department Contacts
-------------------------------------------------- */

export function DepartmentContacts() {
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
            Department support
          </p>

          <h2 className="mt-3 font-display text-4xl font-extrabold text-navy-950 sm:text-5xl">
            Department Contacts
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Contact the appropriate department for
            faster assistance with your enquiry.
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
          {departmentContacts.map(
            (department) => {
              const Icon =
                getDepartmentIcon(
                  department.icon,
                );

              const phoneNumber =
                normalizePhone(
                  department.phone,
                );

              return (
                <motion.article
                  key={department.id}
                  variants={reveal}
                  whileHover={{
                    y: -6,
                  }}
                  className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition-shadow hover:shadow-xl"
                >
                  <span className="grid size-14 place-items-center rounded-2xl bg-blue-50 text-royal-600">
                    <Icon
                      size={26}
                      aria-hidden="true"
                    />
                  </span>

                  <h3 className="mt-6 font-display text-2xl font-bold text-navy-950">
                    {department.department}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    {department.description}
                  </p>

                  <div className="mt-6 space-y-3 border-t border-slate-200 pt-5">
                    <a
                      href={`tel:${phoneNumber}`}
                      className="flex items-center gap-3 text-sm font-semibold text-slate-600 transition hover:text-royal-600"
                    >
                      <Phone
                        size={17}
                        aria-hidden="true"
                      />

                      {department.phone}
                    </a>

                    <a
                      href={`mailto:${department.email}`}
                      className="flex items-center gap-3 break-all text-sm font-semibold text-slate-600 transition hover:text-royal-600"
                    >
                      <Mail
                        size={17}
                        className="shrink-0"
                        aria-hidden="true"
                      />

                      {department.email}
                    </a>

                    <p className="flex items-start gap-3 text-sm font-semibold text-slate-600">
                      <Clock3
                        size={17}
                        className="mt-0.5 shrink-0"
                        aria-hidden="true"
                      />

                      {department.hours}
                    </p>
                  </div>
                </motion.article>
              );
            },
          )}
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------------------------------
   FAQ
-------------------------------------------------- */

export function ContactFAQ() {
  const [openId, setOpenId] =
    useState(contactFaqs[0]?.id || null);

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="section-shell grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
        >
          <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-royal-600">
            Helpful information
          </p>

          <h2 className="mt-3 font-display text-4xl font-extrabold text-navy-950 sm:text-5xl">
            Frequently Asked Questions
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Find answers to common questions
            about admission, school hours,
            transportation, teachers and our
            location.
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
          className="space-y-4"
        >
          {contactFaqs.map((faq) => {
            const isOpen =
              openId === faq.id;

            const answerId =
              `contact-faq-answer-${faq.id}`;

            return (
              <motion.article
                key={faq.id}
                variants={reveal}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenId(
                      isOpen
                        ? null
                        : faq.id,
                    )
                  }
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left"
                >
                  <span className="font-display text-lg font-bold text-navy-950 sm:text-xl">
                    {faq.question}
                  </span>

                  <ChevronDown
                    size={21}
                    className={`shrink-0 text-royal-600 transition-transform ${
                      isOpen
                        ? 'rotate-180'
                        : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={answerId}
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
                        duration: 0.25,
                      }}
                    >
                      <p className="border-t border-slate-200 px-6 py-5 leading-8 text-slate-600">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------------------------------
   Social Links
-------------------------------------------------- */

export function SocialLinks() {
  return (
    <section className="bg-navy-950 py-16 text-white">
      <div className="section-shell">
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
            amount: 0.25,
          }}
          className="flex flex-col items-center justify-between gap-8 lg:flex-row"
        >
          <div className="max-w-2xl text-center lg:text-left">
            <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-gold-400">
              Follow our school
            </p>

            <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">
              Connect With Us on Social Media
            </h2>

            <p className="mt-4 leading-7 text-white/65">
              Follow school activities,
              achievements, announcements and
              student programs.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {socialMediaLinks.map((social) => {
              const Icon =
                getSocialIcon(
                  social.icon,
                );

              return (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${school.name} on ${social.name}`}
                  className="group inline-flex min-h-[52px] items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 font-extrabold transition hover:-translate-y-1 hover:border-gold-400 hover:bg-gold-400 hover:text-navy-950"
                >
                  {social.icon ===
                  'tiktok' ? (
                    <TikTokIcon
                      size={20}
                    />
                  ) : (
                    <Icon
                      size={20}
                      aria-hidden="true"
                    />
                  )}

                  {social.name}
                </a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------------------------------
   Contact CTA
-------------------------------------------------- */

export function ContactCTA() {
  const phoneNumber =
    normalizePhone(school.phone);

  const whatsappNumber =
    normalizeWhatsApp(
      school.whatsapp,
    );

  return (
    <section className="relative isolate overflow-hidden bg-royal-600 py-20 text-white">
      <div className="absolute -left-24 -top-24 -z-10 size-80 rounded-full bg-white/10 blur-3xl" />

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
          Quick contact
        </p>

        <h2 className="mx-auto mt-4 max-w-4xl font-display text-4xl font-extrabold leading-tight sm:text-5xl">
          Have More Questions?
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/80">
          Contact the school by phone,
          WhatsApp or email and our team will
          help you with the information you need.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row sm:flex-wrap">
          <a
            href={`tel:${phoneNumber}`}
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-gold-400 px-7 font-extrabold text-navy-950 transition hover:-translate-y-1 hover:bg-white"
          >
            <Phone
              size={18}
              aria-hidden="true"
            />

            Call Us
          </a>

         
       
          <a
            href={`mailto:${
              school.email || ''
            }`}
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-white/35 px-7 font-extrabold text-white transition hover:-translate-y-1 hover:bg-white hover:text-navy-950"
          >
            <Mail
              size={18}
              aria-hidden="true"
            />

            Send an Email
          </a>
        </div>
      </motion.div>
    </section>
  );
}