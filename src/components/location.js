import React from "react";
import "../css/location.css";
import { NavLink } from "react-router-dom";
import * as firebase from "firebase";
import Home from "./home";
import { argumentPlaceholder } from "@babel/types";

const database = firebase.database();
 

class Location extends React.Component {
  constructor() {
    super();
    this.state = {
      location: "",
    };
  }
  componentDidMount() {
    const textRef = database.ref("location/");

    textRef.on("value", snapshot => {
      this.setState({
        location: snapshot.val(),
      });

      fetch(`https://developers.zomato.com/api/v2.1/cities?q=${snapshot.val()}`, {
      headers: { 
        "user-key": "353df7cd3c0ea42ca7228a954662f51b",
        "Content-Type": "text/json",
     },
    })
      .then(function(response) {
        return response.json();
      })
      .then(async function(myJson) {
        console.log(myJson);
        fetch(`https://developers.zomato.com/api/v2.1/search?entity_id=${myJson.location_suggestions[0].id}&entity_type=city`, {
          headers: { 
            "user-key": "353df7cd3c0ea42ca7228a954662f51b",
            "Content-Type": "text/json",
         }
        }).then(function(response1) {
          return response1.json();
        })
        .then(function(myJson) {
          console.log(myJson)
        })
      })
    });
    }
    
    writeData = e => {
      e.preventDefault();
      const menuValue = e.target.elements.menuLocation.value;
      database.ref('menu/').set(menuValue, function(error){
        error ? alert('error') : console.log('Good Job!')})
        this.props.history.push('/results');
    }
  
  
 render() {
    return (
      <div className="location">
        <h1>Welcome to {this.state.location}</h1>
        <div>
          Enter The Cuisine You Are Looking For
          <br />
          <form onSubmit={this.writeData.bind(this)}>
     <input type="text" name="menuLocation" />
     <button type='submit'>Submit</button>
     </form>
        </div>
      </div>
    );
  }
}
export default Location;
