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
  width: "800px",
  height: "400px",
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
      activeMarker: {},
    selectedPlace: {},
    showingInfoWindow: false
    };
  }

  onMarkerClick = (props, marker) =>
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true
    });

  onInfoWindowClose = () =>
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    });

  onMapClicked = () => {
    if (this.state.showingInfoWindow)
      this.setState({
        activeMarker: null,
        showingInfoWindow: false
      });
  };
  
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

  writeData = e => {
    e.preventDefault();
    const idValue = e.currentTarget.value;
    database.ref('ID/').set(idValue, function(error){
      error ? alert('error') : console.log('Good Job!')})
      this.props.history.push('/results');
  }


  render() {
    console.log(this.state.data[0]);
    return (
      <div className="location">
        
       <div className="headerText">
       <i>Welcome to {this.state.location}</i>
       </div>
        <div className="map-template">
          <Map
            google={this.props.google}
            zoom={12}
            style={style}
            center={{
              lat: this.state.lat,
              lng: this.state.lng,
            }}
            onClick={this.onMapClicked}
          >
            {Object.keys(this.state.data).map((item, i) => (
              <Marker
                key={i}
                name={this.state.data[item].restaurant.name}
                position={{
                  lat: this.state.data[item].restaurant.location.latitude,
                  lng: this.state.data[item].restaurant.location.longitude,
                }}
                onClick={this.onMarkerClick}
              >
              </Marker>
            ))}
            <InfoWindow
          marker={this.state.activeMarker}
          onClose={this.onInfoWindowClose}
          visible={this.state.showingInfoWindow}>
          <div>
            <h1 className='infoMarker'>{this.state.selectedPlace.name}</h1>
          </div>
        </InfoWindow>
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
        
        
        <div className="row">
          
          {Object.keys(this.state.data).map((item, i) => (
          <div className="col-md-4">
            <div className="card">
          
              <ul className="restaurants-input" key={i}>
                
                <div className="card-header">
                <li onClick={this.writeData.bind(this)} value={this.state.data[item].restaurant.id}>{this.state.data[item].restaurant.name
                      ? this.state.data[item].restaurant.name
                      : "Loading..."}
                    </li>
                </div>
                  
                  <li>{this.state.data[item].restaurant.location.address
                    ? this.state.data[item].restaurant.location.address
                    : "Loading..."}
                  </li>
                
                
                  <li><i>{this.state.data[item].restaurant.cuisines
                    ? this.state.data[item].restaurant.cuisines
                    : "Loading..."}</i>
                  </li>
              
              </ul>
            
            </div>
          </div>
          
          ))}
      </div>
    </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyCifmubhS9MPSr0F6DMjJw2izXGa4SlPE8",
})(Location);