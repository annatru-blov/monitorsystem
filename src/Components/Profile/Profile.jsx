import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import style from "./Profile.module.css";
import Input from "./../input/input";
import right from "./../../assets/images/right.svg";
import styleHeader from "./../Header/Header.module.css";
import logo from "./../../assets/images/logo.svg";
import notify from "./../../assets/images/notify.svg";
import line from "./../../assets/images/line.svg";
import bell from "./../../assets/images/Vector.svg";
import eye from "./../../assets/images/eye-slash.png";

import { useParams } from "react-router-dom";


const Profile = (props) => {
  const { userId } = useParams();

  const onSaveClick = async () => {
    const profileData = {
      user_id: userId,
      firstName: props.firstName,
      surname: props.surname,
      middleName: props.middleName,
      identificationNumber: props.identificationNumber,
      login: props.login,
      email: props.email,
      mobileNumber: props.mobileNumber,
    };

    console.log("profileData - ", profileData);
    try {
      const response = await fetch("/updateProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        console.log("Имя профиля успешно обновлено");
      } else {
        console.error(
          "Ошибка при обновлении имени профиля:",
          response.statusText
        );
      }
    } catch (error) {
      console.error(
        "Ошибка при отправке запроса на обновление имени профиля:",
        error
      );
    }
  };
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  console.log(props);
  console.log(props.login);

  let onNewDataChange = (fieldName, e) => {
    let body = e.target.value;
    console.log(body);
    props.setProfileData({ ...props, [fieldName]: body });
  };
  let [cardOpen, setCardOpen] = useState(false);

  return (
    <>
      <div className={styleHeader.header}>
        <div className={styleHeader.wrapper}>
          <img src={logo} alt="logo" />

          <div className={styleHeader.menuBlock}>
            <ul className={styleHeader.navHeader}>
              <li className={styleHeader.liHeader}>Меню</li>
              <li className={styleHeader.liHeader}>Вопросы и ответы</li>
              <li className={styleHeader.liHeader}>Об АИС</li>
            </ul>
          </div>
          <div className={styleHeader.menuBlock}>
            <button>
              <img src={notify} alt="notify" />
            </button>
            <img src={line} alt="line" />
            <div className={style.imageCircle}></div>
            <div className={styleHeader.sign}></div>
            <button className={styleHeader.signText}   onClick={() => setCardOpen((cardOpen = !cardOpen))}>
              <div>{props.firstName}</div>
              <div>{props.surname}</div>
              <img src={bell} alt="bell" className={styleHeader.bell} />
            </button>
            {cardOpen && (
          <div className={style.shopCard}>
              <div className={style.linkMenuWindow}>
            <li>
              <Link className={style.linkText} to="/systemtable">Личный кабинет</Link>
            </li>
            <li>
              <Link className={style.linkText} to={`/profile/${userId}`}>Профиль</Link>
            </li>
            </div>
          </div>
        )}
          </div>
        </div>
      </div>
    
      <div className={style.main}>
        <div className={style.wrapper}>
          <div className={style.blockNavTable}>
            <div className={style.navRight}>
              <div className={style.mainNav}>
                <img className={style.mainTextNav} src={right} alt="right" />
                <div className={style.mainTextNav}>Главная</div>
              </div>
              <div className={style.mainNav}>
                <img className={style.mainTextNav} src={right} alt="right" />
                <div className={style.mainTextNav}>Профиль</div>
              </div>
            </div>
            <div className={style.blockProfileNav}>
              <div className={style.profileText}>Профиль</div>

              <div className={style.profileBlockData}>
                <div className={style.imageCircle}></div>
                <div className={style.profileText}>{props.firstName}</div>
                <div className={style.profileText}>{props.surname} </div>
                <button className={style.buttonActive}>Активный</button>
                <button className={style.buttonUser}>Пользователь</button>
              </div>
            </div>
          </div>

          <div className={style.block}>
            <div className={style.line}></div>
            <div className={style.textData}>Личные данные</div>
            <div className={style.inputBlockData}>
              <Input
                className={style.input}
                value={props.firstName !== null ? props.firstName : ""}
                name="Имя*"
                placeholder="Введите имя"
                onChange={(e) => onNewDataChange("firstName", e)}
              />

              <Input
                className={style.input}
                value={props.surname !== null ? props.surname : ""}
                name="Фамилия*"
                placeholder="Введите фамилию"
                onChange={(e) => onNewDataChange("surname", e)}
              />
              <Input
                className={style.input}
                placeholder="Введите отчество"
                name="Отчество*"
                onChange={(e) => onNewDataChange("middleName", e)}
                value={props.middleName !== null ? props.middleName : ""}
              />
              <Input
                className={style.input}
                placeholder="Введите идентификационный номер"
                value={
                  props.identificationNumber !== null
                    ? props.identificationNumber
                    : ""
                }
                name="Идентификационный номер*"
                onChange={(e) => onNewDataChange("identificationNumber", e)}
              />
              <Input
                className={style.input}
                placeholder="Введите логин"
                name="Логин*"
                onChange={(e) => onNewDataChange("login", e)}
                value={props.login !== null ? props.login : ""}
              />
            </div>
            <div className={style.line}></div>
            <div className={style.contactText}>Контакты</div>
            <div className={style.inputBlockContact}>
              <Input
                className={style.input}
                placeholder="agsr@mail.ru"
                name="Адресс электроной почты"
                onChange={(e) => onNewDataChange("email", e)}
                value={props.email !== null ? props.email : ""}
              />
              <Input
                className={style.input}
                placeholder="+375 29 123 44 55"
                name="Мобильный номер"
                onChange={(e) => onNewDataChange("mobileNumber", e)}
                value={props.mobileNumber !== null ? props.mobileNumber : ""}
              />
            </div>
            <div className={style.line}></div>

            <div className={style.contactText}>Пароль</div>
            <div className={style.inputText}>Текущий пароль</div>
            <input
              onChange={(e) => setPassword(e.target.value)}
             // onChange={(e) => onNewDataChange("password", e)}
              id="password"
              type={showPassword ? "text" : "password"}
              name="Текущий пароль"
              className={`${style.input} ${style.inputClosed}`}
              value={password}
              placeholder="Введите пароль"
            />
                  <button
                className={style.showHideButton}
                onClick={() => onNewDataChange((prev) => !prev)}
                type="button"
              >
                <img
                  src={eye}
                  alt={showPassword ? "Скрыть пароль" : "Показать пароль"}
                />
              </button>

            <div className={style.inputBlockContact}>
              <div>
                <div className={style.inputText}>Новый пароль</div>
                <input
                  //onChange={(e) => onNewDataChange("newPassword", e)}
                  name="Новый пароль"
                  className={`${style.input} ${style.inputClosed}`}
                  //value={props.newPassword}
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
              <div>
                <div className={style.inputText}>Подтвердите пароль</div>
                <input
                 onChange={(e) => setPassword(e.target.value)}
                  //onChange={(e) => onNewDataChange("newPassword", e)}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="Подтвердите пароль"
                  className={`${style.input} ${style.inputClosed}`}
                  value={props.newPassword}
                  placeholder="Введите пароль"
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
            </div>
            <div className={style.line}></div>
            <button className={style.saveButton} onClick={onSaveClick}>
              Сохранить
            </button>
            <div className={style.line}></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
