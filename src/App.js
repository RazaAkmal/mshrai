import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Resault from "./pages/resaults";
import Search from "./pages/search";

function App() {
  return (
    <Router basename="/website">
      <div className="App">
        <Switch>
          <Route exact path="/resaults">
            <Resault />
          </Route>
          <Route exact path="/">
            <Search />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
