import React from 'react';
import logo, { ReactComponent } from './logo.svg'
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
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

class App extends React.Component {
  constructor (){
    super();
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
      error ? alert('error') : console.log('it works')})
  }

  render (){
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>{this.state.location}</h1>
        <form onSubmit={this.writeData.bind(this)}>
            <input type='text' name='inputLocation'/>
            <input type='submit' name='submitButton' />
        </form>
      </header>
    </div>
  );
}
}

export default App;