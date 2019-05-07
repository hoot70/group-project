import React from 'react';
import '../css/results.css';
import {NavLink} from 'react-router-dom';
import * as firebase from "firebase";

const database = firebase.database();


class Results extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        id: '',
        data: [],
        isLoaded: false
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
         <h2>{this.state.data.address}</h2>
         <h2>{this.state.data.cuisines}</h2>
         <br />
         <NavLink to="/location">Back</NavLink>
     </div>
     </div>
    );
}
    }

export default Results;