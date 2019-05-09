import React from "react";
import "../css/results.css";
import * as firebase from "firebase";
import { GoogleApiWrapper, Map, Marker } from "google-maps-react";

const database = firebase.database();
const style = {
  width: "800px",
  height: "400px",
};

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
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
      console.log(this.state.data);
    });
  }

  searchBar = e => {
    e.preventDefault();
    const locationValue = e.target.elements.inputLocation.value;
    database.ref("location/").set(locationValue, function(error) {
      error ? alert("error") : console.log("Good Job!");
    });
    this.props.history.push("/location");
    window.scrollTo(0, 0);
  };

  imgLoad(){
    if(this.state.data.featured_image){
      return this.state.data.featured_image
    }else{
      return"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png"
    }
  }

  render() {
    return (
      <div className="results">
        <div className="container">
          <nav className="navbar sticky-top">
            <a className="nav-item nav-link" href="/" id="home">
              Home
            </a>
            <a className="nav-item nav-link" href="/location">
              Restaurant List
            </a>
            <form
              className="form-inline my-2 my-lg-0"
              onSubmit={this.searchBar.bind(this)}
            >
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Enter City"
                aria-label="Search"
                name="inputLocation"
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
          </nav>
        </div>
        <div>
          
          <div className="map-template">
                <div className="container2">
                  <div className="imageBorder">
                    <img src={this.imgLoad()} style={{borderTopLeftRadius: '25px', 
                    borderTopRightRadius: '25px'}} />
                  </div>
                  <div className="whiteBox"><i>{this.state.data.name}</i></div>
                </div>
            <br />
            <br />
            <Map
              google={this.props.google}
              zoom={17}
              style={style}
              center={{
                lat:
                  this.state.data.location && this.state.data.location.latitude,
                lng:
                  this.state.data.location &&
                  this.state.data.location.longitude,
              }}
              onClick={this.onMapClicked}
            >
              <Marker
                position={{
                  lat:
                    this.state.data.location &&
                    this.state.data.location.latitude,
                  lng:
                    this.state.data.location &&
                    this.state.data.location.longitude,
                }}
              />
            </Map>
          </div>
          <div className="textColor">
            <h2>
              {this.state.data.location && this.state.data.location.locality}
            </h2>
            <h2>
              {this.state.data.location && this.state.data.location.address}
            </h2>
            <h2>{this.state.data.cuisines}</h2>
            <h2>
              Average Cost for Two: {this.state.data.currency}
              {this.state.data.average_cost_for_two}
            </h2>
          </div>
          <hr style={{height: '5px', backgroundColor: 'white'}} />
          <h2 style={{color: 'white'}}>Learn more about {this.state.data.name} by visiting these links:</h2>
          <span style={{display: 'inline'}}>
              <a href={this.state.data.url } target='_blank' style={{marginRight: '15px'}}>Web Page</a>
              <a href={this.state.data.menu_url} target='_blank' style={{marginRight: '15px', marginLeft: '15px'}}>Menu Page</a>
              <a href={this.state.data.photos_url} target='_blank'style={{marginLeft: '15px'}}>Photos</a>
          </span>
            
            <br />
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCifmubhS9MPSr0F6DMjJw2izXGa4SlPE8",
})(Results);