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
  BadgeCheck,
  BookOpenCheck,
  Bus,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  Download,
  FileCheck2,
  FileText,
  GraduationCap,
  HeartPulse,
  IdCard,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Printer,
  RotateCcw,
  School,
  ShieldCheck,
  Upload,
  UserRound,
  UsersRound,
  X,
} from 'lucide-react';

import {
  admissionFaqs,
  admissionProcessSteps,
  admissionSteps,
  extracurricularOptions,
  genderOptions,
  gradeOptions,
  maximumDocumentSize,
  relationshipOptions,
  requiredAdmissionDocuments,
} from '../../data/admissionData';

import { school } from '../../data/schoolData';

const reveal = {
  hidden: {
    opacity: 0,
    y: 26,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.5,
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

const fieldClass =
  'mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-navy-950 outline-none transition placeholder:text-slate-400 focus:border-royal-500 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100';

function FieldError({
  message,
}) {
  if (!message) {
    return null;
  }

  return (
    <span className="mt-1.5 block text-xs font-semibold text-red-600">
      {message}
    </span>
  );
}

function SectionHeading({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div className="mb-8 flex items-start gap-4">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-blue-50 text-royal-600">
        <Icon
          size={23}
          aria-hidden="true"
        />
      </span>

      <div>
        <h2 className="font-display text-2xl font-bold text-navy-950 sm:text-3xl">
          {title}
        </h2>

        <p className="mt-2 leading-7 text-slate-600">
          {description}
        </p>
      </div>
    </div>
  );
}

function TextInput({
  label,
  name,
  value,
  onChange,
  error,
  required = false,
  type = 'text',
  placeholder = '',
  autoComplete,
  readOnly = false,
  min,
  max,
}) {
  const errorId = `${name}-error`;

  return (
    <label className="block text-sm font-bold text-navy-950">
      {label}
      {required && ' *'}

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        readOnly={readOnly}
        min={min}
        max={max}
        className={fieldClass}
        aria-invalid={Boolean(error)}
        aria-describedby={
          error ? errorId : undefined
        }
      />

      <span id={errorId}>
        <FieldError message={error} />
      </span>
    </label>
  );
}

function SelectInput({
  label,
  name,
  value,
  onChange,
  options,
  error,
  required = false,
  placeholder = 'Select an option',
}) {
  const errorId = `${name}-error`;

  return (
    <label className="block text-sm font-bold text-navy-950">
      {label}
      {required && ' *'}

      <select
        name={name}
        value={value}
        onChange={onChange}
        className={fieldClass}
        aria-invalid={Boolean(error)}
        aria-describedby={
          error ? errorId : undefined
        }
      >
        <option value="">
          {placeholder}
        </option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>

      <span id={errorId}>
        <FieldError message={error} />
      </span>
    </label>
  );
}

function TextAreaInput({
  label,
  name,
  value,
  onChange,
  error,
  required = false,
  placeholder = '',
  rows = 4,
}) {
  const errorId = `${name}-error`;

  return (
    <label className="block text-sm font-bold text-navy-950">
      {label}
      {required && ' *'}

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        className={`${fieldClass} resize-y`}
        aria-invalid={Boolean(error)}
        aria-describedby={
          error ? errorId : undefined
        }
      />

      <span id={errorId}>
        <FieldError message={error} />
      </span>
    </label>
  );
}

function RadioGroup({
  label,
  name,
  value,
  options,
  onChange,
  error,
  required = false,
}) {
  return (
    <fieldset>
      <legend className="text-sm font-bold text-navy-950">
        {label}
        {required && ' *'}
      </legend>

      <div className="mt-3 flex flex-wrap gap-3">
        {options.map((option) => (
          <label
            key={option}
            className={`cursor-pointer rounded-full border px-5 py-3 text-sm font-bold transition ${
              value === option
                ? 'border-royal-600 bg-royal-600 text-white'
                : 'border-slate-200 bg-white text-slate-600 hover:border-royal-500'
            }`}
          >
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={onChange}
              className="sr-only"
            />

            {option}
          </label>
        ))}
      </div>

      <FieldError message={error} />
    </fieldset>
  );
}

function FileUploadField({
  id,
  label,
  description,
  file,
  error,
  onSelect,
  onRemove,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="flex items-start gap-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-royal-600 shadow-sm">
          <FileText
            size={21}
            aria-hidden="true"
          />
        </span>

        <div className="min-w-0 flex-1">
          <label
            htmlFor={id}
            className="font-bold text-navy-950"
          >
            {label}
          </label>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            {description}
          </p>

          {!file ? (
            <label
              htmlFor={id}
              className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-full bg-royal-600 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-navy-950"
            >
              <Upload
                size={17}
                aria-hidden="true"
              />

              Choose File
            </label>
          ) : (
            <div className="mt-4 flex flex-col justify-between gap-3 rounded-xl bg-white p-4 sm:flex-row sm:items-center">
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-navy-950">
                  {file.name}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>

              <button
                type="button"
                onClick={onRemove}
                className="inline-flex items-center gap-2 text-sm font-bold text-red-600"
              >
                <X
                  size={16}
                  aria-hidden="true"
                />

                Remove
              </button>
            </div>
          )}

          <input
            id={id}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(event) => {
              const selectedFile =
                event.target.files?.[0];

              if (selectedFile) {
                onSelect(selectedFile);
              }

              event.target.value = '';
            }}
            className="sr-only"
          />

          <FieldError message={error} />
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------
   Admission Hero
-------------------------------------------------- */

export function AdmissionHero({
  image = '/admission/admission-hero.jpg',
}) {
  return (
    <section className="relative isolate min-h-[600px] overflow-hidden bg-navy-950 text-white">
      <img
        src={image}
        alt={`Admission at ${school.name}`}
        className="absolute inset-0 -z-30 h-full w-full object-cover object-center"
        onError={(event) => {
          event.currentTarget.style.display =
            'none';
        }}
      />

      <div className="absolute inset-0 -z-20 bg-gradient-to-r from-navy-950/95 via-navy-950/82 to-navy-950/35" />

      <div className="section-shell relative z-10 flex min-h-[600px] items-center py-24">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
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
              Apply Now
            </span>
          </motion.nav>

          <motion.span
            variants={reveal}
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-gold-400 px-5 py-2.5 text-sm font-extrabold text-navy-950"
          >
            <BadgeCheck
              size={18}
              aria-hidden="true"
            />

            Admissions Open for{' '}
            {school.admissionSession ||
              '[2026-27]'}
          </motion.span>

          <motion.h1
            variants={reveal}
            className="mt-6 font-display text-5xl font-extrabold leading-tight sm:text-6xl lg:text-7xl"
          >
            Apply for Admission
          </motion.h1>

          <motion.p
            variants={reveal}
            className="mt-6 max-w-3xl text-lg leading-8 text-white/80 sm:text-xl"
          >
            Complete the online application to
            begin your child’s admission process
            at {school.name}. Our admission team
            will review the submitted information
            and contact you.
          </motion.p>

          
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------------------------------
   Admission Information
-------------------------------------------------- */

export function AdmissionInfo() {
  const cards = [
    {
      icon: CalendarDays,
      title: 'Academic Session',
      value:
        school.admissionSession ||
        '2026-27',
    },
    {
      icon: Clock3,
      title: 'Admission Deadline',
      value:
        school.admissionDeadline ||
        '2083-03-01',
    },
    {
      icon: GraduationCap,
      title: 'Classes Open',
      value:
        school.admissionClasses ||
        'Pre-Primary to Grade 10',
    },
    {
      icon: Phone,
      title: 'Admission Contact',
      value:
        school.phone ||
        '[SCHOOL PHONE]',
    },
    {
      icon: School,
      title: 'Office Hours',
      value:
        school.admissionOfficeHours ||
        school.officeHours ||
        '[OFFICE HOURS]',
    },
  ];

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
            Admission information
          </p>

          <h2 className="mt-3 font-display text-4xl font-extrabold text-navy-950 sm:text-5xl">
            Begin the Admission Process
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Review the important admission details
            before completing the online
            application.
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
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        >
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <motion.article
                key={card.title}
                variants={reveal}
                whileHover={{
                  y: -6,
                }}
                className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-xl"
              >
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-blue-50 text-royal-600">
                  <Icon
                    size={24}
                    aria-hidden="true"
                  />
                </span>

                <h3 className="mt-5 font-display text-lg font-bold text-navy-950">
                  {card.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {card.value}
                </p>
              </motion.article>
            );
          })}
        </motion.div>

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
            amount: 0.25,
          }}
          className="mt-10 rounded-[2rem] border border-amber-200 bg-amber-50 p-6 sm:p-8"
        >
          <div className="flex items-start gap-4">
            <ShieldCheck
              className="mt-1 shrink-0 text-amber-700"
              aria-hidden="true"
            />

            <div>
              <h3 className="font-display text-xl font-bold text-navy-950">
                Important Admission Notice
              </h3>

              <p className="mt-2 leading-7 text-slate-700">
                Submitting this application does
                not confirm admission. The school
                will review the application and
                contact the parent or guardian
                regarding the next steps,
                document verification and seat
                availability.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------------------------------
   Progress
-------------------------------------------------- */

export function AdmissionProgress({
  currentStep,
  onStepSelect,
}) {
  return (
    <div className="overflow-x-auto pb-3">
      <ol className="flex min-w-[760px] items-start">
        {admissionSteps.map(
          (step, index) => {
            const completed =
              index < currentStep;

            const active =
              index === currentStep;

            const accessible =
              index <= currentStep;

            return (
              <li
                key={step}
                className="relative flex flex-1 flex-col items-center text-center"
              >
                {index <
                  admissionSteps.length -
                    1 && (
                  <span
                    className={`absolute left-1/2 top-5 h-1 w-full ${
                      index < currentStep
                        ? 'bg-royal-600'
                        : 'bg-slate-200'
                    }`}
                    aria-hidden="true"
                  />
                )}

                <button
                  type="button"
                  onClick={() => {
                    if (accessible) {
                      onStepSelect(index);
                    }
                  }}
                  disabled={!accessible}
                  className="relative z-10"
                  aria-current={
                    active
                      ? 'step'
                      : undefined
                  }
                >
                  <span
                    className={`grid h-11 w-11 place-items-center rounded-full border-4 border-white font-extrabold shadow-sm transition ${
                      completed
                        ? 'bg-royal-600 text-white'
                        : active
                          ? 'bg-gold-400 text-navy-950'
                          : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {completed ? (
                      <Check
                        size={19}
                        aria-hidden="true"
                      />
                    ) : (
                      index + 1
                    )}
                  </span>
                </button>

                <span
                  className={`mt-3 max-w-28 text-xs font-bold leading-5 ${
                    active
                      ? 'text-royal-600'
                      : completed
                        ? 'text-navy-950'
                        : 'text-slate-400'
                  }`}
                >
                  {step}
                </span>
              </li>
            );
          },
        )}
      </ol>
    </div>
  );
}

/* --------------------------------------------------
   Step 1
-------------------------------------------------- */

export function StudentInformationStep({
  form,
  errors,
  onChange,
  studentPhoto,
  studentPhotoError,
  onPhotoSelect,
  onPhotoRemove,
}) {
  return (
    <motion.div
      key="student-step"
      initial={{
        opacity: 0,
        x: 25,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      exit={{
        opacity: 0,
        x: -25,
      }}
    >
      <SectionHeading
        icon={GraduationCap}
        title="Student Information"
        description="Provide the student’s personal details and the class for which admission is requested."
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <TextInput
          label="Student’s Full Name"
          name="studentName"
          value={form.studentName}
          onChange={onChange}
          error={errors.studentName}
          required
          placeholder="Enter student’s full name"
          autoComplete="name"
        />

        <TextInput
          label="Date of Birth"
          name="dateOfBirth"
          type="date"
          value={form.dateOfBirth}
          onChange={onChange}
          error={errors.dateOfBirth}
          required
          max={new Date()
            .toISOString()
            .split('T')[0]}
        />

        <SelectInput
          label="Gender"
          name="gender"
          value={form.gender}
          onChange={onChange}
          options={genderOptions}
          error={errors.gender}
        />

        <SelectInput
          label="Applying Grade or Class"
          name="applyingGrade"
          value={form.applyingGrade}
          onChange={onChange}
          options={gradeOptions}
          error={errors.applyingGrade}
          required
          placeholder="Select applying grade"
        />

        <TextInput
          label="Current Age"
          name="currentAge"
          value={form.currentAge}
          onChange={onChange}
          readOnly
          placeholder="Calculated from date of birth"
        />

        <TextInput
          label="Nationality"
          name="nationality"
          value={form.nationality}
          onChange={onChange}
          error={errors.nationality}
          placeholder="Example: Nepali"
        />
      </div>

      <div className="mt-5">
        <TextAreaInput
          label="Student Address"
          name="studentAddress"
          value={form.studentAddress}
          onChange={onChange}
          error={errors.studentAddress}
          required
          placeholder="Enter the student’s full current address"
        />
      </div>

      <div className="mt-5">
        <FileUploadField
          id="student-main-photo"
          label="Student Photo"
          description="Optional. Upload a clear JPG, JPEG or PNG photo. Maximum file size: 5 MB."
          file={studentPhoto}
          error={studentPhotoError}
          onSelect={onPhotoSelect}
          onRemove={onPhotoRemove}
        />
      </div>
    </motion.div>
  );
}

/* --------------------------------------------------
   Step 2
-------------------------------------------------- */

export function GuardianInformationStep({
  form,
  errors,
  onChange,
}) {
  return (
    <motion.div
      key="guardian-step"
      initial={{
        opacity: 0,
        x: 25,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      exit={{
        opacity: 0,
        x: -25,
      }}
    >
      <SectionHeading
        icon={UsersRound}
        title="Parent or Guardian Information"
        description="Enter the contact details of the parent or guardian responsible for the application."
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <TextInput
          label="Parent or Guardian Full Name"
          name="guardianName"
          value={form.guardianName}
          onChange={onChange}
          error={errors.guardianName}
          required
          placeholder="Enter full name"
          autoComplete="name"
        />

        <SelectInput
          label="Relationship With Student"
          name="relationship"
          value={form.relationship}
          onChange={onChange}
          options={relationshipOptions}
          error={errors.relationship}
          placeholder="Select relationship"
        />

        <TextInput
          label="Phone Number"
          name="guardianPhone"
          type="tel"
          value={form.guardianPhone}
          onChange={onChange}
          error={errors.guardianPhone}
          required
          placeholder="+977 98XXXXXXXX"
          autoComplete="tel"
        />

        <TextInput
          label="Alternative Phone Number"
          name="alternativePhone"
          type="tel"
          value={form.alternativePhone}
          onChange={onChange}
          error={errors.alternativePhone}
          placeholder="Optional alternative number"
        />

        <TextInput
          label="Email Address"
          name="guardianEmail"
          type="email"
          value={form.guardianEmail}
          onChange={onChange}
          error={errors.guardianEmail}
          required
          placeholder="parent@example.com"
          autoComplete="email"
        />

        <TextInput
          label="Occupation"
          name="occupation"
          value={form.occupation}
          onChange={onChange}
          error={errors.occupation}
          placeholder="Parent or guardian occupation"
        />

        <TextInput
          label="WhatsApp Number"
          name="guardianWhatsapp"
          type="tel"
          value={form.guardianWhatsapp}
          onChange={onChange}
          error={errors.guardianWhatsapp}
          placeholder="+977 98XXXXXXXX"
        />
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <TextAreaInput
          label="Permanent Address"
          name="permanentAddress"
          value={form.permanentAddress}
          onChange={onChange}
          error={errors.permanentAddress}
          placeholder="Enter permanent address"
        />

        <TextAreaInput
          label="Current Address"
          name="currentAddress"
          value={form.currentAddress}
          onChange={onChange}
          error={errors.currentAddress}
          required
          placeholder="Enter current residential address"
        />
      </div>
    </motion.div>
  );
}

/* --------------------------------------------------
   Step 3
-------------------------------------------------- */

export function AcademicInformationStep({
  form,
  errors,
  onChange,
}) {
  return (
    <motion.div
      key="academic-step"
      initial={{
        opacity: 0,
        x: 25,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      exit={{
        opacity: 0,
        x: -25,
      }}
    >
      <SectionHeading
        icon={BookOpenCheck}
        title="Academic Information"
        description="Tell us about the student’s previous school and academic background."
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <TextInput
          label="Previous School Name"
          name="previousSchool"
          value={form.previousSchool}
          onChange={onChange}
          error={errors.previousSchool}
          placeholder="Enter previous school name"
        />

        <TextInput
          label="Previous Grade or Class"
          name="previousGrade"
          value={form.previousGrade}
          onChange={onChange}
          error={errors.previousGrade}
          placeholder="Example: Grade 5"
        />

        <TextInput
          label="Last Examination Result or Percentage"
          name="lastResult"
          value={form.lastResult}
          onChange={onChange}
          error={errors.lastResult}
          placeholder="Example: 78% or Grade A"
        />
      </div>

      <div className="mt-5">
        <TextAreaInput
          label="Reason for Leaving Previous School"
          name="reasonForLeaving"
          value={form.reasonForLeaving}
          onChange={onChange}
          error={errors.reasonForLeaving}
          placeholder="Briefly explain the reason"
        />
      </div>

      <div className="mt-5">
        <RadioGroup
          label={`Has the student previously studied at ${school.name}?`}
          name="studiedBefore"
          value={form.studiedBefore}
          options={['Yes', 'No']}
          onChange={onChange}
          error={errors.studiedBefore}
        />
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <TextAreaInput
          label="Academic Strengths"
          name="academicStrengths"
          value={form.academicStrengths}
          onChange={onChange}
          error={errors.academicStrengths}
          placeholder="Subjects or learning areas in which the student performs well"
        />

        <TextAreaInput
          label="Subjects Needing Additional Support"
          name="subjectsNeedingSupport"
          value={form.subjectsNeedingSupport}
          onChange={onChange}
          error={errors.subjectsNeedingSupport}
          placeholder="Mention subjects in which extra support may be helpful"
        />
      </div>
    </motion.div>
  );
}

/* --------------------------------------------------
   Step 4
-------------------------------------------------- */

export function AdditionalInformationStep({
  form,
  errors,
  onChange,
  onToggleInterest,
}) {
  return (
    <motion.div
      key="additional-step"
      initial={{
        opacity: 0,
        x: 25,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      exit={{
        opacity: 0,
        x: -25,
      }}
    >
      <SectionHeading
        icon={HeartPulse}
        title="Additional Information"
        description="Provide transportation, health, learning and extracurricular information."
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <RadioGroup
          label="Is School Transportation Required?"
          name="transportationRequired"
          value={form.transportationRequired}
          options={['Yes', 'No']}
          onChange={onChange}
          error={errors.transportationRequired}
        />

        <RadioGroup
          label="Is a Sibling Currently Studying at the School?"
          name="siblingAtSchool"
          value={form.siblingAtSchool}
          options={['Yes', 'No']}
          onChange={onChange}
          error={errors.siblingAtSchool}
        />
      </div>

      {form.transportationRequired ===
        'Yes' && (
        <div className="mt-5">
          <TextInput
            label="Preferred Transport Location or Route"
            name="preferredRoute"
            value={form.preferredRoute}
            onChange={onChange}
            error={errors.preferredRoute}
            placeholder="Enter preferred pickup area or route"
          />
        </div>
      )}

      {form.siblingAtSchool === 'Yes' && (
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <TextInput
            label="Sibling Name"
            name="siblingName"
            value={form.siblingName}
            onChange={onChange}
            error={errors.siblingName}
            placeholder="Enter sibling’s name"
          />

          <TextInput
            label="Sibling Class"
            name="siblingClass"
            value={form.siblingClass}
            onChange={onChange}
            error={errors.siblingClass}
            placeholder="Example: Grade 6"
          />
        </div>
      )}

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <TextAreaInput
          label="Medical Condition or Allergy"
          name="medicalCondition"
          value={form.medicalCondition}
          onChange={onChange}
          error={errors.medicalCondition}
          placeholder="Mention any condition, allergy or medicine the school should know about"
        />

        <TextAreaInput
          label="Special Learning Requirement"
          name="specialLearningRequirement"
          value={form.specialLearningRequirement}
          onChange={onChange}
          error={errors.specialLearningRequirement}
          placeholder="Mention any learning support requirement"
        />
      </div>

      <fieldset className="mt-6">
        <legend className="text-sm font-bold text-navy-950">
          Extracurricular Interests
        </legend>

        <div className="mt-3 flex flex-wrap gap-3">
          {extracurricularOptions.map(
            (interest) => {
              const selected =
                form.extracurricularInterests.includes(
                  interest,
                );

              return (
                <label
                  key={interest}
                  className={`cursor-pointer rounded-full border px-4 py-2.5 text-sm font-bold transition ${
                    selected
                      ? 'border-royal-600 bg-royal-600 text-white'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-royal-500'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={() =>
                      onToggleInterest(
                        interest,
                      )
                    }
                    className="sr-only"
                  />

                  {interest}
                </label>
              );
            },
          )}
        </div>
      </fieldset>

      <div className="mt-6">
        <TextAreaInput
          label="Additional Message"
          name="additionalMessage"
          value={form.additionalMessage}
          onChange={onChange}
          error={errors.additionalMessage}
          placeholder="Add any other information you would like the admission team to know"
          rows={5}
        />
      </div>
    </motion.div>
  );
}

/* --------------------------------------------------
   Step 5
-------------------------------------------------- */

export function DocumentUploadStep({
  files,
  fileErrors,
  onSelect,
  onRemove,
}) {
  const uploadFields = [
    {
      key: 'birthCertificate',
      label: 'Birth Certificate',
    },
    {
      key: 'reportCard',
      label: 'Previous School Report Card',
    },
    {
      key: 'transferCertificate',
      label: 'Transfer Certificate',
    },
    {
      key: 'passportPhoto',
      label: 'Student Passport-Size Photo',
    },
    {
      key: 'guardianIdentification',
      label:
        'Parent or Guardian Identification',
    },
  ];

  return (
    <motion.div
      key="documents-step"
      initial={{
        opacity: 0,
        x: 25,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      exit={{
        opacity: 0,
        x: -25,
      }}
    >
      <SectionHeading
        icon={FileCheck2}
        title="Document Uploads"
        description="Upload available documents now or provide them later when requested by the school."
      />

      <div className="mb-6 rounded-2xl border border-blue-200 bg-blue-50 p-5 text-sm leading-7 text-slate-700">
        <strong className="text-navy-950">
          Accepted files:
        </strong>{' '}
        PDF, JPG, JPEG and PNG. Maximum file
        size: 5 MB per document. Uploaded files
        cannot be restored after a page refresh,
        so they must be selected again before
        submission.
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {uploadFields.map((field) => (
          <FileUploadField
            key={field.key}
            id={`admission-${field.key}`}
            label={field.label}
            description="Optional document. PDF, JPG, JPEG or PNG, maximum 5 MB."
            file={files[field.key]}
            error={fileErrors[field.key]}
            onSelect={(file) =>
              onSelect(field.key, file)
            }
            onRemove={() =>
              onRemove(field.key)
            }
          />
        ))}
      </div>
    </motion.div>
  );
}

/* --------------------------------------------------
   Review helpers
-------------------------------------------------- */

function ReviewItem({
  label,
  value,
}) {
  const displayedValue =
    Array.isArray(value)
      ? value.length
        ? value.join(', ')
        : 'Not provided'
      : value || 'Not provided';

  return (
    <div className="border-b border-slate-100 py-3 last:border-b-0">
      <dt className="text-xs font-extrabold uppercase tracking-wide text-slate-400">
        {label}
      </dt>

      <dd className="mt-1 break-words font-semibold text-slate-700">
        {displayedValue}
      </dd>
    </div>
  );
}

function ReviewSection({
  title,
  icon: Icon,
  onEdit,
  children,
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-royal-600 shadow-sm">
            <Icon
              size={19}
              aria-hidden="true"
            />
          </span>

          <h3 className="font-display text-xl font-bold text-navy-950">
            {title}
          </h3>
        </div>

        <button
          type="button"
          onClick={onEdit}
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-extrabold text-royal-600 transition hover:border-royal-500"
        >
          Edit
        </button>
      </div>

      <dl className="mt-4">
        {children}
      </dl>
    </section>
  );
}

/* --------------------------------------------------
   Step 6
-------------------------------------------------- */

export function ApplicationReviewStep({
  form,
  files,
  errors,
  onChange,
  onEdit,
  onSubmitRequest,
}) {
  return (
    <motion.div
      key="review-step"
      initial={{
        opacity: 0,
        x: 25,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      exit={{
        opacity: 0,
        x: -25,
      }}
    >
      <SectionHeading
        icon={ClipboardCheck}
        title="Review and Submit"
        description="Review all information carefully before submitting the application."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <ReviewSection
          title="Student Information"
          icon={GraduationCap}
          onEdit={() => onEdit(0)}
        >
          <ReviewItem
            label="Student Name"
            value={form.studentName}
          />

          <ReviewItem
            label="Date of Birth"
            value={form.dateOfBirth}
          />

          <ReviewItem
            label="Gender"
            value={form.gender}
          />

          <ReviewItem
            label="Applying Grade"
            value={form.applyingGrade}
          />

          <ReviewItem
            label="Current Age"
            value={form.currentAge}
          />

          <ReviewItem
            label="Nationality"
            value={form.nationality}
          />

          <ReviewItem
            label="Student Address"
            value={form.studentAddress}
          />
        </ReviewSection>

        <ReviewSection
          title="Parent or Guardian"
          icon={UsersRound}
          onEdit={() => onEdit(1)}
        >
          <ReviewItem
            label="Guardian Name"
            value={form.guardianName}
          />

          <ReviewItem
            label="Relationship"
            value={form.relationship}
          />

          <ReviewItem
            label="Phone"
            value={form.guardianPhone}
          />

          <ReviewItem
            label="Alternative Phone"
            value={form.alternativePhone}
          />

          <ReviewItem
            label="Email"
            value={form.guardianEmail}
          />

          <ReviewItem
            label="WhatsApp"
            value={form.guardianWhatsapp}
          />

          <ReviewItem
            label="Current Address"
            value={form.currentAddress}
          />
        </ReviewSection>

        <ReviewSection
          title="Academic Information"
          icon={BookOpenCheck}
          onEdit={() => onEdit(2)}
        >
          <ReviewItem
            label="Previous School"
            value={form.previousSchool}
          />

          <ReviewItem
            label="Previous Grade"
            value={form.previousGrade}
          />

          <ReviewItem
            label="Last Result"
            value={form.lastResult}
          />

          <ReviewItem
            label="Studied Here Before"
            value={form.studiedBefore}
          />

          <ReviewItem
            label="Academic Strengths"
            value={form.academicStrengths}
          />

          <ReviewItem
            label="Subjects Needing Support"
            value={
              form.subjectsNeedingSupport
            }
          />
        </ReviewSection>

        <ReviewSection
          title="Additional Information"
          icon={HeartPulse}
          onEdit={() => onEdit(3)}
        >
          <ReviewItem
            label="Transportation Required"
            value={
              form.transportationRequired
            }
          />

          <ReviewItem
            label="Preferred Route"
            value={form.preferredRoute}
          />

          <ReviewItem
            label="Medical Information"
            value={form.medicalCondition}
          />

          <ReviewItem
            label="Special Learning Requirement"
            value={
              form.specialLearningRequirement
            }
          />

          <ReviewItem
            label="Sibling at School"
            value={form.siblingAtSchool}
          />

          <ReviewItem
            label="Extracurricular Interests"
            value={
              form.extracurricularInterests
            }
          />
        </ReviewSection>

        <div className="lg:col-span-2">
          <ReviewSection
            title="Uploaded Documents"
            icon={FileCheck2}
            onEdit={() => onEdit(4)}
          >
            {Object.entries(files).map(
              ([key, file]) => (
                <ReviewItem
                  key={key}
                  label={key
                    .replace(
                      /([A-Z])/g,
                      ' $1',
                    )
                    .replace(/^./, (letter) =>
                      letter.toUpperCase(),
                    )}
                  value={
                    file
                      ? file.name
                      : 'Not uploaded'
                  }
                />
              ),
            )}
          </ReviewSection>
        </div>
      </div>

      <div className="mt-7 space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            name="declarationAccepted"
            checked={
              form.declarationAccepted
            }
            onChange={onChange}
            className="mt-1 h-5 w-5 rounded border-slate-300 text-royal-600 focus:ring-royal-500"
          />

          <span className="text-sm leading-7 text-slate-700">
            I confirm that the information
            provided in this application is
            accurate. I understand that submitting
            this form does not guarantee admission
            and that the school may contact me for
            further verification.
          </span>
        </label>

        <FieldError
          message={
            errors.declarationAccepted
          }
        />

        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            name="privacyConsent"
            checked={form.privacyConsent}
            onChange={onChange}
            className="mt-1 h-5 w-5 rounded border-slate-300 text-royal-600 focus:ring-royal-500"
          />

          <span className="text-sm leading-7 text-slate-700">
            I consent to the school storing and
            reviewing this information for the
            purpose of processing the admission
            application.
          </span>
        </label>

        <FieldError
          message={errors.privacyConsent}
        />
      </div>

      <button
        type="button"
        onClick={onSubmitRequest}
        className="mt-7 inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full bg-royal-600 px-7 font-extrabold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-navy-950"
      >
        Submit Application

        <ArrowRight
          size={18}
          aria-hidden="true"
        />
      </button>
    </motion.div>
  );
}

/* --------------------------------------------------
   Navigation buttons
-------------------------------------------------- */

export function AdmissionNavigation({
  currentStep,
  onPrevious,
  onNext,
  onReset,
  loading,
}) {
  const finalStep =
    currentStep ===
    admissionSteps.length - 1;

  return (
    <div className="mt-8 flex flex-col-reverse justify-between gap-4 border-t border-slate-200 pt-6 sm:flex-row">
      <div className="flex flex-col gap-3 sm:flex-row">
        {currentStep > 0 && (
          <button
            type="button"
            onClick={onPrevious}
            disabled={loading}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-slate-300 px-6 font-extrabold text-navy-950 transition hover:border-royal-500 hover:text-royal-600 disabled:opacity-60"
          >
            <ChevronLeft
              size={18}
              aria-hidden="true"
            />

            Previous
          </button>
        )}

        <button
          type="button"
          onClick={onReset}
          disabled={loading}
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full px-5 text-sm font-extrabold text-slate-500 transition hover:bg-slate-100 hover:text-red-600 disabled:opacity-60"
        >
          <RotateCcw
            size={17}
            aria-hidden="true"
          />

          Reset Form
        </button>
      </div>

      {!finalStep && (
        <button
          type="button"
          onClick={onNext}
          disabled={loading}
          className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full bg-navy-950 px-7 font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-royal-600 disabled:opacity-60"
        >
          Next Step

          <ChevronRight
            size={18}
            aria-hidden="true"
          />
        </button>
      )}
    </div>
  );
}

/* --------------------------------------------------
   Confirmation modal
-------------------------------------------------- */

export function AdmissionConfirmationModal({
  open,
  studentName,
  applyingGrade,
  loading,
  onClose,
  onConfirm,
}) {
  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (
        event.key === 'Escape' &&
        !loading
      ) {
        onClose();
      }
    };

    document.body.style.overflow =
      'hidden';

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
  }, [open, loading, onClose]);

  return (
    <AnimatePresence>
      {open && (
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
          onClick={() => {
            if (!loading) {
              onClose();
            }
          }}
          className="fixed inset-0 z-[150] flex items-center justify-center bg-navy-950/90 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="admission-confirm-title"
        >
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
            className="w-full max-w-lg rounded-[2rem] bg-white p-7 shadow-2xl sm:p-9"
          >
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-blue-50 text-royal-600">
              <ClipboardCheck
                size={27}
                aria-hidden="true"
              />
            </span>

            <h2
              id="admission-confirm-title"
              className="mt-6 font-display text-3xl font-bold text-navy-950"
            >
              Confirm Application Submission
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              You are about to submit the
              admission application for{' '}
              <strong className="text-navy-950">
                {studentName}
              </strong>{' '}
              for{' '}
              <strong className="text-navy-950">
                {applyingGrade}
              </strong>
              .
            </p>

            <p className="mt-3 leading-7 text-slate-600">
              Please confirm that you have
              reviewed the information carefully.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={onConfirm}
                disabled={loading}
                className="inline-flex min-h-[50px] flex-1 items-center justify-center gap-2 rounded-full bg-royal-600 px-6 font-extrabold text-white transition hover:bg-navy-950 disabled:cursor-not-allowed disabled:opacity-65"
              >
                {loading
                  ? 'Submitting...'
                  : 'Confirm and Submit'}
              </button>

              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="inline-flex min-h-[50px] flex-1 items-center justify-center rounded-full border border-slate-300 px-6 font-extrabold text-navy-950 transition hover:bg-slate-100 disabled:opacity-65"
              >
                Review Again
              </button>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* --------------------------------------------------
   Success
-------------------------------------------------- */

export function AdmissionSuccess({
  result,
  onPrint,
  onDownload,
  onNewApplication,
}) {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="rounded-[2.25rem] border border-emerald-200 bg-white p-7 text-center shadow-xl sm:p-12"
    >
      <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-100 text-emerald-600">
        <CheckCircle2
          size={39}
          aria-hidden="true"
        />
      </span>

      <p className="mt-7 text-sm font-extrabold uppercase tracking-[0.2em] text-emerald-600">
        Application received
      </p>

      <h2 className="mt-3 font-display text-4xl font-extrabold text-navy-950 sm:text-5xl">
        Application Submitted Successfully
      </h2>

      <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
        Our admission team will review your
        application and contact you using the
        phone number or email address provided.
      </p>

      <div className="mx-auto mt-9 grid max-w-3xl gap-4 rounded-[2rem] bg-slate-50 p-6 text-left sm:grid-cols-2">
        <ReviewItem
          label="Student Name"
          value={result.studentName}
        />

        <ReviewItem
          label="Applying Class"
          value={result.applyingGrade}
        />

        <ReviewItem
          label="Application Reference"
          value={result.referenceNumber}
        />

        <ReviewItem
          label="Submission Date"
          value={result.submissionDate}
        />

        <ReviewItem
          label="School Phone"
          value={school.phone}
        />

        <ReviewItem
          label="School Email"
          value={school.email}
        />
      </div>

      <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
        <button
          type="button"
          onClick={onPrint}
          className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full bg-navy-950 px-6 font-extrabold text-white transition hover:bg-royal-600"
        >
          <Printer
            size={18}
            aria-hidden="true"
          />

          Print Application
        </button>

        <button
          type="button"
          onClick={onDownload}
          className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full border border-slate-300 px-6 font-extrabold text-navy-950 transition hover:border-gold-400 hover:bg-gold-400"
        >
          <Download
            size={18}
            aria-hidden="true"
          />

          Download Summary
        </button>

        <a
          href="/"
          className="inline-flex min-h-[50px] items-center justify-center rounded-full border border-slate-300 px-6 font-extrabold text-navy-950 transition hover:bg-slate-100"
        >
          Return to Home
        </a>

        <a
          href="/contact"
          className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full bg-royal-600 px-6 font-extrabold text-white transition hover:bg-navy-950"
        >
          Contact Admission Office
        </a>
      </div>

      <button
        type="button"
        onClick={onNewApplication}
        className="mt-7 text-sm font-extrabold text-royal-600 hover:text-navy-950"
      >
        Start Another Application
      </button>
    </motion.section>
  );
}

/* --------------------------------------------------
   Admission process
-------------------------------------------------- */

export function AdmissionProcess() {
  const icons = [
    FileText,
    ClipboardCheck,
    UsersRound,
    BadgeCheck,
  ];

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
            What happens next
          </p>

          <h2 className="mt-3 font-display text-4xl font-extrabold text-navy-950 sm:text-5xl">
            Admission Process
          </h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.08,
          }}
          className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4"
        >
          {admissionProcessSteps.map(
            (step, index) => {
              const Icon = icons[index];

              return (
                <motion.article
                  key={step.id}
                  variants={reveal}
                  whileHover={{
                    y: -6,
                  }}
                  className="relative rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition-shadow hover:shadow-xl"
                >
                  <span className="absolute right-6 top-5 font-display text-5xl font-extrabold text-slate-100">
                    0{step.id}
                  </span>

                  <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-blue-50 text-royal-600">
                    <Icon
                      size={25}
                      aria-hidden="true"
                    />
                  </span>

                  <h3 className="relative mt-6 font-display text-2xl font-bold text-navy-950">
                    {step.title}
                  </h3>

                  <p className="relative mt-4 leading-7 text-slate-600">
                    {step.description}
                  </p>
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
   Required documents
-------------------------------------------------- */

export function RequiredDocuments() {
  const icons = [
    FileText,
    BookOpenCheck,
    FileCheck2,
    UserRound,
    IdCard,
    ClipboardCheck,
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
            amount: 0.25,
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-royal-600">
            Prepare in advance
          </p>

          <h2 className="mt-3 font-display text-4xl font-extrabold text-navy-950 sm:text-5xl">
            Required Documents
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Document requirements may vary
            depending on the student’s applying
            grade and previous academic history.
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
          {requiredAdmissionDocuments.map(
            (document, index) => {
              const Icon = icons[index];

              return (
                <motion.article
                  key={document.id}
                  variants={reveal}
                  whileHover={{
                    y: -5,
                  }}
                  className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg"
                >
                  <span className="grid h-14 w-13 place-items-center rounded-2xl bg-blue-50 text-royal-600">
                    <Icon
                      size={23}
                      aria-hidden="true"
                    />
                  </span>

                  <h3 className="mt-5 font-display text-xl font-bold text-navy-950">
                    {document.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    {document.description}
                  </p>
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
   Admission help
-------------------------------------------------- */

export function AdmissionHelp() {
  const phoneNumber = String(
    school.phone || '',
  ).replace(/[^\d+]/g, '');

  const whatsappNumber = String(
    school.whatsapp || '',
  ).replace(/\D/g, '');

  return (
    <section className="bg-navy-950 py-20 text-white">
      <div className="section-shell grid items-center gap-10 lg:grid-cols-[1fr_auto]">
        <motion.div
          initial={{
            opacity: 0,
            x: -25,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
        >
          <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-gold-400">
            Admission assistance
          </p>

          <h2 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">
            Need Help With Your Application?
          </h2>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <p className="flex items-center gap-3 text-white/75">
              <Phone
                size={19}
                className="text-gold-400"
                aria-hidden="true"
              />

              {school.phone}
            </p>

            <p className="flex items-center gap-3 text-white/75">
              <Mail
                size={19}
                className="text-gold-400"
                aria-hidden="true"
              />

              {school.email}
            </p>

            <p className="flex items-center gap-3 text-white/75">
              <MessageCircle
                size={19}
                className="text-gold-400"
                aria-hidden="true"
              />

              {school.whatsappDisplay ||
                school.whatsapp}
            </p>

            <p className="flex items-center gap-3 text-white/75">
              <Clock3
                size={19}
                className="text-gold-400"
                aria-hidden="true"
              />

              {school.admissionOfficeHours ||
                school.officeHours}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            x: 25,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          className="flex flex-col gap-3"
        >
          <a
            href={`tel:${phoneNumber}`}
            className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full bg-gold-400 px-7 font-extrabold text-navy-950 transition hover:bg-white"
          >
            <Phone
              size={18}
              aria-hidden="true"
            />

            Call Admission Office
          </a>

          {whatsappNumber && (
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full border border-white/25 px-7 font-extrabold text-white transition hover:bg-white hover:text-navy-950"
            >
              <MessageCircle
                size={18}
                aria-hidden="true"
              />

              Chat on WhatsApp
            </a>
          )}

          <a
            href={
              school.mapLink ||
              '[GOOGLE MAPS LOCATION LINK]'
            }
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full border border-white/25 px-7 font-extrabold text-white transition hover:bg-white hover:text-navy-950"
          >
            <MapPin
              size={18}
              aria-hidden="true"
            />

            Visit School
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------------------------------
   FAQ
-------------------------------------------------- */

export function AdmissionFAQ() {
  const [openId, setOpenId] =
    useState(admissionFaqs[0]?.id);

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="section-shell grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.25,
          }}
        >
          <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-royal-600">
            Admission support
          </p>

          <h2 className="mt-3 font-display text-4xl font-extrabold text-navy-950 sm:text-5xl">
            Frequently Asked Questions
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Find answers to common questions
            about admission, documents,
            assessments, transportation and
            application submission.
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
          {admissionFaqs.map((faq) => {
            const open =
              openId === faq.id;

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
                      open
                        ? null
                        : faq.id,
                    )
                  }
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left"
                >
                  <span className="font-display text-lg font-bold text-navy-950 sm:text-xl">
                    {faq.question}
                  </span>

                  <ChevronDown
                    size={21}
                    className={`shrink-0 text-royal-600 transition-transform ${
                      open
                        ? 'rotate-180'
                        : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>

                <AnimatePresence initial={false}>
                  {open && (
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

export {
  fieldClass,
  maximumDocumentSize,
};