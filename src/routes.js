import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import FirstPage from "./container/FirstPage";
import SecondPage from "./container/SecondPage";
class Routes extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={FirstPage}></Route>
          <Route path="/image" component={SecondPage}></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
