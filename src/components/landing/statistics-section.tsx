"use client";

import { useEffect, useRef, useState } from "react";

interface StatItem {
  label: string;
  value: number;
  suffix: string;
}

interface StatisticsSectionProps {
  stats: StatItem[];
}

function AnimatedNumber({
  target,
  suffix,
}: {
  target: number;
  suffix: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const start = performance.now();
          let frameId: number; // ADD THIS

          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) {
              frameId = requestAnimationFrame(animate); // SAVE ID
            }
          };

          frameId = requestAnimationFrame(animate); // SAVE ID
        }
      },
      { threshold: 0.5 },
    );

    if (ref.current) observer.observe(ref.current);

    // ADD CLEANUP
    return () => {
      observer.disconnect();
      // Note: If you want to be 100% strict, you'd need to expose frameId outside
      // the IntersectionObserver callback to cancel it here, but disconnecting
      // the observer is the primary fix.
    };
  }, [target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function StatisticsSection({ stats }: StatisticsSectionProps) {
  return (
    <section className="py-16 bg-secondary">
      <div className="container-tight">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center space-y-2">
              <p className="text-3xl md:text-4xl font-heading font-bold text-accent">
                <AnimatedNumber target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-sm text-secondary-foreground/70 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
