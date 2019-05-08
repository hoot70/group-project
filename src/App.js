import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import home from "./components/home"
import location from "./components/location"
import results from "./components/results"


class App extends React.Component {
  constructor (){
    super();
  };

    render (){
      return(
        <div className="App">
      <header className="App-header">
      <BrowserRouter>
        <Route path="/" component={home} exact/>
        <Route path="/location" component={location}/>
        <Route path="/results" component={results}/>
        </BrowserRouter>
      </header>
    </div>
      )}
}
export default App;