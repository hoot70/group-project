import React from 'react';
import '../css/location.css';
import Enter from "./enter"

const location = () =>
{
    return(
     <div className="location">
     <div>Enter Your Location
         <br />
     <input type="text" name="inputText"/>
     </div>
     <Enter>Hello</Enter>
     </div>
    )
}
export default location;