import React from "react";
import styles from "./Input.module.css";
import type { InputProps } from "./input.types";

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  description,
  error,
  required = false,
  disabled = false,
  children,
  variant = "default",
  radius = "md",
  size = "md",
  icon,
  type = "text",
  value,
  name,
  onChange,
  onBlur,
}) => {
  const inputClasses = [
    styles.input,
    styles[`variant-${variant}`],
    styles[`radius-${radius}`],
    styles[`size-${size}`],
    disabled ? styles.disabled : "",
    error ? styles.hasError : "",
    icon ? styles.withIcon : "",
  ]
    .filter(Boolean)
    .join(" ");

  const wrapperClasses = [
    styles.inputWrapper,
    disabled ? styles.wrapperDisabled : "",
  ]
    .filter(Boolean)
    .join(" ");

  const showIcon = icon && !children;

  return (
    <div className={wrapperClasses}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}> *</span>}
        </label>
      )}

      <div className={styles.inputContainer}>
        {showIcon && <span className={styles.icon}>{icon}</span>}

        {children ? (
          children
        ) : (
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            className={inputClasses}
          />
        )}
      </div>

      {description && !error && (
        <div className={styles.description}>{description}</div>
      )}

      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};
