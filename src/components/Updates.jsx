import { ArrowRight, CalendarDays, Clock3, MapPin } from 'lucide-react';
import { events, notices } from '../data/schoolData';
import { Reveal, SectionHeading } from './Shared';

export default function Updates() {
  return (
    <section id="notices" className="section-padding subtle-grid bg-slate-50">
      <div className="section-shell">
        <SectionHeading
          kicker="School Updates"
          title="Stay informed about notices and upcoming events."
          copy="Find important academic information, school activities and dates for your calendar."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-2xl font-bold text-navy-950">Latest Notices</h3>
                <a href="#contact" className="flex items-center gap-1 text-sm font-extrabold text-royal-700">View all <ArrowRight size={15} /></a>
              </div>
              <div className="mt-5 divide-y divide-slate-100">
                {notices.map((notice) => (
                  <article key={notice.title} className="flex gap-4 py-5 first:pt-2">
                    <div className="grid size-16 shrink-0 place-items-center rounded-2xl bg-blue-50 text-center">
                      <div>
                        <strong className="block font-display text-2xl leading-none text-royal-700">{notice.date}</strong>
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">{notice.month}</span>
                      </div>
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-extrabold uppercase tracking-[0.12em] text-gold-500">{notice.type}</span>
                      <h4 className="mt-1 font-bold leading-6 text-navy-950">{notice.title}</h4>
                      <a href="#contact" className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-royal-700 hover:text-navy-950">Read notice <ArrowRight size={14} /></a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-[2rem] bg-navy-900 p-6 text-white shadow-xl sm:p-8">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-xl bg-gold-400 text-navy-950"><CalendarDays size={22} /></span>
                <h3 className="font-display text-2xl font-bold">Upcoming Events</h3>
              </div>
              <div className="mt-6 space-y-4">
                {events.map((event) => (
                  <article key={event.title} className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10">
                    <div className="grid size-16 shrink-0 place-items-center rounded-2xl bg-white text-center text-navy-950">
                      <div>
                        <strong className="block font-display text-2xl leading-none">{event.day}</strong>
                        <span className="text-[10px] font-extrabold tracking-wider text-royal-700">{event.month}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold leading-6">{event.title}</h4>
                      <p className="mt-2 flex items-center gap-2 text-xs text-white/60"><Clock3 size={13} /> {event.time}</p>
                      <p className="mt-1 flex items-center gap-2 text-xs text-white/60"><MapPin size={13} /> {event.place}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
