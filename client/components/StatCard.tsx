import { useEffect, useRef, useState } from "react";

interface StatCardProps {
  value: number;
  suffix?: string;
  label: string;
}

export function StatCard({ value, suffix = "", label }: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let currentValue = 0;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    const stepDuration = duration / steps;

    const interval = setInterval(() => {
      currentValue += increment;
      if (currentValue >= value) {
        setDisplayValue(value);
        clearInterval(interval);
      } else {
        setDisplayValue(Math.floor(currentValue));
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [isVisible, value]);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center rounded-lg border-2 border-slate-200 bg-white px-6 py-10 text-center transition duration-300 hover:shadow-lg hover:border-primary hover:-translate-y-1"
    >
      <div className="mb-3 text-4xl font-black text-primary">
        {displayValue}
        {suffix}
      </div>
      <div className="text-sm font-semibold uppercase tracking-wide text-foreground/70">
        {label}
      </div>
    </div>
  );
}
