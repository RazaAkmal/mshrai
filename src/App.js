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

// const lngs = {
//   sa: { nativeName: "Arabic" },
//   us: { nativeName: "English" },
// };

const App = () => {
  useEffect(() => {
    const getID = Cookies.get("id");
    if (!getID) {
      let userId = uniqid("userId-");
      Cookies.set("id", userId);
    }
  }, []);

  return (
    <>
      {/* <Navbar /> */}

      {/* <div>
        {Object.keys(lngs).map((lng) => (
          <button
            key={lng}
            style={{
              fontWeight: i18n.resolvedLanguage === lng ? "bold" : "normal",
            }}
            type="submit"
            onClick={() => i18n.changeLanguage(lng)}
          >
            {lngs[lng].nativeName}
          </button>
        ))}
      </div> */}

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
