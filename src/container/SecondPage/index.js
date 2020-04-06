import React, { Component } from "react";
import "./style.css";

export default class SecondPage extends Component {
  render() {
    return (
      <div>
        <img
          src={require("../../assets/pasta.jpeg")}
          alt="static image"
          className="staticImage"
        />
      </div>
    );
  }
}
