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
 
];

export const departmentContacts = [
  {
    id: 1,
    icon: 'admission',
    department: 'Admission Office',
    description:
      'Admission forms, entrance procedures, grade availability and school visits.',
    phone: '01-4375515',
    email: 'shishu2049@gmail.com',
    hours: 'Sun–Fri: 8:00 AM–4:30 PM',
  },
  {
    id: 2,
    icon: 'administration',
    department: 'Administration',
    description:
      'General enquiries, official documents, certificates and school administration.',
    phone: '9801319264',
    email: 'shishu2049@gmail.com',
    hours: 'Sun–Fri: 8:00 AM–4:30 PM',
  },
  {
    id: 3,
    icon: 'accounts',
    department: 'Accounts Department',
    description:
      'School fees, payment records, receipts and financial enquiries.',
    phone: '01-15128064',
    email: 'shishu2049@gmail.com',
    hours: 'Sun–Fri: 8:00 AM–4:30 PM',
  },
  {
    id: 4,
    icon: 'academic',
    department: 'Academic Department',
    description:
      'Curriculum, examinations, academic progress and student support.',
    phone: '9841660714',
    email: 'shishu2049@gmail.com',
    hours: 'Sun–Fri: 8:00 AM–4:30 PM',
  },
  {
    id: 5,
    icon: 'transport',
    department: 'Transportation Department',
    description:
      'School bus routes, pickup points, schedules and transportation safety.',
    phone: '9823425573',
    email: 'shishu2049@gnail.com',
    hours: 'Sun–Fri: 8:00 AM–4:30 PM',
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

export const socialLinks = [
  {
    name: 'Facebook',
    icon: 'facebook',
    href: 'https://www.facebook.com/share/19P2umYQPi/?mibextid=wwXIfr',
  },
  {
    name: 'TikTok',
    icon: 'tiktok',
    href: 'https://www.tiktok.com/@shishu.milan.engl',
  },
  {
    name: 'Instagram',
    icon: 'instagram',
    href: 'https://www.instagram.com/shishumilanenglishschool2049?igsh=MW43enZjankzZDdtZA%3D%3D&utm_source=qr',
  },
  {
    name: 'LinkedIn',
    icon: 'linkedin',
    href: 'https://www.linkedin.com/company/shishu-milan-english-school/?viewAsMember=true',
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