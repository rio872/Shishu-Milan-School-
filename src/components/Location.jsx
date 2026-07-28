import { ExternalLink, MapPin, Navigation, Phone } from 'lucide-react';
import { school } from '../data/schoolData';
import { Reveal, SectionHeading } from './Shared';

export default function Location() {
  const hasEmbed = school.mapEmbed && !school.mapEmbed.startsWith('[');
  const hasLink = school.mapLink && !school.mapLink.startsWith('[');

  return (
    <section className="section-padding bg-white">
      <div className="section-shell">
        <SectionHeading
          kicker="Our Location"
          title="Easy to find and convenient to reach."
          copy="Visit our school to meet the team, explore the facilities and experience our learning environment."
          align="center"
        />

        <div className="mt-12 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-navy-900/8 lg:grid lg:grid-cols-[0.72fr_1.28fr]">
          <Reveal className="flex h-full flex-col justify-center bg-navy-900 p-8 text-white sm:p-10">
            <span className="grid size-14 place-items-center rounded-2xl bg-gold-400 text-navy-950"><MapPin size={28} /></span>
            <h3 className="mt-6 font-display text-3xl font-bold">Visit {school.name}</h3>
            <p className="mt-4 leading-7 text-white/70">{school.address}</p>
            <p className="mt-2 text-sm font-bold text-gold-400">Landmark: {school.landmark}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <a
                href={hasLink ? school.mapLink : '#contact'}
                target={hasLink ? '_blank' : undefined}
                rel={hasLink ? 'noreferrer' : undefined}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-400 px-5 py-3.5 text-sm font-extrabold text-navy-950 hover:bg-white"
              >
                <Navigation size={17} /> Get Directions
              </a>
              <a href={`tel:${school.phone}`} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-5 py-3.5 text-sm font-extrabold text-white hover:bg-white hover:text-navy-950">
                <Phone size={17} /> Call School
              </a>
            </div>
          </Reveal>

          <div className="min-h-[440px] bg-slate-100">
            {hasEmbed ? (
              <iframe
                src={school.mapEmbed}
                title={`${school.name} location on Google Maps`}
                width="100%"
                height="100%"
                className="min-h-[440px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            ) : (
              <div className="grid min-h-[440px] place-items-center p-8 text-center">
                <div>
                  <MapPin className="mx-auto text-royal-600" size={52} />
                  <h4 className="mt-5 font-display text-2xl font-bold text-navy-950">Google Map Placeholder</h4>
                  <p className="mx-auto mt-3 max-w-md leading-7 text-slate-600">Replace <strong>[GOOGLE MAPS EMBED LINK]</strong> in <code>src/data/schoolData.js</code> to display your school map here.</p>
                  <a href="#contact" className="mt-5 inline-flex items-center gap-2 font-bold text-royal-700">Contact for location <ExternalLink size={16} /></a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
