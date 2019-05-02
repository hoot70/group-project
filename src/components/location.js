import React from 'react';
import '../css/location.css';
import {NavLink} from 'react-router-dom'
import * as firebase from 'firebase';
import Home from './home'

const database = firebase.database()

class Location extends React.Component {
    constructor(){
        super ();
        this.state = {
            location: ''
          };
    }
    componentDidMount(){
        const textRef = database.ref('location/');
        
        textRef.on('value', snapshot => {
          this.setState({
            location: snapshot.val()
          })
        })
      }
    render (){
    return(
     <div className="location">
     <h1>Welcome to {this.state.location}</h1>
     <div>Enter The Cuisine You Are Looking For
         <br />
     <input type="text" name="inputText"/>
     </div>
     <NavLink to="/results">Submit</NavLink> 
     </div>
    )
}
}
export default Location;
