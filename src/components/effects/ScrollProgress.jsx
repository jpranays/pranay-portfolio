import { useScroll, motion } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[100] bg-gradient-to-r from-orange-500 to-amber-400"
      aria-hidden="true"
    />
  );
}
