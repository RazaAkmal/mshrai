import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Resault from "./pages/resaults";
import Search from "./pages/search";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Cookies from "js-cookie";
import uniqid from "uniqid";
import "./i18n";
import { useTranslation, Trans } from "react-i18next";

const lngs = {
  ar: { nativeName: "Arabic" },
  en: { nativeName: "English" },
};

const App = () => {
  useEffect(() => {
    const getID = Cookies.get("id");
    if (!getID) {
      let userId = uniqid("userId-");
      Cookies.set("id", userId);
    }
  }, []);

  const { t, i18n } = useTranslation();

  const [state, setState] = useState({
    isOpen: false,
  });

  const menuClass = `dropdown-menu${state.isOpen ? " show" : ""}`;
  const toggleOpen = () => setState({ isOpen: !state.isOpen });

  return (
    <>
      {/* <div>
        {Object.keys(lngs).map((lng) => (
          <button
          className="lang-link"
            key={lng}
            style={{
              fontWeight: i18n.resolvedLanguage === lng ? "bold" : "normal",
            }}
            type="submit"
            onClick={() => {
              i18n.changeLanguage(lng)
              localStorage.setItem('lang', lng)
            }}
          >
            {lngs[lng].nativeName}
          </button>
        ))}
      </div> */}

      <div className="language-button" onClick={toggleOpen}>
        <button
          className="btn btn-secondary bg-white"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span style={{color: 'black'}}>Language</span>
        </button>
        <div
          className={menuClass}
          aria-labelledby="dropdownMenuButton"
          x-placement="bottom-start"
          style={{
            position: "absolute",
            transform: "translate3d(-1px, 36px, 0px)",
            top: "0px",
            left: "0px",
            willChange: "transform",
            zIndex: '1000 !important'
          }}
        >

          {Object.keys(lngs).map((lng) => (
            <div
              className="dropdown-item"
              onClick={() => {
                i18n.changeLanguage(lng)
                localStorage.setItem('lang', lng)
              }}
            >
              {lngs[lng].nativeName}
            </div>

          ))}
        </div>
      </div>

      <Provider store={store}>
        <Router basename="/">
          <div className="App">
            <Switch>
              <Route exact path="/results">
                <Resault />
              </Route>
              <Route exact path="/">
                <Search />
              </Route>
            </Switch>
          </div>
        </Router>
      </Provider>
    </>
  );
};

export default App;
