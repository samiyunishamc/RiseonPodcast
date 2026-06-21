import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";

const AnimatedCounter = ({ value, duration = 1.4 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!isInView) return;
    const numeric = Number.parseInt(String(value).replace(/\D/g, ""), 10);
    if (Number.isNaN(numeric)) {
      setDisplay(value);
      return;
    }

    const suffix = String(value).replace(/[\d]/g, "");
    let start = 0;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      const eased = 1 - (1 - progress) ** 3;
      start = Math.round(numeric * eased);
      setDisplay(`${start}${suffix}`);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="stat-value">
      {display}
    </span>
  );
};

export default AnimatedCounter;
