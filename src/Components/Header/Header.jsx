import style from "./Header.module.css";
import logo from "./../../assets/images/logo.svg";
import photo from "./../../assets/images/photo.svg";
import notify from "./../../assets/images/notify.svg";
import line from "./../../assets/images/line.svg";
import bell from "./../../assets/images/Vector.svg";

const Header = () => {
  return (
    <div className={style.header}>
      <div className={style.wrapper}>
        <img src={logo} alt="logo" />

        <div className={style.menuBlock}>
          <ul className={style.navHeader}>
            <li className={style.liHeader}>Меню</li>
            <li className={style.liHeader}>Вопросы и ответы</li>
            <li className={style.liHeader}>Об АИС</li>
          </ul>
        </div>

        <div className={style.menuBlock}>
          <button>
            <img src={notify} alt="notify" />
          </button>
          <img src={line} alt="line" />
          <button>
            <img src={photo} alt="photo" />
          </button>
          <div className={style.sign}></div>

          <button className={style.signText}>
            {" "}
            <div>Вход в аккаунт</div>
            <img src={bell} alt="bell" className={style.bell} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Header;
