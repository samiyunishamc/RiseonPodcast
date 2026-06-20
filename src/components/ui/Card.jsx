const Card = ({ children, className = "", interactive = false, as: Component = "article", ...props }) => (
  <Component className={`card ${interactive ? "card--interactive" : ""} ${className}`} {...props}>
    {children}
  </Component>
);

export default Card;
