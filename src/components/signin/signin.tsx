import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import type { SigninData, SigninProps } from "./signin.types";
import { Input } from "../input/input";
import styles from "./signin.module.css";

export const Signin: React.FC<SigninProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<SigninData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<SigninData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof SigninData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<SigninData> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email обязателен";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Введите корректный email";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Пароль обязателен";
    } else if (formData.password.length < 6) {
      newErrors.password = "Пароль должен быть не менее 6 символов";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Вход</h2>

      <Input
        label="Email"
        type="email"
        name="email"
        placeholder="your@email.com"
        value={formData.email}
        onChange={handleChange}
        icon={<FaEnvelope size="0.8rem" />}
        required
        error={errors.email}
        variant="filled"
      />

      <Input
        label="Пароль"
        type="password"
        name="password"
        placeholder="Ваш пароль"
        value={formData.password}
        onChange={handleChange}
        icon={<FaLock size="0.8rem" />}
        required
        error={errors.password}
        variant="filled"
      />

      <button type="submit" className={styles.submitButton}>
        Войти
      </button>
    </form>
  );
};
