import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Resault from "./pages/resaults";
import Search from "./pages/search";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Cookies from "js-cookie";
import uniqid from "uniqid";
// import LanguageToggle from "../src/components/LanguageToggle";

const App = () => {
  useEffect(() => {
    const getID = Cookies.get("id");
    if (!getID) {
      let userId = uniqid("userId-");
      Cookies.set("id", userId);
    }
  }, []);

  const [language, setLanguage] = useState({
    lang: "arabic",
  });
  const handleLang = (lang, value) => {
    setLanguage({
      ...language,
      [lang]: value,
    });
  };

  // console.log(arabic);

  // if (language.lang === "English") setArabic(false);

  return (
    <>
      {/* <LanguageToggle /> */}
      <select
        // className="custom-select"
        // value={language}
        onChange={(e) => handleLang("lang", e.target.value)}
      >
        <option value="arabic">Arabic</option>
        <option value="english">English</option>
      </select>
      <Provider store={store}>
        <Router basename="/">
          <div className="App">
            <Switch>
              <Route exact path="/results">
                <Resault language={language.lang.toString()} />
              </Route>
              <Route exact path="/">
                <Search lan={language.lang} />
              </Route>
            </Switch>
          </div>
        </Router>
      </Provider>
    </>
  );
};

export default App;
