import React from 'react';
import '../css/results.css';
import {NavLink} from 'react-router-dom';
import * as firebase from "firebase";
import { GoogleApiWrapper, InfoWindow, Map, Marker } from "google-maps-react";

const database = firebase.database();
const style = {
    width: "800px",
    height: "400px",
  };

class Results extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        id: '',
        data: [],
        isLoaded: false,
      };
    }
    async componentDidMount() {
        const textRef = database.ref("ID/");
        textRef.on("value", async snapshot => {
          this.setState({
            id: snapshot.val(),
          });
await fetch(
    `https://developers.zomato.com/api/v2.1/restaurant?res_id=${snapshot.val()}`,
    {
      headers: {
        "user-key": "353df7cd3c0ea42ca7228a954662f51b",
        "Content-Type": "text/json",
      },
    }
  )
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw Error(res.statusText);
      }
    })
    .then(json => {
      this.setState({
        data: json,
        isLoaded: true,
      });
    });
    console.log(this.state.data)
});
    }

render (){
    return(
     <div className="results">
     <div>
     <NavLink to="/location">Back</NavLink>
         <h1>{this.state.data.name}</h1>
         <div className="map-template">
         <img src={this.state.data.featured_image}></img>
         <br/>
         <br/>
         <Map
            google={this.props.google}
            zoom={17}
            style={style}
            center={{
              lat: this.state.data.location && this.state.data.location.latitude,
              lng: this.state.data.location && this.state.data.location.longitude,
            }}
            onClick={this.onMapClicked}
          >
          <Marker
          position={{
              lat: this.state.data.location && this.state.data.location.latitude,
              lng: this.state.data.location && this.state.data.location.longitude,
            }}>
              </Marker>
              </Map>
              </div>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <div className="textColor">
         <h2>{this.state.data.location && this.state.data.location.locality}</h2>
         <h2>{this.state.data.location && this.state.data.location.address}</h2>
         <h2>{this.state.data.cuisines}</h2>
         <h2>Average Cost for Two: {this.state.data.currency}{this.state.data.average_cost_for_two}</h2>
         </div>
         <br />
         <a href={this.state.data.url} target='_blank'><h2>Web Page</h2></a>
         <a href={this.state.data.menu_url} target='_blank'><h2>Menu Page</h2></a>
         <a href={this.state.data.photos_url} target='_blank'><h2>Photos</h2></a>
         <br />
         <NavLink to="/location">Back</NavLink>
     </div>
     </div>
    );
}
    }

export default GoogleApiWrapper({
    apiKey: "AIzaSyCifmubhS9MPSr0F6DMjJw2izXGa4SlPE8",
  })(Results);