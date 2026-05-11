import { useState, useEffect, useRef } from "react";

export function useActiveSection(sectionIds, options = {}) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? "");
  const observersRef = useRef([]);

  useEffect(() => {
    const threshold = options.threshold ?? 0.4;

    observersRef.current.forEach((obs) => obs.disconnect());
    observersRef.current = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold }
      );
      observer.observe(el);
      observersRef.current.push(observer);
    });

    return () => observersRef.current.forEach((obs) => obs.disconnect());
  }, [sectionIds.join(","), options.threshold]);

  return activeSection;
}
