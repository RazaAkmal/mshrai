import { Row, Container } from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavBarContext } from "../../context/NavActive";

import LanguageButton from "./languageButton/LanguageButton";
import DropDownContainer from "./userDropDown/DropDownContainer";

const NavBar = ({
  t,
  i18n,
  isLoggedIn,
  setRegisterModal,
  setIsInvalidCredentials,
  setValidationErrorLogIn,
  userDetails,
  logoutHandler,
}) => {
  const selectedLng = useSelector((state) => state.search.language);
  const { open, handleClick } = useNavBarContext();

  return (
    <div className="h-left ">
      <Container fluid className="d-flex ">
        <LanguageButton i18n={i18n} t={t} />
        <Link
          to="/blogs"
          className={`logo-header-link blog__link ${open && "active"}`}
        >
          {t("blogLink")}
        </Link>

        {!isLoggedIn ? (
          <div
            // className="login-link"
            className={`login-link logo-header-link`}
            onClick={() => {
              setRegisterModal(true);
              // resetFormLogin();
              setIsInvalidCredentials(null);
              setValidationErrorLogIn(null);
            }}
          >
            {t("Login")}
          </div>
        ) : (
          <DropDownContainer
            t={t}
            selectedLng={selectedLng}
            userDetails={userDetails}
            logoutHandler={logoutHandler}
          />

          // <div className="login-link" onClick={logoutHandler}>
          //   logout
          // </div>
        )}
        <div className="bars" onClick={handleClick}>
          <FaBars />
        </div>
      </Container>
    </div>
  );
};

export default NavBar;
