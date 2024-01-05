import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import style from "./SystemTable.module.css";
import right from "./../../assets/images/right.svg";
import search from "./../../assets/images/search.svg";
import close from "./../../assets/images/closed.svg";
import Table from "./Table";
import styleHeader from "./../Header/Header.module.css";
import logo from "./../../assets/images/logo.svg";
import notify from "./../../assets/images/notify.svg";
import line from "./../../assets/images/line.svg";
import bell from "./../../assets/images/Vector.svg";
import { Link } from "react-router-dom";

function SystemTable({ userId, firstName, lastName, logout }) {
  const [userData, setUserData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(null);
  let [cardOpen, setCardOpen] = useState(false);

  console.log(firstName);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/getDataByUserId", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: userId }),
        });

        const data = await response.json();
        console.log("Server response:", data);
        setUserData(data.data);
      } catch (error) {
        console.error("Ошибка при получении данных по user_id:", error);
      }
    };

    fetchData();
  }, [userId]);

  const handleShowButtonClick = () => {
    if (searchTerm.trim() === "") {
      setFilteredData(null);
    } else {
      const filtered = userData.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };
  const handleClearFilter = () => {
    setSearchTerm("");
    setFilteredData(null);
  };
  const onLogoutClick = () => {
    logout(); 
  };
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
            <button className={styleHeader.signText}>
              <div>{firstName}</div>
              <div>{lastName}</div>
              <button className={styleHeader.bell} onClick={() => setCardOpen((cardOpen = !cardOpen))}>
          <img src={bell} alt="bell" />
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
            <li>
              <Link className={style.linkText} onClick={onLogoutClick}>Выход</Link>
            </li>
            </div>
          </div>
        )}
            </button>
          </div>
        </div>
      </div>
      <div className={style.systemTable}>
        <div className={style.wrapper}>
          <div className={style.blockNavTable}>
            <div className={style.navRight}>
              <div className={style.mainNav}>
                <img className={style.mainTextNav} src={right} alt="right" />
                <div className={style.mainTextNav}>Главная</div>
              </div>
              <div className={style.mainNav}>
                <img className={style.mainTextNav} src={right} alt="right" />
                <div className={style.mainTextNav}> Личный кабинет</div>
              </div>
            </div>
            <div className={style.blockProfileNav}>
              <div className={style.profileText}>Личный кабинет</div>
              <ul className={style.navList}>
                <li className={style.tableMenu}>Реестры</li>
                <li className={style.tableMenu}>Электронные сервисы</li>
                <li className={style.tableMenu}>Потребление данных</li>
                <li className={style.tableMenu}>Справочники</li>
                <li className={style.tableMenu}>Отчёты</li>
              </ul>
            </div>
          </div>
          <div className={style.wrapperTable}>
            <div className={style.blockTable}>
              <div className={style.blockInputSearch}>
                <div className={style.textMetadata}>
                  Выбор ИС/СР для внесения метаданных
                </div>
                <div className={style.blockSearch}>
                  <div className={style.inputMetadata}>
                    <img src={search} alt="search" />
                    <input
                      className={style.inputSearch}
                      type="text"
                      placeholder="Выберите ИС/СР для внесения метаданных..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <img
                      src={close}
                      alt="close"
                      onClick={handleClearFilter}
                      className={style.searchButtonClose}
                    />
                  </div>
                  <button
                    className={style.searchBut}
                    onClick={handleShowButtonClick}
                  >
                    Показать
                  </button>
                </div>
              </div>
              <div className={style.blockButton}>
                <button className={style.listLook}>Просмотр ИС/ИР</button>
                <button className={style.listLook}>Доп сведения ИС/ИР</button>
                <button className={style.addBut}>Добавить</button>
              </div>
              <Table data={filteredData || userData} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SystemTable;
