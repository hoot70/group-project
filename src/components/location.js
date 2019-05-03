import React from "react";
import "../css/location.css";
import { NavLink } from "react-router-dom";
import * as firebase from "firebase";
import Home from "./home";
import { returnStatement } from "@babel/types";

const database = firebase.database();
  

class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      data: [],
      isLoaded: false
    };
  }
  async componentDidMount() {
    const textRef = database.ref("location/");

    textRef.on("value", async snapshot => {
      this.setState({
        location: snapshot.val(),
      });
      await fetch(`https://developers.zomato.com/api/v2.1/cities?q=${snapshot.val()}`, {
      headers: { 
        "user-key": "353df7cd3c0ea42ca7228a954662f51b",
        "Content-Type": "text/json",
     },
    })
      .then((response) => {
        return response.json();
      })
      .then(async (myJson) => {
        await fetch(`https://developers.zomato.com/api/v2.1/search?entity_id=${myJson.location_suggestions[0].id}&entity_type=city&count=20`, {
          headers: { 
            "user-key": "353df7cd3c0ea42ca7228a954662f51b",
            "Content-Type": "text/json",
         }
        }).then(res => {
          if (res.ok){
            return res.json()
          } else {
            throw Error(res.statusText);
          }
        })
        .then(json => {
          this.setState({
            data: json.restaurants,
            isLoaded: true
          })
        })
      });
    })
  }

  render() {
    console.log(this.state.data)
    return (
      <div className="location">
        <h1>Welcome to {this.state.location}</h1>
        <p>{this.state.data[0] ? this.state.data[0].restaurant.name : 'Loading...'}</p>
        <div>
          <br />
          <input type="text" name="inputText" />
        </div>
        <NavLink to="/results">Submit</NavLink>
      </div>
    );
  }
}
export default Location;