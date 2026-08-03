import { useState } from 'react';
import emailjs from '@emailjs/browser';

import {
  AlertCircle,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-react';

import { school } from '../data/schoolData';
import { Reveal, SectionHeading } from './Shared';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  grade: '',
  message: '',
};

const emailServiceId =
  import.meta.env.VITE_EMAILJS_SERVICE_ID;

const emailTemplateId =
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

const emailPublicKey =
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sendError, setSendError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = 'Please enter your name.';
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      nextErrors.email =
        'Please enter a valid email address.';
    }

    if (!/^[+\d][\d\s-]{7,}$/.test(form.phone.trim())) {
      nextErrors.phone =
        'Please enter a valid phone number.';
    }

    if (!form.grade) {
      nextErrors.grade =
        'Please choose a grade level.';
    }

    if (form.message.trim().length < 10) {
      nextErrors.message =
        'Please add at least 10 characters.';
    }

    return nextErrors;
  };

  const submit = async (event) => {
    event.preventDefault();

    setSubmitted(false);
    setSendError('');

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    if (
      !emailServiceId ||
      !emailTemplateId ||
      !emailPublicKey
    ) {
      setSendError(
        'The enquiry service has not been configured. Please contact the school directly.',
      );

      return;
    }

    setLoading(true);

    try {
      const templateParameters = {
        parent_name: form.name.trim(),
        parent_email: form.email.trim(),
        parent_phone: form.phone.trim(),
        grade: form.grade,
        message: form.message.trim(),
        reply_to: form.email.trim(),
        school_name: school.name,
      };

      await emailjs.send(
        emailServiceId,
        emailTemplateId,
        templateParameters,
        {
          publicKey: emailPublicKey,
        },
      );

      setSubmitted(true);
      setForm(initialForm);
      setErrors({});
    } catch (error) {
      console.error('EmailJS enquiry error:', error);

      setSendError(
        'Your enquiry could not be sent. Please try again or contact the school by phone or email.',
      );
    } finally {
      setLoading(false);
    }
  };

  const update = (event) => {
    const { name, value } = event.target;

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

    setSubmitted(false);
    setSendError('');
  };

  const fieldClass =
    'mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-navy-950 outline-none transition placeholder:text-slate-400 focus:border-royal-500 focus:ring-4 focus:ring-blue-100';

  return (
    <section
      id="contact"
      className="section-padding bg-slate-50"
    >
      <div className="section-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionHeading
            kicker="Contact & Enquiry"
            title="We are ready to answer your questions."
            copy="Speak with our admission team, request a school visit or ask about the right program for your child."
          />

          <Reveal
            delay={0.08}
            className="mt-9 space-y-4"
          >
            <a
              href={`tel:${school.phone}`}
              className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="grid size-12 place-items-center rounded-xl bg-blue-50 text-royal-600">
                <Phone aria-hidden="true" />
              </span>

              <span>
                <small className="block font-bold text-slate-500">
                  Call us
                </small>

                <strong className="text-navy-950">
                  {school.phone}
                </strong>
              </span>
            </a>

            <a
              href={`mailto:${school.email}`}
              className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="grid size-12 place-items-center rounded-xl bg-blue-50 text-royal-600">
                <Mail aria-hidden="true" />
              </span>

              <span>
                <small className="block font-bold text-slate-500">
                  Email us
                </small>

                <strong className="break-all text-navy-950">
                  {school.email}
                </strong>
              </span>
            </a>

            <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm">
              <span className="grid size-12 place-items-center rounded-xl bg-blue-50 text-royal-600">
                <MapPin aria-hidden="true" />
              </span>

              <span>
                <small className="block font-bold text-slate-500">
                  Visit us
                </small>

                <strong className="text-navy-950">
                  {school.address}
                </strong>
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <form
            onSubmit={submit}
            noValidate
            className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-navy-900/8 sm:p-9"
          >
            <h3 className="font-display text-2xl font-bold text-navy-950">
              Send an Enquiry
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Fields marked with * are required.
            </p>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-bold text-navy-950">
                Parent/Guardian Name *

                <input
                  className={fieldClass}
                  name="name"
                  value={form.name}
                  onChange={update}
                  placeholder="Your full name"
                  autoComplete="name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={
                    errors.name
                      ? 'contact-name-error'
                      : undefined
                  }
                />

                {errors.name && (
                  <span
                    id="contact-name-error"
                    className="mt-1 block text-xs text-red-600"
                  >
                    {errors.name}
                  </span>
                )}
              </label>

              <label className="text-sm font-bold text-navy-950">
                Email Address *

                <input
                  className={fieldClass}
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={update}
                  placeholder="you@example.com"
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={
                    errors.email
                      ? 'contact-email-error'
                      : undefined
                  }
                />

                {errors.email && (
                  <span
                    id="contact-email-error"
                    className="mt-1 block text-xs text-red-600"
                  >
                    {errors.email}
                  </span>
                )}
              </label>

              <label className="text-sm font-bold text-navy-950">
                Phone Number *

                <input
                  className={fieldClass}
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={update}
                  placeholder="+977 98XXXXXXXX"
                  autoComplete="tel"
                  inputMode="tel"
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={
                    errors.phone
                      ? 'contact-phone-error'
                      : undefined
                  }
                />

                {errors.phone && (
                  <span
                    id="contact-phone-error"
                    className="mt-1 block text-xs text-red-600"
                  >
                    {errors.phone}
                  </span>
                )}
              </label>

              <label className="text-sm font-bold text-navy-950">
                Grade of Interest *

                <select
                  className={fieldClass}
                  name="grade"
                  value={form.grade}
                  onChange={update}
                  aria-invalid={Boolean(errors.grade)}
                  aria-describedby={
                    errors.grade
                      ? 'contact-grade-error'
                      : undefined
                  }
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
                </select>

                {errors.grade && (
                  <span
                    id="contact-grade-error"
                    className="mt-1 block text-xs text-red-600"
                  >
                    {errors.grade}
                  </span>
                )}
              </label>
            </div>

            <label className="mt-5 block text-sm font-bold text-navy-950">
              Your Message *

              <textarea
                className={`${fieldClass} min-h-32 resize-y`}
                name="message"
                value={form.message}
                onChange={update}
                placeholder="Tell us how we can help..."
                aria-invalid={Boolean(errors.message)}
                aria-describedby={
                  errors.message
                    ? 'contact-message-error'
                    : undefined
                }
              />

              {errors.message && (
                <span
                  id="contact-message-error"
                  className="mt-1 block text-xs text-red-600"
                >
                  {errors.message}
                </span>
              )}
            </label>

            {submitted && (
              <p
                className="mt-5 flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-sm font-bold text-emerald-700"
                role="status"
                aria-live="polite"
              >
                <CheckCircle2
                  size={18}
                  aria-hidden="true"
                />

                Thank you. Your enquiry has been sent
                successfully.
              </p>
            )}

            {sendError && (
              <p
                className="mt-5 flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700"
                role="alert"
              >
                <AlertCircle
                  size={18}
                  className="mt-0.5 shrink-0"
                  aria-hidden="true"
                />

                {sendError}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-royal-600 px-6 py-4 text-sm font-extrabold text-white shadow-lg shadow-royal-600/20 transition hover:bg-navy-900 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading
                ? 'Sending...'
                : 'Send Enquiry'}

              <Send
                size={17}
                aria-hidden="true"
              />
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}