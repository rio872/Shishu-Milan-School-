import { ArrowUpRight } from 'lucide-react';
import { programs, strengths } from '../data/schoolData';
import { Reveal, SectionHeading } from './Shared';

export function Academics() {
  return (
    <section id="academics" className="section-padding subtle-grid bg-slate-50">
      <div className="section-shell">
        <SectionHeading
          kicker="Academic Pathways"
          title="Learning experiences designed for every stage."
          copy="Our programs build strong fundamentals while helping students grow into curious, capable and responsible young people."
          align="center"
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <Reveal key={program.title} delay={index * 0.06}>
                <article className="group h-full rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl hover:shadow-royal-600/10">
                  <div className="flex items-center justify-between">
                    <span className="grid size-14 place-items-center rounded-2xl bg-blue-50 text-royal-600 transition group-hover:bg-royal-600 group-hover:text-white">
                      <Icon size={27} />
                    </span>
                    <ArrowUpRight className="text-slate-300 transition group-hover:text-gold-500" />
                  </div>
                  <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.14em] text-gold-500">{program.ages}</p>
                  <h3 className="mt-2 font-display text-2xl font-bold text-navy-950">{program.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{program.description}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function WhyChoose() {
  return (
    <section className="section-padding bg-white">
      <div className="section-shell">
        <SectionHeading
          kicker="Why Choose Us"
          title="The right environment helps every learner thrive."
          copy="We combine high expectations with genuine care, giving students both the challenge and support they need."
        />
        <div className="mt-12 grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {strengths.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={index * 0.04}>
                <div className="flex gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-navy-900 text-gold-400 shadow-lg shadow-navy-900/10">
                    <Icon size={23} />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-bold text-navy-950">{item.title}</h3>
                    <p className="mt-2 leading-7 text-slate-600">{item.description}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
