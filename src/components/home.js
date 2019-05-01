import React from 'react';
import '../css/home.css';
// import Enter from "./enter";
import {BrowserRouter, Route, Switch, Link, withRouter } from 'react-router-dom';
// import { , hashHistory,  browserHistory } from 'react-router'
import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyAia2WZr0S88ovOJ7JWmCjRz63aoIiWpZw",
    authDomain: "groupproject-45878.firebaseapp.com",
    databaseURL: "https://groupproject-45878.firebaseio.com",
    projectId: "groupproject-45878",
    storageBucket: "groupproject-45878.appspot.com",
    messagingSenderId: "281486642276"
  };
  
  firebase.initializeApp(config)
  const database = firebase.database()

class Home extends React.Component {
    constructor (props){
      super(props);
       this.state = {
        location: 'Where do You Want to Go'
      };
    };
    componentDidMount(){
        const textRef = database.ref('location/');
        
        textRef.on('value', snapshot => {
          this.setState({
            location: snapshot.val()
          })
        })
      }
    
      writeData = e => {
        e.preventDefault();
        const locationValue = e.target.elements.inputLocation.value;
        database.ref('location/').set(locationValue, function(error){
          error ? alert('error') : console.log('Good Job!')})
          this.props.history.push('/location');
      }

      render (){
    return(
     <div className="Homepage">
     <div>Enter Your Location
         <br />
         <form onSubmit={this.writeData.bind(this)}>
     <input type="text" name="inputLocation" />
     <button type='submit'>Submit</button>
     </form>
     </div>
     </div>
    )
      }
}
export default withRouter(Home);