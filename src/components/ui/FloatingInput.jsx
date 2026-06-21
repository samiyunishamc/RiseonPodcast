import { useId, useState } from "react";

const FloatingInput = ({
  label,
  type = "text",
  value,
  onChange,
  required,
  placeholder = " ",
  error,
  as = "input",
  ...props
}) => {
  const id = useId();
  const [focused, setFocused] = useState(false);
  const hasValue = value && String(value).length > 0;
  const active = focused || hasValue;

  const shared = {
    id,
    className: `float-field ${error ? "float-field--error" : ""}`,
    value,
    onChange,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    placeholder,
    required,
    "aria-invalid": error ? "true" : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
    ...props,
  };

  return (
    <div className={`float-group ${active ? "float-group--active" : ""}`}>
      {as === "textarea" ? (
        <textarea {...shared} rows={4} />
      ) : (
        <input type={type} {...shared} />
      )}
      <label htmlFor={id} className="float-label">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {error && (
        <p id={`${id}-error`} className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default FloatingInput;
