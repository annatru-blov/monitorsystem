import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import style from "./../Login/Login.module.css";
import styleReg from "./RegistrationForm.module.css";
import eye from "./../../assets/images/eye-slash.png";
import right from "./../../assets/images/right.svg";

function RegistrationForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  let [cardOpen, setCardOpen] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setMessage("Registration successful!");
        navigate("/");
      } else {
        const data = await response.json();
        setMessage(data.message || "Registration failed.");
      }
    } catch (error) {
      setMessage("Internal Server Error");
    }
  };

  return (
    <>
      <Header />
      <div className={style.main}>
        <div className={style.wrapper}>
          <div className={style.blockReturn}>
            <img className={style.back} src={right} alt="right" />
            <div className={style.back}>Вернуться на главную</div>
          </div>
          <div className={style.blockLogin}>
            <div className={style.titleText}>Регистрация</div>
            <div className={style.blockInputLogin}>
              <div className={style.inputText}>Логин</div>
              <input
                type="text"
                name="Логин"
                className={style.input}
                id="username"
                value={username}
                placeholder="Введите логин"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className={style.blockInputPassword}>
              <div className={style.inputText}>Пароль</div>
              <input
                name="Пароль"
                className={`${style.input} ${style.inputClosed}`}
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="Введите пароль"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className={style.showHideButton}
                onClick={() => setShowPassword((prev) => !prev)}
                type="button"
              >
                <img
                  src={eye}
                  alt={showPassword ? "Скрыть пароль" : "Показать пароль"}
                />
              </button>
            </div>
            <button className={styleReg.saveButton} onClick={handleRegister}>
             Зарегистрироваться
            </button>
            <button className={style.usefulAvto}>
              Авторизация с использованием ЕС ИФЮЛ
            </button>
            {message && <p>{message}</p>}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
export default RegistrationForm;
