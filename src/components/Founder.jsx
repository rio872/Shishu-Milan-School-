import { Quote } from 'lucide-react';
import { school } from '../data/schoolData';
import { Reveal } from './Shared';

export default function Founder() {
 const founderPhoto = school.founderPhoto || '';

const photoIsPlaceholder =
  !founderPhoto || founderPhoto.startsWith('[');

  return (
    <section className="section-padding overflow-hidden bg-navy-950 text-white">
      <div className="section-shell grid items-center gap-12 lg:grid-cols-[0.82fr_1.18fr]">
        <Reveal className="relative mx-auto w-full max-w-md">
          <div className="absolute -inset-5 rounded-[2.2rem] border border-gold-400/25" />
          {photoIsPlaceholder ? (
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=85"
              alt="Placeholder portrait for the school founder"
              className="relative h-[510px] w-full rounded-[1.8rem] object-cover grayscale-[15%]"
            />
          ) : (
            <img src={school.founderPhoto} alt={`${school.founderName}, school founder`} className="relative h-[510px] w-full rounded-[1.8rem] object-cover" />
          )}
          <div className="absolute inset-x-5 bottom-5 rounded-2xl bg-white p-4 text-navy-950 shadow-xl">
            <strong className="block font-display text-xl">{school.founderName}</strong>
            <span className="text-sm font-bold text-royal-700">Chairperson</span>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="section-kicker !text-gold-400">Chairperson Message</p>
          <Quote className="mt-7 text-gold-400" size={48} />
          <blockquote className="mt-4 font-display text-[clamp(1.9rem,4vw,3.25rem)] font-bold leading-tight text-balance">
            “We believe education is most powerful when students feel safe to question, explore, create and become their best selves.”
          </blockquote>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
            At {school.name}, our purpose is to develop knowledgeable, kind and confident individuals. Our teachers work with patience and high expectations, while our partnership with parents ensures that each child receives consistent support at school and at home.
          </p>
          <div className="mt-7 h-px w-24 bg-gold-400" />
          <p className="mt-5 font-bold text-white/85">Together, we can help every learner discover their strengths and contribute positively to society.</p>
        </Reveal>
      </div>
    </section>
  );
}
