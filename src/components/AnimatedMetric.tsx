"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export default function AnimatedMetric({ value, animate = false }: { value: string; animate?: boolean }) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const parsed = useMemo(() => {
    const match = value.match(/\d+(?:[,.]\d+)?/);
    if (!match) return null;
    const rawNumber = match[0];
    const decimalMark = rawNumber.includes(",") ? "," : rawNumber.includes(".") ? "." : "";
    const decimals = decimalMark ? rawNumber.split(decimalMark)[1].length : 0;
    return {
      target: Number(rawNumber.replace(",", ".")),
      decimals,
      decimalMark,
      prefix: value.slice(0, match.index),
      suffix: value.slice((match.index || 0) + rawNumber.length),
    };
  }, [value]);
  const [display, setDisplay] = useState(parsed?.target || 0);

  useEffect(() => {
    if (!animate || !parsed || !elementRef.current) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      const reducedMotionFrame = requestAnimationFrame(() => setDisplay(parsed.target));
      return () => cancelAnimationFrame(reducedMotionFrame);
    }

    let animationFrame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setDisplay(0);
        const startedAt = performance.now();
        const duration = 1050;
        const tick = (now: number) => {
          const progress = Math.min((now - startedAt) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4);
          setDisplay(parsed.target * eased);
          if (progress < 1) animationFrame = requestAnimationFrame(tick);
        };
        animationFrame = requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.55 },
    );
    observer.observe(elementRef.current);

    return () => {
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
    };
  }, [animate, parsed]);

  if (!parsed) return <>{value}</>;

  const formatted = display
    .toFixed(parsed.decimals)
    .replace(".", parsed.decimalMark || ".");

  return (
    <span ref={elementRef} aria-label={value} className="metric-value">
      <span aria-hidden="true">{parsed.prefix}{formatted}{parsed.suffix}</span>
    </span>
  );
}
