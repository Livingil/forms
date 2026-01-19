import type { ReactNode } from "react";

export type InputVariant = "default" | "filled" | "unstyled";
export type InputRadius = "xs" | "sm" | "md" | "lg" | "xl";
export type InputSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface InputProps {
  label?: string;
  placeholder?: string;
  description?: string;
  error?: string;

  children?: ReactNode;

  required?: boolean;
  disabled?: boolean;

  variant?: InputVariant;
  radius?: InputRadius;
  size?: InputSize;

  icon?: React.ReactNode;

  type?: string;
  value?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}
