"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import styles from "./treatment-carousel.module.css";

export function TreatmentCarousel({ children, label }: { children: ReactNode; label: string }) {
  const id = useId();
  const track = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ start: 1, end: 3, count: 0, atStart: true, atEnd: false });

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const update = () => {
      const cards = Array.from(element.children) as HTMLElement[];
      const bounds = element.getBoundingClientRect();
      const visible = cards.flatMap((card, index) => {
        const rect = card.getBoundingClientRect();
        return rect.left < bounds.right - 20 && rect.right > bounds.left + 20 ? [index + 1] : [];
      });
      setPosition({ start: visible[0] || 1, end: visible.at(-1) || 1, count: cards.length, atStart: element.scrollLeft <= 2, atEnd: element.scrollLeft >= element.scrollWidth - element.clientWidth - 2 });
    };
    const observer = new ResizeObserver(update);
    observer.observe(element);
    element.addEventListener("scroll", update, { passive: true });
    update();
    return () => { observer.disconnect(); element.removeEventListener("scroll", update); };
  }, []);

  const move = (direction: number) => {
    const element = track.current;
    const card = element?.firstElementChild as HTMLElement | null;
    if (!element || !card) return;
    const step = card.getBoundingClientRect().width + parseFloat(getComputedStyle(element).columnGap);
    const perPage = Math.max(1, Math.round(element.clientWidth / step));
    element.scrollBy({ left: direction * step * perPage, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };

  return <div className={styles.carousel} role="region" aria-roledescription="carousel" aria-label={label}>
    <div id={id} ref={track} className={styles.track} tabIndex={0} aria-label="Treatments. Swipe or use the arrow buttons to browse." onKeyDown={event => {
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); }
    }}>{children}</div>
    <div className={styles.controls}>
      <div className={styles.progress} aria-hidden="true"><span style={{ width: `${position.count ? position.end / position.count * 100 : 0}%` }} /></div>
      <span className={styles.counter} aria-live="polite" aria-atomic="true">{position.count ? `${String(position.start).padStart(2, "0")}–${String(position.end).padStart(2, "0")} / ${position.count}` : "Browse treatments"}</span>
      <div className={styles.buttons}>
        <button type="button" aria-label="Previous treatments" aria-controls={id} disabled={position.atStart} onClick={() => move(-1)}><ArrowLeft size={21} /></button>
        <button type="button" aria-label="Next treatments" aria-controls={id} disabled={position.atEnd} onClick={() => move(1)}><ArrowRight size={21} /></button>
      </div>
    </div>
  </div>;
}
