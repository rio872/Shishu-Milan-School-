import { school } from './schoolData';

const phoneLink = String(
  school.phone || '',
).replace(/[^\d+]/g, '');

const whatsappNumber = String(
  school.whatsapp || '',
).replace(/\D/g, '');

export const contactInfoCards = [
  {
    id: 1,
    icon: 'address',
    title: 'School Address',
    detail:
      school.address || '[FULL SCHOOL ADDRESS]',
    subtext:
      school.landmark || '[NEARBY LANDMARK]',
    href:
      school.mapLink ||
      '[GOOGLE MAPS LOCATION LINK]',
    linkText: 'View location',
  },
  {
    id: 2,
    icon: 'phone',
    title: 'Phone Number',
    detail:
      school.phone || '[SCHOOL PHONE]',
    subtext:
      'Call the school administration',
    href: `tel:${phoneLink}`,
    linkText: 'Call now',
  },
  {
    id: 3,
    icon: 'email',
    title: 'Email Address',
    detail:
      school.email || '[SCHOOL EMAIL]',
    subtext:
      'Send us your questions by email',
    href: `mailto:${school.email || ''}`,
    linkText: 'Send email',
  },
  {
    id: 4,
    icon: 'hours',
    title: 'Office Hours',
    detail:
      school.officeHours || '[OFFICE HOURS]',
    subtext:
      'Closed on public holidays',
    href: '',
    linkText: '',
  },
  {
    id: 5,
    icon: 'whatsapp',
    title: 'WhatsApp',
    detail:
      school.whatsappDisplay ||
      school.whatsapp ||
      '[WHATSAPP NUMBER]',
    subtext:
      'Chat with the school office',
    href: whatsappNumber
      ? `https://wa.me/${whatsappNumber}`
      : '',
    linkText: 'Chat now',
  },
];

export const departmentContacts = [
  {
    id: 1,
    icon: 'admission',
    department: 'Admission Office',
    description:
      'Admission forms, entrance procedures, grade availability and school visits.',
    phone:
      school.phone || '[SCHOOL PHONE]',
    email:
      school.email || '[SCHOOL EMAIL]',
    hours:
      school.officeHours || '[OFFICE HOURS]',
  },
  {
    id: 2,
    icon: 'administration',
    department: 'Administration',
    description:
      'General enquiries, official documents, certificates and school administration.',
    phone:
      school.phone || '[SCHOOL PHONE]',
    email:
      school.email || '[SCHOOL EMAIL]',
    hours:
      school.officeHours || '[OFFICE HOURS]',
  },
  {
    id: 3,
    icon: 'accounts',
    department: 'Accounts Department',
    description:
      'School fees, payment records, receipts and financial enquiries.',
    phone:
      school.phone || '[SCHOOL PHONE]',
    email:
      school.email || '[SCHOOL EMAIL]',
    hours:
      school.officeHours || '[OFFICE HOURS]',
  },
  {
    id: 4,
    icon: 'academic',
    department: 'Academic Department',
    description:
      'Curriculum, examinations, academic progress and student learning support.',
    phone:
      school.phone || '[SCHOOL PHONE]',
    email:
      school.email || '[SCHOOL EMAIL]',
    hours:
      school.officeHours || '[OFFICE HOURS]',
  },
  {
    id: 5,
    icon: 'transport',
    department: 'Transportation Department',
    description:
      'School bus routes, pickup points, transportation schedules and safety.',
    phone:
      school.phone || '[SCHOOL PHONE]',
    email:
      school.email || '[SCHOOL EMAIL]',
    hours:
      school.officeHours || '[OFFICE HOURS]',
  },
];

export const contactFaqs = [
  {
    id: 1,
    question:
      'How can I apply for admission?',
    answer:
      'Parents or guardians can visit the school administration office, contact the admission department or submit an enquiry through this page. The school team will explain grade availability, required documents and the admission process.',
  },
  {
    id: 2,
    question:
      'What documents are required for admission?',
    answer:
      'The usual documents include a completed admission form, birth certificate, recent passport-size photographs, previous academic report and transfer certificate when applicable. Requirements may differ according to the student’s grade.',
  },
  {
    id: 3,
    question:
      'What are the school office hours?',
    answer:
      school.officeHours
        ? `The school office is generally open during ${school.officeHours}. Office hours may change during public holidays, examinations or special school programs.`
        : 'Please contact the school directly to confirm the current office hours.',
  },
  {
    id: 4,
    question:
      'Does the school provide transportation?',
    answer:
      'School transportation may be available for selected routes and pickup locations. Parents should contact the transportation department to confirm route availability, schedules and fees.',
  },
  {
    id: 5,
    question:
      'How can I contact a teacher?',
    answer:
      'Parents may contact the school administration or academic department to request communication with a class teacher or subject teacher. Teacher meetings should normally be arranged in advance.',
  },
  {
    id: 6,
    question:
      'Where is the school located?',
    answer: `${
      school.name || '[SCHOOL NAME]'
    } is located at ${
      school.address ||
      '[FULL SCHOOL ADDRESS]'
    }. ${
      school.landmark
        ? `The nearby landmark is ${school.landmark}.`
        : 'Use the Google Maps direction button on this page for navigation.'
    }`,
  },
];

export const socialMediaLinks = [
  {
    id: 1,
    name: 'Facebook',
    icon: 'facebook',
    href:
      school.socialLinks?.facebook ||
      school.facebook ||
      '[FACEBOOK LINK]',
  },
  {
    id: 2,
    name: 'TikTok',
    icon: 'tiktok',
    href:
      school.socialLinks?.tiktok ||
      school.tiktok ||
      '[TIKTOK LINK]',
  },
  {
    id: 3,
    name: 'Instagram',
    icon: 'instagram',
    href:
      school.socialLinks?.instagram ||
      school.instagram ||
      '[INSTAGRAM LINK]',
  },
  {
    id: 4,
    name: 'LinkedIn',
    icon: 'linkedin',
    href:
      school.socialLinks?.linkedin ||
      school.linkedin ||
      '[LINKEDIN LINK]',
  },
];

export const enquirySubjects = [
  'Admission Enquiry',
  'Academic Information',
  'School Fees',
  'Transportation',
  'School Visit',
  'Examination and Results',
  'General Enquiry',
];