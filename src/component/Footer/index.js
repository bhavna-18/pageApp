import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import "./style.css";
const data = require("../../utilities/footerData");
let arr = [];

export default class Header extends Component {
  renderFooterItems() {
    let items = data.footer;
    for (let i = 0; i < items.length; i++) {
      arr.push(
        <span className="outer-container-right">
          <a className="link-style" href="https://www.google.com">
            {items[i].name}
          </a>
        </span>
      );
    }
    return arr;
  }

  render() {
    return (
      <div className="firstContainer">
        <div className="row link-container justify-content-between">
          <div>
            <header className="header-footer-styling">
              <nav>
                <ul className="ul-footer-container">
                  <li className="li-footer-container">
                    <Link className="link-style" to="/aboutus">
                      About Us
                    </Link>{" "}
                  </li>
                  <li className="li-footer-container">
                    <Link className="link-style" to="/FAQ">
                      FAQ{" "}
                    </Link>
                  </li>
                </ul>
              </nav>
            </header>
            <span>
              <img
                src={require("../../assets/facebook.png")}
                className="social-image-first"
                alt="facebook"
              />
              <img
                src={require("../../assets/linkdin.png")}
                className="social-image-rest"
                alt="linkdin"
              />
              <img
                src={require("../../assets/twitter.png")}
                className="social-image-rest"
                alt="twitter"
              />
            </span>
            <span className="mid-container">
              <img
                src={require("../../assets/apple_store.png")}
                className="store-image-rest"
                alt="app-store"
              />
              <img
                src={require("../../assets/playstore.png")}
                className="store-image-rest"
                alt="playstore"
              />
            </span>
            <header className="right-side">
              <nav>
                <ul className="ul-footer-container">
                  {this.renderFooterItems()}
                </ul>
              </nav>
            </header>
          </div>
        </div>
      </div>
    );
  }
}
