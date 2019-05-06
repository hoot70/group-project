import React from "react";
import "../css/location.css";
import { NavLink } from "react-router-dom";
import * as firebase from "firebase";
import Home from "./home";
import { returnStatement } from "@babel/types";
import Geocode from "react-geocode";
import { GoogleApiWrapper, InfoWindow, Map, Marker } from "google-maps-react";

const database = firebase.database();
const style = {
  width: "700px",
  height: "350px",
};

class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      data: [],
      isLoaded: false,
      lat: null,
      lng: null,
    };
  }

  

  async componentDidMount() {
    const textRef = database.ref("location/");

    textRef.on("value", async snapshot => {
      this.setState({
        location: snapshot.val(),
      });
      await fetch(
        `https://developers.zomato.com/api/v2.1/cities?q=${snapshot.val()}`,
        {
          headers: {
            "user-key": "353df7cd3c0ea42ca7228a954662f51b",
            "Content-Type": "text/json",
          },
        }
      )
        .then(response => {
          return response.json();
        })
        .then(async myJson => {
          await fetch(
            `https://developers.zomato.com/api/v2.1/search?entity_id=${
              myJson.location_suggestions[0].id
            }&entity_type=city&count=20`,
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
                data: json.restaurants,
                isLoaded: true,
              });
            });
        });
      Geocode.setApiKey("AIzaSyCifmubhS9MPSr0F6DMjJw2izXGa4SlPE8");
      Geocode.fromAddress(`${snapshot.val()}`).then(
        response => {
          const { lat, lng } = response.results[0].geometry.location;
          this.setState({
            lat: lat,
            lng: lng,
          });
        },
        error => {
          console.error(error);
        }
      );
      
    });
  }

  render() {
    console.log(this.state.data[0]);
    return (
      <div className="location">
        <h1>Welcome to {this.state.location}</h1>
        <div className="map-template">
          <Map
            google={this.props.google}
            zoom={12}
            style={style}
            center={{
              lat: this.state.lat,
              lng: this.state.lng,
            }}
          >
            {Object.keys(this.state.data).map((item, i) => (
              <Marker
                key={i}
                name={this.state.data[item].restaurant.name}
                position={{
                  lat: this.state.data[item].restaurant.location.latitude,
                  lng: this.state.data[item].restaurant.location.longitude,
                }}
              >
              </Marker>
            ))}
          </Map>
        </div>
        <table>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Restaurant Type</th>
          </tr>
          {Object.keys(this.state.data).map((item, i) => (
            <tbody>
              <tr className="restaurants-input" key={i}>
                <a
                  href={this.state.data[item].restaurant.menu_url}
                  target="_blank"
                >
                  <td>
                    {this.state.data[item].restaurant.name
                      ? this.state.data[item].restaurant.name
                      : "Loading..."}
                  </td>
                </a>
                <td>
                  {this.state.data[item].restaurant.location.address
                    ? this.state.data[item].restaurant.location.address
                    : "Loading..."}
                </td>
                <td>
                  {this.state.data[item].restaurant.cuisines
                    ? this.state.data[item].restaurant.cuisines
                    : "Loading..."}
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyCifmubhS9MPSr0F6DMjJw2izXGa4SlPE8",
})(Location);
