import { facilities } from '../data/schoolData';
import { Reveal, SectionHeading } from './Shared';

export default function Facilities() {
  return (
    <section id="facilities" className="section-padding bg-white">
      <div className="section-shell">
        <SectionHeading
          kicker="school Facilities"
          title="Spaces that make learning practical, active and enjoyable."
          copy="Our school provides students with the resources they need to learn, experiment, perform, collaborate and stay active."
          align="center"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {facilities.map((facility, index) => {
            const Icon = facility.icon;
            return (
              <Reveal key={facility.title} delay={index * 0.05}>
                <article className="group relative h-80 overflow-hidden rounded-3xl shadow-lg shadow-navy-900/10">
                  <img src={facility.image} alt={`${facility.title} at the school`} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/15 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-center gap-4 p-6 text-white">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gold-400 text-navy-950">
                      <Icon size={22} />
                    </span>
                    <h3 className="font-display text-2xl font-bold">{facility.title}</h3>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
