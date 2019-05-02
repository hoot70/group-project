import React from "react";
import "../css/location.css";
import { NavLink } from "react-router-dom";
import * as firebase from "firebase";
import Home from "./home";

const database = firebase.database();
// let restaurants = []

// fetch("https://developers.zomato.com/api/v2.1/search?q={this.state.location}", {
//       headers: { "user-key": "353df7cd3c0ea42ca7228a954662f51b" },
//     })
//       .then(function(response) {
//         return response.json();
//       })
//       .then(function(myJson) {
//         restaurants = myJson;
//         return restaurants;
//       });
  

class Location extends React.Component {
  constructor() {
    super();
    this.state = {
      location: "",
      menu: "",
    };
  }
  componentDidMount() {
    const textRef = database.ref("location/");

    textRef.on("value", snapshot => {
      this.setState({
        location: snapshot.val(),
      });
    });
  }

  render() {
    return (
      <div className="location">
        <h1>Welcome to {this.state.location}</h1>
        <div>
          Enter The Cuisine You Are Looking For
          <br />
          <input type="text" name="inputText" />
          {/* <p>{restaurants}</p> */}
        </div>
        <NavLink to="/results">Submit</NavLink>
      </div>
    );
  }
}
export default Location;
