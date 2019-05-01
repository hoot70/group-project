import React from 'react';
import '../css/location.css';
import {NavLink} from 'react-router-dom'

const location = () =>
{
    return(
     <div className="location">
     <div>Enter The Cuisine You Are Looking For
         <br />
     <input type="text" name="inputText"/>
     </div>
     <NavLink to="/results">Submit</NavLink> 
     </div>
    )
}
export default location;