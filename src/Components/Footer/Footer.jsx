import style from "./Footer.module.css";
import logo from "./../../assets/images/logo.svg";
import bank from "./../../assets/images/bank.svg";

const Footer = () => {
  return (
    <div className={style.footer}>
      <div className={style.wrapper}>
        <div className={style.blockInfo}>
          <div className={style.blockLogo}>
            <img src={logo} alt="logo" />
            <div className={style.textNumber}>
              Автоматизированная информационная <br />
              система «Реестры»
            </div>
            <div className={style.textNumber}>
              © АИС «Реестры», 2022. <br /> Все права защищены.
            </div>
          </div>

          <div className={style.blockSupport}>
            <div className={style.textFooter}>Техническая поддержка</div>
            <div className={style.textNumber}>+375 25 111 22 33</div>
            <div className={style.textNumber}>
              +375 29 222 44 55 <div />
              <div className={style.textNumber}>dev@agsr.by</div>
              <div className={style.helpper}>Связаться с поддержкой</div>
            </div>
          </div>
          <div className="blockContact">
            <div className={style.textFooter}>Контакты</div>
            <div className={style.textNumber}>+375 33 112 22 45</div>
            <div className={style.textNumber}>+375 29 222 44 88</div>
            <div className={style.textNumber}>dev@agsr.by</div>
            <div className={style.textNumber}>
              г. Минск, ул. К.Цеткин, д. 24-705
            </div>
          </div>
        </div>

        <div className={style.blockSlide}>
          <div className={style.bankBlock}>
            <img src={bank} alt="bank" />
            <button className={style.buttonFooter}>Условный партнер</button>
            <button className={style.buttonFooter}>Условный партнер</button>
            <button className={style.buttonFooter}>Условный партнер</button>
            <button className={style.buttonFooter}>Условный партнер</button>
          </div>
        </div>
        <div className={style.finalText}>
          © АИС «Реестры» <br /> Разработчк: ОАО «Агентство сервисизации
          и реинжиниринга» (г. Минск, ул. К. Цеткин, д. 24–705 dev@agsr.by)
        </div>
      </div>
    </div>
  );
};
export default Footer;
