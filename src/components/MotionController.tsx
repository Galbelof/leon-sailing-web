"use client";

import { useEffect, useRef } from "react";

export default function MotionController() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const updateProgress = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
        progressRef.current?.style.setProperty("transform", `scaleX(${progress})`);

        const hero = document.getElementById("inicio");
        if (hero) {
          const heroProgress = Math.min(Math.max(window.scrollY / Math.max(hero.offsetHeight, 1), 0), 1);
          hero.style.setProperty("--hero-scroll", heroProgress.toFixed(3));
        }
      });
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    updateProgress();

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let observer: IntersectionObserver | null = null;
    let targets: HTMLElement[] = [];
    const targetVariants = new Map<HTMLElement, string>();

    if (!reduceMotion) {
      targets = Array.from(
        document.querySelectorAll<HTMLElement>(
          "main section [data-motion], main section h2, main section article, main section figure",
        ),
      ).filter((element) => !element.closest('[role="dialog"]'));

      targets.forEach((element, index) => {
        const requestedVariant = element.dataset.motion;
        const variant =
          (requestedVariant && requestedVariant !== "true" ? requestedVariant : "") ||
          (element.tagName === "H2"
            ? "heading"
            : element.tagName === "FIGURE"
              ? "image"
              : element.tagName === "ARTICLE"
                ? "card"
                : "rise");
        targetVariants.set(element, variant);
        element.classList.add("motion-target", `motion-${variant}`);
        element.style.setProperty(
          "--motion-delay",
          element.dataset.motionDelay || `${(index % 4) * 70}ms`,
        );
      });

      document.documentElement.classList.add("motion-ready");
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("motion-visible");
            observer?.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -8%", threshold: 0.12 },
      );

      targets.forEach((element) => observer?.observe(element));
    }

    const pointerCleanups: Array<() => void> = [];
    const precisePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (!reduceMotion && precisePointer) {
      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((element) => {
        const onPointerMove = (event: PointerEvent) => {
          const bounds = element.getBoundingClientRect();
          const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 8;
          const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 8;
          element.style.setProperty("--magnetic-x", `${x.toFixed(2)}px`);
          element.style.setProperty("--magnetic-y", `${y.toFixed(2)}px`);
        };
        const onPointerLeave = () => {
          element.style.setProperty("--magnetic-x", "0px");
          element.style.setProperty("--magnetic-y", "0px");
        };
        element.addEventListener("pointermove", onPointerMove);
        element.addEventListener("pointerleave", onPointerLeave);
        pointerCleanups.push(() => {
          element.removeEventListener("pointermove", onPointerMove);
          element.removeEventListener("pointerleave", onPointerLeave);
        });
      });

      document.querySelectorAll<HTMLElement>("[data-spotlight]").forEach((element) => {
        const onPointerMove = (event: PointerEvent) => {
          const bounds = element.getBoundingClientRect();
          element.style.setProperty("--spotlight-x", `${event.clientX - bounds.left}px`);
          element.style.setProperty("--spotlight-y", `${event.clientY - bounds.top}px`);
        };
        element.addEventListener("pointermove", onPointerMove);
        pointerCleanups.push(() => element.removeEventListener("pointermove", onPointerMove));
      });
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      observer?.disconnect();
      pointerCleanups.forEach((cleanup) => cleanup());
      document.documentElement.classList.remove("motion-ready");
      targets.forEach((element) => {
        const variant = targetVariants.get(element) || "rise";
        element.classList.remove("motion-target", "motion-visible", `motion-${variant}`);
        element.style.removeProperty("--motion-delay");
      });
    };
  }, []);

  return <div ref={progressRef} className="scroll-progress" aria-hidden="true" />;
}
