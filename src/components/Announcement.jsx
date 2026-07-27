import { ArrowRight, BellRing } from 'lucide-react';

export default function Announcement() {
  return (
    <section aria-label="Latest announcement" className="border-b border-blue-100 bg-blue-50">
      <div className="section-shell flex flex-col items-start gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3 sm:items-center">
          <span className="relative grid size-9 shrink-0 place-items-center rounded-full bg-royal-600 text-white">
            <BellRing size={17} />
            <span className="absolute -right-0.5 -top-0.5 size-2.5 animate-pulse rounded-full bg-gold-400" />
          </span>
          <p className="text-sm text-slate-700">
            <strong className="mr-2 text-navy-950">Latest Announcement:</strong>
            Admission forms for the new academic session are now available.
          </p>
        </div>
        <a href="#admission" className="ml-12 inline-flex items-center gap-1 text-sm font-extrabold text-royal-700 hover:text-navy-950 sm:ml-0">
          Apply today <ArrowRight size={15} />
        </a>
      </div>
    </section>
  );
}
