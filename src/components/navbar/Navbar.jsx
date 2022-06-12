import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import LocaleContext from "../../LocaleContext";
import i18n from "../../i18n";
import arFlag from "../../locales/es/es-AR.ico";
import enFlag from "../../locales/en/USA.ico";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);
  const { locale } = useContext(LocaleContext);
  const { dispatch } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);

  function changeLocale(l) {
    if (locale !== l) {
      i18n.changeLanguage(l);
    }
  }

  function traducir() {
    console.log("Cambiar l", locale);
    locale === "en" ? changeLocale("es") : changeLocale("en");
  }

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
  };

  // const handleRegister = async (e) => {};

  const handleLogin = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  const handleRegister = () => {
      navigate("/register");
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">Lungta Booking</span>
        <div className="navItems">
          <input
            className="navImgButton"
            type="image"
            onClick={() => traducir()}
            src={locale === "en" ? enFlag : arFlag}
          ></input>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          {user ? (
            <>{console.log(user.img)}
              <img
                src={
                  (typeof user.img === undefined ||
                  user.img === null ||
                  user.img === "")
                    ? "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                    : user.img
                }
                alt=""
                className="avatar"
              />
              <button onClick={handleLogout} className="navButton">
                {user.username}
              </button>
            </>
          ) : (
            <>
              <button onClick={handleRegister} className="navButton">
                {t("register")}
              </button>
              <button onClick={handleLogin} className="navButton">
                {t("login")}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
