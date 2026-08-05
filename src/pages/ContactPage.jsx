import { useEffect } from 'react';

import Footer from '../components/Footer';
import Header from '../components/Header';

import {
  ContactCTA,
  ContactFAQ,
  ContactForm,
  ContactHero,
  ContactInfoCards,
  DepartmentContacts,
  LocationSection,
  SocialLinks,
} from '../components/contact/ContactComponents';

import { school } from '../data/schoolData';

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    const previousTitle =
      document.title;

    document.title =
      `Contact Us | ${school.name}`;

    let description =
      document.querySelector(
        'meta[name="description"]',
      );

    const createdDescription =
      !description;

    const previousDescription =
      description?.getAttribute(
        'content',
      );

    if (!description) {
      description =
        document.createElement(
          'meta',
        );

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
      `Contact ${school.name} for admission information, academic enquiries, school visits, transportation and general assistance.`,
    );

    return () => {
      document.title =
        previousTitle;

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

  return (
    <>
      <Header />

      <main>
        <ContactHero
          image={
            school.contactHeroImage ||
            '/contact/contact-hero.jpg'
          }
        />

        <ContactInfoCards />

        <ContactForm />

        <LocationSection />

        <DepartmentContacts />

        <ContactFAQ />

        <SocialLinks />

        <ContactCTA />
      </main>

      <Footer />
    </>
  );
}