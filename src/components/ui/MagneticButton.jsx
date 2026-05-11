import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Wraps a button or link so it elastically drifts toward the cursor on hover.
 * Snaps back when the mouse leaves. Desktop/fine-pointer only.
 */
export function MagneticButton({
  children,
  className = "",
  href,
  target,
  rel,
  onClick,
  type,
  disabled,
  "aria-label": ariaLabel,
  "aria-live": ariaLive,
}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 380, damping: 28 });
  const sy = useSpring(y, { stiffness: 380, damping: 28 });

  const onMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width  / 2)) * 0.3);
    y.set((e.clientY - (r.top  + r.height / 2)) * 0.3);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  const Tag = href ? motion.a : motion.button;

  return (
    <Tag
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      href={href}
      target={target}
      rel={rel}
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-live={ariaLive}
      className={className}
    >
      {children}
    </Tag>
  );
}
