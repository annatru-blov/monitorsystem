import React, { useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import style from "./Login.module.css";
import eye from "./../../assets/images/eye-slash.png";
import right from "./../../assets/images/right.svg";
import { Link } from "react-router-dom";
import { setProfileData } from "./../../redux/profile-reducer";
import { useDispatch } from "react-redux";

function Login({ onLogin }) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Вошли - ", data);
        console.log("id - ", data.user.id);
        setMessage("Login successful!");
        onLogin(
          data.user.id,
          data.user.login,
          data.user.password,
          data.user.first_name,
          data.user.last_name,
          data.user.middle_name,
          data.user.identification_number,
          data.user.email,
          data.user.phone_number
        );
        dispatch(
          setProfileData({
            login: data.user.login,
            password: data.user.password,
            middleName: data.user.middle_name,
            firstName: data.user.first_name,
            surname: data.user.last_name,
            password: data.user.password,
            middleName: data.user.middle_name,
            identificationNumber: data.user.identification_number,
            email: data.user.email,
            mobileNumber: data.user.phone_number,
          })
        );
      } else {
        const contentType = response.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          setMessage(
            data.message || "Login failed. Check your username and password."
          );
        } else {
          const text = await response.text();
          setMessage("Login failed. Unexpected server response.");
        }
      }
    } catch (error) {
      console.error("Error logging in:", error);
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
            <div className={style.titleText}>Вход</div>
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
            <button className={style.saveButton} onClick={handleLogin}>
              Вход
            </button>
            <button className={style.usefulAvto}>
              Авторизация с использованием ЕС ИФЮЛ
            </button>
            {message && <p>{message}</p>}
            <button className={style.usefulAvto}>
              <Link to="/registrationform" className={style.registration}>
                Регистрация
              </Link>
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
export default Login;
