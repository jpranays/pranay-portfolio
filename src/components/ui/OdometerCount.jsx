import { useRef } from "react";
import { motion, useInView } from "framer-motion";

function OdometerDigit({ digit, inView, delay = 0 }) {
  const n = parseInt(digit, 10);

  if (isNaN(n)) {
    return <span style={{ display: "inline-block" }}>{digit}</span>;
  }

  // Vertical column: [0, 1, 2, ..., n]
  // Overflow hidden + animate y from 0 → -n*1em to "roll" to the final digit
  return (
    <span
      style={{
        display: "inline-block",
        overflow: "hidden",
        height: "1em",
        lineHeight: "1em",
        verticalAlign: "bottom",
      }}
    >
      <motion.span
        style={{ display: "flex", flexDirection: "column", lineHeight: "1em" }}
        initial={{ y: 0 }}
        animate={inView ? { y: `-${n}em` } : { y: 0 }}
        transition={{ delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        {Array.from({ length: n + 1 }, (_, i) => (
          <span key={i} style={{ height: "1em", display: "block" }}>{i}</span>
        ))}
      </motion.span>
    </span>
  );
}

export function OdometerCount({ to, suffix = "", decimals = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  const formatted = decimals > 0 ? to.toFixed(decimals) : String(Math.floor(to));
  const chars = (formatted + suffix).split("");

  return (
    <span ref={ref} style={{ display: "inline-flex", alignItems: "flex-end" }}>
      {chars.map((char, i) => (
        <OdometerDigit key={i} digit={char} inView={inView} delay={i * 0.07} />
      ))}
    </span>
  );
}
