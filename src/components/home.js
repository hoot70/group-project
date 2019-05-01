import React from 'react';
import '../css/home.css';
import Enter from "./enter"

const Home = () =>
{
    return(
     <div className="Homepage">
     <div>Enter Your Location
         <br />
     <input type="text" name="inputText"/>
     </div>
     <Enter>Hello</Enter>
     </div>
    )
}
export default Home;