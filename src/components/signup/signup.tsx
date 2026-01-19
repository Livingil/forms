import React, { useState } from "react";
import { FaUser, FaAt, FaEnvelope, FaLock, FaVenusMars } from "react-icons/fa";
import type { Gender, SignupData, SignupProps } from "./signup.types";
import { Input } from "../input/input";
import styles from "./signup.module.css";

export const Signup: React.FC<SignupProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<SignupData>({
    name: "",
    nickname: "",
    email: "",
    gender: "male",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Partial<SignupData>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof SignupData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleGenderChange = (gender: Gender) => {
    setFormData((prev) => ({
      ...prev,
      gender,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<SignupData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Имя обязательно";
    } else if (formData.name.length < 2) {
      newErrors.name = "Имя должно быть не менее 2 символов";
    }

    if (!formData.nickname.trim()) {
      newErrors.nickname = "Ник обязателен";
    } else if (!formData.nickname.startsWith("@")) {
      newErrors.nickname = "Ник должен начинаться с @";
    } else if (formData.nickname.length < 3) {
      newErrors.nickname = "Ник должен быть не менее 3 символов";
    }

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

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Подтвердите пароль";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Пароли не совпадают";
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
      <h2 className={styles.title}>Регистрация</h2>

      <Input
        label="Имя"
        name="name"
        placeholder="Ваше имя"
        value={formData.name}
        onChange={handleInputChange}
        icon={<FaUser size="0.8rem" />}
        required
        error={errors.name}
        variant="filled"
        size="md"
      />

      <Input
        label="Ник"
        name="nickname"
        placeholder="@username"
        value={formData.nickname}
        onChange={handleInputChange}
        icon={<FaAt size="0.8rem" />}
        required
        error={errors.nickname}
        description="Должен начинаться с символа @"
        variant="filled"
        size="md"
      />

      <Input
        label="Почта"
        type="email"
        name="email"
        placeholder="your@email.com"
        value={formData.email}
        onChange={handleInputChange}
        icon={<FaEnvelope size="0.8rem" />}
        required
        error={errors.email}
        variant="filled"
        size="md"
      />

      <Input label="Пол" required icon={<FaVenusMars size="0.8rem" />}>
        <div className={styles.radioOptions}>
          {(["male", "female", "other"] as Gender[]).map((gender) => (
            <label key={gender} className={styles.radioOption}>
              <input
                type="radio"
                name="gender"
                checked={formData.gender === gender}
                onChange={() => handleGenderChange(gender)}
                className={styles.radioInput}
              />
              <span className={styles.radioText}>
                {gender === "male"
                  ? "Мужской"
                  : gender === "female"
                    ? "Женский"
                    : "Другой"}
              </span>
            </label>
          ))}
        </div>
      </Input>

      <Input
        label="Пароль"
        type="password"
        name="password"
        placeholder="Придумайте пароль"
        value={formData.password}
        onChange={handleInputChange}
        icon={<FaLock size="0.8rem" />}
        required
        error={errors.password}
        description="Не менее 6 символов"
        variant="filled"
        size="md"
      />

      <Input
        label="Повторить пароль"
        type="password"
        name="confirmPassword"
        placeholder="Повторите пароль"
        value={formData.confirmPassword}
        onChange={handleInputChange}
        icon={<FaLock size="0.8rem" />}
        required
        error={errors.confirmPassword}
        variant="filled"
        size="md"
      />

      <button type="submit" className={styles.submitButton}>
        Зарегистрироваться
      </button>
    </form>
  );
};
