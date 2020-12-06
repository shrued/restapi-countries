import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Temp from "./components/temp/index";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/countries" component={Temp} />
          <Route path="/">
            <Redirect to="/countries" />
          </Route>
        </Switch>
      </Router>
    );
  }
}
export default App;
