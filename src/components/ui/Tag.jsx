const Tag = ({ children, variant = "default" }) => {
  const variantClass = variant === "warm" ? "tag tag--warm" : variant === "muted" ? "tag tag--muted" : "tag";
  return <span className={variantClass}>{children}</span>;
};

export default Tag;
