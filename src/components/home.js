import React from 'react';
import '../css/home.css';
import {withRouter } from 'react-router-dom';
import * as firebase from 'firebase';
import BackgroundSlideshow from 'react-background-slideshow'
import image1 from './assets/Charlotte.jpg';
import image2 from './assets/NYC.jpg';
import image3 from './assets/Boston.jpg';
import image4 from './assets/Chicago.jpg';


const images = [
  image1,
  image2,
  image3,
  image4
]


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
          window.scrollTo(0, 0);
      }

      render (){
    return(
     <div className="Homepage">
     <div className="image">
      <BackgroundSlideshow images={images}/>
    </div>
     <div className="homeText">Enter Your Location</div>
  
         <br />
         <form onSubmit={this.writeData.bind(this)}>
        <input type="text" name="inputLocation" />
        <button type='submit'><span>Submit</span></button>
     </form>
     </div>
    
    )
      }
}
export default withRouter(Home);