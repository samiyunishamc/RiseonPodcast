import { motion } from "framer-motion";

const FadeIn = ({
  children,
  className = "",
  delay = 0,
  y = 20,
  once = true,
  as = "div",
}) => {
  const Component = motion[as] || motion.div;

  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </Component>
  );
};

export default FadeIn;
