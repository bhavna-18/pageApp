import React, { Component } from "react";

import Routes from "./routes";
import Header from "./components/Header";

class App extends Component {

  render() {
    return (
        <div>
          <Header />
          <div style={{ paddingTop: '71px' }}>
            <Routes />
          </div>
        </div>
    );
  }
}

export default App;
