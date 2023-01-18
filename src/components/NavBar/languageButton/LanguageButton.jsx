import moment from "moment";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setLanguage } from "../../../features/search/searchSlice";
import {
  updateMomentLocaleToArabic,
  updateMomentLocaleToEng,
  lngs,
} from "../../../helpers";

const LanguageButton = ({ i18n, t }) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    isOpen: false,
  });
  const menuClass = `dropdown-menu${state.isOpen ? " show" : ""}`;
  const toggleOpen = () => setState({ isOpen: !state.isOpen });
  return (
    <>
      <div className="language-button" onClick={toggleOpen}>
        <button
          style={{ background: "#3e0292" }}
          className="btn btn-secondary"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span style={{ color: "white" }}>{t("language")}</span>
        </button>

        <div
          className={menuClass}
          aria-labelledby="dropdownMenuButton"
          x-placement="bottom-start"
          style={{
            position: "absolute",
            transform: "translate3d(-1px, 45px, 0px)",
            top: "0px",
            willChange: "transform",
            zIndex: "1000 !important",
          }}
        >
          {Object.keys(lngs).map((lng) => (
            <div
              key={lng}
              className="dropdown-item"
              onClick={() => {
                i18n.changeLanguage(lng);
                localStorage.setItem("lang", lng);
                dispatch(setLanguage(lng));
                if (lng === "ar") {
                  updateMomentLocaleToArabic();
                } else {
                  updateMomentLocaleToEng();
                  moment.locale(lng);
                }
              }}
            >
              {lng === "ar" ? (
                <img
                  style={{ width: "30px", height: "30px" }}
                  src="./images/saudi-icon.svg"
                  alt="saudi"
                />
              ) : (
                <img
                  style={{ width: "30px", height: "30px" }}
                  src="./images/uk-flag-icon.svg"
                  alt="eng"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LanguageButton;
