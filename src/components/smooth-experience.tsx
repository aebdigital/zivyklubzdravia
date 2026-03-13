"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function SmoothExperience() {
  const pathname = usePathname();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lenis: Lenis | null = null;

    if (!prefersReducedMotion) {
      lenis = new Lenis({
        autoRaf: true,
        smoothWheel: true,
        gestureOrientation: "vertical",
        lerp: 0.08,
        wheelMultiplier: 0.9,
      });
    }

    const revealNodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (prefersReducedMotion) {
      revealNodes.forEach((node) => node.classList.add("is-visible"));

      return () => {
        lenis?.destroy();
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    revealNodes.forEach((node, index) => {
      if (!node.style.getPropertyValue("--reveal-delay")) {
        node.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 45}ms`);
      }

      observer.observe(node);
    });

    return () => {
      observer.disconnect();

      lenis?.destroy();
    };
  }, [pathname]);

  return null;
}
