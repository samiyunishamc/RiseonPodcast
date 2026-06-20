import { Link } from "react-router-dom";

const variants = {
  primary: "btn btn-primary",
  secondary: "btn btn-secondary",
  ghost: "btn btn-ghost",
  dark: "btn btn-dark",
};

const sizes = {
  sm: "btn-sm",
  md: "",
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  to,
  href,
  type = "button",
  className = "",
  ...props
}) => {
  const classes = `${variants[variant]} ${sizes[size]} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noreferrer" {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
