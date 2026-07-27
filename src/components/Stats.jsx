import { useEffect, useRef, useState } from 'react';
import { stats } from '../data/schoolData';

function Counter({ value, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        const duration = 1400;
        const start = performance.now();

        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(value * eased));
          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.45 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="font-display text-4xl font-extrabold text-white sm:text-5xl">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-14">
      <div className="absolute inset-0 subtle-grid opacity-20" />
      <div className="section-shell relative grid grid-cols-2 gap-8 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={stat.label} className={`text-center ${index > 0 ? 'lg:border-l lg:border-white/15' : ''}`}>
            <Counter value={stat.value} suffix={stat.suffix} />
            <p className="mt-2 text-sm font-bold text-white/65 sm:text-base">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
