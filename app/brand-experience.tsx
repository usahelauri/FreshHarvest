"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

type Theme = "dark" | "light";

export default function BrandExperience() {
  const [theme, setTheme] = useState<Theme>("dark");
  const mounted = useSyncExternalStore(() => () => undefined, () => true, () => false);

  useEffect(() => {
    const saved = window.localStorage.getItem("fresh-harvest-theme");
    const initial: Theme = saved === "light" ? "light" : "dark";
    const syncTheme = window.setTimeout(() => setTheme(initial), 0);
    document.body.dataset.theme = initial;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveals = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    reveals.forEach((item) => {
      const bounds = item.getBoundingClientRect();
      if (reduced || (bounds.top < window.innerHeight * 1.05 && bounds.bottom > 0)) {
        item.classList.add("is-visible");
      }
    });
    document.body.classList.add("motion-ready");

    const observer = reduced
      ? null
      : new IntersectionObserver(
          (entries) => entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer?.unobserve(entry.target);
            }
          }),
          { threshold: 0.12, rootMargin: "0px 0px -7%" },
        );
    reveals.forEach((item) => observer?.observe(item));

    const pointer = (event: PointerEvent) => {
      document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", pointer, { passive: true });

    return () => {
      observer?.disconnect();
      window.removeEventListener("pointermove", pointer);
      document.body.classList.remove("motion-ready");
      window.clearTimeout(syncTheme);
    };
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.body.dataset.theme = next;
    window.localStorage.setItem("fresh-harvest-theme", next);
  };

  if (!mounted) return null;

  return (
    <>
      {createPortal(
        <button className="theme-toggle" type="button" onClick={toggle} aria-label={`Включить ${theme === "dark" ? "светлую" : "тёмную"} тему`}>
          <span className="theme-toggle-track"><i className={theme === "dark" ? "is-dark" : ""} /></span>
          <b>{theme === "dark" ? "Dark" : "Light"}</b>
        </button>,
        document.getElementById("theme-control") ?? document.body,
      )}
      <span className="cursor-aura" aria-hidden="true" />
    </>
  );
}
