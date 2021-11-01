import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Resault from "./pages/resaults";
import Search from "./pages/search";
import { Provider } from "react-redux";
import { store } from "./app/store";

function App() {
  return (
    <Provider store={store}>
    <Router basename="/website">
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
  );
}

export default App;
