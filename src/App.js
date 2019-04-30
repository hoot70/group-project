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
    super()
  };

  render (){
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
}

export default App;
