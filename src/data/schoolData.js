import {
  Award,
  BookOpen,
  Bus,
  Clock3,
  FlaskConical,
  GraduationCap,
  HeartHandshake,
  Languages,
  Laptop,
  Library,
  Medal,
  Music2,
  Palette,
  ShieldCheck,
  Trophy,
  Users,
} from 'lucide-react';

export const school = {
  name: 'Shishu Milan English School',
  logo: '/logo.png',
  slogan: 'Education is Light',

  aboutHeroImage: '/about-hero.png',
  aboutImageOne: '/school-1.png',
  aboutImageTwo: '/school-2.png', 
   whyChooseImage: '/why-choose-school.jpg',
  academicsHeroImage: '/academics-hero.jpg',
  academicCalendarFile: '/academic-calendar.pdf',
  facilities:'facilities-hero.jpg',
  contact: '/contact-hero.jpg',
  

  phone: '01-5128064',
  email: 'shishu20649@gmail.com',
  address: 'Budhanilkantha-13, Chunikhel',
  landmark: 'Near Ward-13',
  officeHours: 'Sun–Fri: 8:00 AM–4:30 PM',

  founderName: 'Radhe Shyam Shrestha',
  founderPhoto: '/founder.png',

  academicsHeroImage: '/academics-hero.jpg',
  academicOverviewImage: '/academic-overview.jpg',
  academicCalendarFile: '/academic-calendar.pdf',
  whatsapp: '9779851005539',

  galleryHeroImage: '/public/gallery-hero.jpg',

  mapEmbed:
    'https://www.google.com/maps?q=Shishu+Milan+English+School,+Budhanilkantha-13,+Chunikhel,+Nepal&output=embed',

  mapLink:
    'https://share.google/YWLjr03VHr6NZ4vBX',
};

export const navLinks = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Academics',
    href: '/academics',
  },
  {
    label: 'Facilities',
    href: '/facilities',
  },
 
  {
    label: 'Gallery',
    href: '/gallery',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
];

export const stats = [
  { value: 25, suffix: '+', label: 'Years of Excellence' },
  { value: 1200, suffix: '+', label: 'Active Students' },
  { value: 35, suffix: '+', label: 'Qualified Teachers' },
  { value: 96, suffix: '%', label: 'Board Exam Success' },
];

export const programs = [
  {
    icon: BookOpen,
    title: 'Early Years',
    ages: 'PG–UKG',
    description:
      'A joyful foundation focused on confidence, communication, play and early literacy.',
  },
  {
    icon: GraduationCap,
    title: 'Primary School',
    ages: 'Grades 1–5',
    description:
      'Strong academic foundations with project learning, creativity and personal development.',
  },
  {
    icon: Laptop,
    title: 'Lower Secondary',
    ages: 'Grades 6–8',
    description:
      'Subject-based learning supported by digital tools, practical work and student leadership.',
  },
  {
    icon: Medal,
    title: 'Secondary School',
    ages: 'Grades 9–10',
    description:
      'Focused preparation for examinations, higher education and responsible citizenship.',
  },
];

export const strengths = [
  {
    icon: Users,
    title: 'Student-Centred Teaching',
    description: 'Small-group support and lessons designed around different learning needs.',
  },
  {
    icon: ShieldCheck,
    title: 'Safe & Caring school',
    description: 'A respectful environment with attentive supervision and clear safeguarding practices.',
  },
  {
    icon: Award,
    title: 'Experienced Faculty',
    description: 'Qualified teachers committed to professional development and modern pedagogy.',
  },
  {
    icon: HeartHandshake,
    title: 'Strong Parent Partnership',
    description: 'Regular communication, progress updates and meaningful family involvement.',
  },
  {
    icon: Languages,
    title: 'Whole-Child Growth',
    description: 'Balanced development through academics, sports, arts, values and leadership.',
  },
  {
    icon: Clock3,
    title: 'Reliable School Routine',
    description: 'Well-planned schedules, timely support and consistent academic monitoring.',
  },
];

export const facilities = [
  {
    icon: FlaskConical,
    title: 'Science Laboratories',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=900&q=80',
  },
  {
    icon: Library,
    title: 'Modern Library',
    image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=900&q=80',
  },
  {
    icon: Laptop,
    title: 'Computer Lab',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
  },
  {
    icon: Trophy,
    title: 'Sports & Playground',
    image: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=900&q=80',
  },
  {
    icon: Palette,
    title: 'Music Studio',
    image: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=900&q=80',
  },
  {
    icon: Bus,
    title: 'School Transport',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=900&q=80',
  },
];

export const notices = [
  { date: '12', month: 'Aug', title: 'First Term Examination Routine', type: 'Academic' },
  { date: '08', month: 'Aug', title: 'Parent–Teacher Meeting Schedule', type: 'Meeting' },
  { date: '02', month: 'Aug', title: 'Inter-House Sports Registration', type: 'Sports' },
];

export const events = [
  {
    day: '18',
    month: 'AUG',
    title: 'Science and Innovation Exhibition',
    time: '10:00 AM–2:00 PM',
    place: 'School Multipurpose Hall',
  },
  {
    day: '25',
    month: 'AUG',
    title: 'Inter-House Cultural Program',
    time: '11:00 AM–3:00 PM',
    place: 'Main Auditorium',
  },
  {
    day: '03',
    month: 'SEP',
    title: 'Parent Orientation Program',
    time: '9:30 AM–11:30 AM',
    place: 'Conference Hall',
  },
];

export const galleryImages = [
  {
    src: '/interactive-classroom.jpg',
    alt: 'Teacher guiding students inside a bright classroom',
    label: 'Interactive Classroom',
  },
  {
    src: '/happy-learning.jpg',
    alt: 'Young student reading and learning at school',
    label: 'Happy Learning',
  },
  {
    src: '/student-activities.jpg',
    alt: 'Students participating in a classroom activity',
    label: 'Student Activities',
  },
  {
    src: '/supportive-teacher.jpg',
    alt: 'Teacher assisting young students during a lesson',
    label: 'Supportive Teachers',
  },
  {
    src: '/student success.jpg',
    alt: 'Students celebrating graduation outdoors',
    label: 'Student Success',
  },
  {
    src: '/reading-culture.jpg',
    alt: 'Open books arranged for study in a library',
    label: 'Reading Culture',
  },
];

export const testimonials = [
  {
    name: 'Anita Sharma',
    role: 'Parent of Grade 6 Student',
    quote:
      'The teachers genuinely understand my child. We receive regular progress updates, and the school balances academics with confidence-building activities.',
  },
  {
    name: 'Aarav Thapa',
    role: 'Grade 10 Student',
    quote:
      'The labs, clubs and supportive teachers make learning exciting. I have improved academically and also become more confident speaking in front of others.',
  },
  {
    name: 'Suman Karki',
    role: 'Parent of Grade 2 Student',
    quote:
      'The school feels safe and welcoming. My daughter looks forward to school every morning and has developed excellent learning habits.',
  },
];

export const clubs = [Music2, Palette, Trophy, FlaskConical];
