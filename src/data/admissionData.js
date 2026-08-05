export const admissionSteps = [
  'Student Information',
  'Parent or Guardian',
  'Academic Information',
  'Additional Information',
  'Document Uploads',
  'Review and Submit',
];

export const gradeOptions = [
  'Nursery',
  'LKG',
  'UKG',
  'Grade 1',
  'Grade 2',
  'Grade 3',
  'Grade 4',
  'Grade 5',
  'Grade 6',
  'Grade 7',
  'Grade 8',
  'Grade 9',
  'Grade 10',
];

export const genderOptions = [
  'Male',
  'Female',
  'Other',
  'Prefer not to say',
];

export const relationshipOptions = [
  'Father',
  'Mother',
  'Guardian',
  'Grandparent',
  'Brother',
  'Sister',
  'Other',
];

export const extracurricularOptions = [
  'Football',
  'Basketball',
  'Athletics',
  'Dance',
  'Music',
  'Art and Craft',
  'Public Speaking',
  'Science Club',
  'Computer Club',
  'Quiz',
  'Drama',
  'Other',
];

export const admissionProcessSteps = [
  {
    id: 1,
    title: 'Complete the Online Form',
    description:
      'Enter the student, guardian, academic and additional information requested in the application.',
  },
  {
    id: 2,
    title: 'Application Review',
    description:
      'The admission team reviews the submitted information and contacts the parent or guardian.',
  },
  {
    id: 3,
    title: 'Interaction or Assessment',
    description:
      'The parent and student may be invited for an interaction, school visit or entrance assessment.',
  },
  {
    id: 4,
    title: 'Admission Confirmation',
    description:
      'Admission is confirmed after document verification, grade availability and completion of school requirements.',
  },
];

export const requiredAdmissionDocuments = [
  {
    id: 1,
    title: 'Birth Certificate',
    description:
      'A clear copy of the student’s official birth certificate.',
  },
  {
    id: 2,
    title: 'Previous School Report Card',
    description:
      'The latest academic report or examination result from the previous school.',
  },
  {
    id: 3,
    title: 'Transfer Certificate',
    description:
      'A transfer or leaving certificate when required for the applying grade.',
  },
  {
    id: 4,
    title: 'Passport-Size Photographs',
    description:
      'Recent passport-size photographs of the student.',
  },
  {
    id: 5,
    title: 'Parent or Guardian Identification',
    description:
      'A citizenship card, passport or another valid identification document.',
  },
  {
    id: 6,
    title: 'Other Required Documents',
    description:
      'Additional documents requested by the school according to the student’s grade.',
  },
];

export const admissionFaqs = [
  {
    id: 1,
    question: 'Which classes are open for admission?',
    answer:
      'Admission is generally available from Pre-Primary to Grade 10, depending on seat availability. Parents should contact the admission office to confirm availability for a specific class.',
  },
  {
    id: 2,
    question: 'Does submitting this form confirm admission?',
    answer:
      'No. Submitting the online form only sends an application for review. Admission is confirmed after the school reviews the application, verifies documents and completes the required admission process.',
  },
  {
    id: 3,
    question: 'What documents are required?',
    answer:
      'Common documents include a birth certificate, previous school report card, transfer certificate, passport-size photographs and parent or guardian identification. Requirements may vary according to the applying grade.',
  },
  {
    id: 4,
    question: 'Is there an entrance examination?',
    answer:
      'The school may arrange an interaction, academic assessment or entrance examination depending on the student’s age and applying grade.',
  },
  {
    id: 5,
    question: 'Can I apply using a mobile phone?',
    answer:
      'Yes. The application page is fully responsive and can be completed using a mobile phone, tablet, laptop or desktop computer.',
  },
  {
    id: 6,
    question: 'How will the school contact me?',
    answer:
      'The admission team will use the phone number, WhatsApp number or email address provided in the application.',
  },
  {
    id: 7,
    question: 'Can I edit the form after submitting it?',
    answer:
      'You cannot directly edit a submitted application. Contact the admission office and provide your application reference number if a correction is required.',
  },
  {
    id: 8,
    question: 'Is school transportation available?',
    answer:
      'Transportation may be available for selected routes. The school will confirm route availability, pickup points, schedules and fees.',
  },
];

export const acceptedDocumentTypes = [
  'application/pdf',
  'image/jpeg',
  'image/png',
];

export const maximumDocumentSize = 5 * 1024 * 1024;