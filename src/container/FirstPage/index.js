import React, { Component } from "react";
import "./style.css";
import Footer from "../../component/Footer";
import StarRatingComponent from "react-star-rating-component";

const data = require("../../utilities/data");
let array = [];
export default class FirstPage extends Component {
  performAction(value) {
    console.log("clicked");

    window.location.href = `/image`;
  }
  onStarClick() {
    console.log("star changed");
  }
  renderItems() {
    let jsonObject = data.data;
    for (let i = 0; i < jsonObject.length; i++) {
      array.push(
        <div className="outerContainer">
          <img
            src={jsonObject[i].image}
            alt={jsonObject[i].altName}
            className="imageIcon"
            onClick={this.performAction}
          />
          <div className="heading">
            <span className="name"> {jsonObject[i].heading}</span>
            <span className="ratingContainer">
              <StarRatingComponent
                starCount={5}
                name={"ratings"}
                value={jsonObject[i].rating}
                onStarClick={this.onStarClick.bind(this)}
              />
              <span className="rating">{jsonObject[i].rating}</span>
            </span>
          </div>
          <div className="locationText">{jsonObject[i].location}</div>

          <div className="innerContainer">
            <div>{jsonObject[i].voucherType}</div>
            <div>{jsonObject[i].discount}</div>
            <div>{jsonObject[i].offers}</div>
          </div>
          <div className="bottomView">
            <span>
              <img
                src={require("../../assets/heart.png")}
                alt="pasta"
                className="heartIcon"
              />
            </span>
            <span>
              <a href={jsonObject[i].url} target="_blank" className="buyButton">
                buy
              </a>
            </span>
          </div>
        </div>
      );
    }
    return array;
  }

  render() {
    return (
      <div style={{ flex: 1 }}>
        {this.renderItems()}
        <div className="footer-container">
          <Footer />
        </div>
      </div>
    );
  }
}
