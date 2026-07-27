import { Check, Quote } from 'lucide-react';
import { school } from '../data/schoolData';
import { PrimaryButton, Reveal, SectionHeading } from './Shared';

export default function About() {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="section-shell grid items-center gap-14 lg:grid-cols-2">
        <Reveal className="relative">
          <div className="overflow-hidden rounded-[2rem] shadow-2xl shadow-navy-900/15">
            <img
               src="/about-school.png"
  alt="Students of Shishu Milan English School"
  className="h-[520px] w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-8 -right-2 max-w-[280px] rounded-3xl bg-navy-900 p-6 text-white shadow-2xl sm:right-8">
            <Quote className="text-gold-400" />
            <p className="mt-3 font-display text-lg font-bold leading-7">Education should prepare students not only for exams, but also for life.</p>
          </div>
        </Reveal>

        <div className="pt-10 lg:pt-0">
          <SectionHeading
            kicker="About Our School"
            title="A trusted learning community with a clear purpose."
            copy={`${school.name} provides a balanced education that combines academic strength, practical skills, creativity, discipline and compassion.`}
          />
          <Reveal delay={0.08}>
            <p className="mt-5 leading-8 text-slate-600">
              Our classrooms are active, inclusive spaces where students are encouraged to ask questions, solve problems and take responsibility for their growth. We work closely with families to help every learner build strong values and a lifelong love of learning.
            </p>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {['Modern teaching methods', 'Continuous student support', 'Values-based education', 'Co-curricular opportunities'].map((item) => (
                <div key={item} className="flex items-center gap-3 font-bold text-navy-950">
                  <span className="grid size-7 place-items-center rounded-full bg-blue-50 text-royal-600"><Check size={15} /></span>
                  {item}
                </div>
              ))}
            </div>
            <PrimaryButton href="#academics" className="mt-8 bg-royal-600 text-white hover:bg-navy-900 hover:text-white">
              Discover Our Programs
            </PrimaryButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
