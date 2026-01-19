import { useState } from "react";

import "./App.css";
import { Signin, Signup, type SigninData, type SignupData } from "./components";

export const App = () => {
  const [activeForm, setActiveForm] = useState<"signin" | "signup">("signin");

  const handleSigninSubmit = (data: SigninData) => {
    console.log("Signin данные:", data);
    alert(`Вход выполнен!\nEmail: ${data.email}`);
  };

  const handleSignupSubmit = (data: SignupData) => {
    console.log("Signup данные:", data);
    alert(
      `Регистрация успешна!\nИмя: ${data.name}\nНик: ${data.nickname}\nEmail: ${data.email}`,
    );
  };

  return (
    <div className="app">
      <div className="app-container">
        <div className="tabs">
          <button
            className={`tab ${activeForm === "signin" ? "active" : ""}`}
            onClick={() => setActiveForm("signin")}
          >
            Вход
          </button>
          <button
            className={`tab ${activeForm === "signup" ? "active" : ""}`}
            onClick={() => setActiveForm("signup")}
          >
            Регистрация
          </button>
        </div>

        <div className="form-container">
          {activeForm === "signin" ? (
            <Signin onSubmit={handleSigninSubmit} />
          ) : (
            <Signup onSubmit={handleSignupSubmit} />
          )}
        </div>
      </div>
    </div>
  );
};
