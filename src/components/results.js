import React from 'react';
import '../css/results.css';
import {NavLink} from 'react-router-dom'

const results = () =>
{
    return(
     <div className="results">
     <div>
     <NavLink to="/location">Back</NavLink>
         <h1>This is The Results Page</h1>
         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc leo nisl, egestas nec pellentesque cursus, rhoncus et dui. Praesent iaculis diam ut lectus cursus, vel sagittis mi varius. Vestibulum arcu eros, dignissim ac nulla sit amet, condimentum dictum nisl. Nunc nec iaculis quam. Praesent enim erat, blandit in ligula sed, elementum fringilla sapien. Curabitur pulvinar eu tortor quis iaculis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse potenti. Mauris eleifend vitae ipsum sed convallis. Sed viverra tempus consequat. Sed ac consequat nisi, semper sodales ante.

Maecenas vitae metus purus. Proin et feugiat magna, non placerat ligula. Quisque at bibendum justo, id maximus dui. Nullam convallis arcu nunc, eu eleifend odio laoreet sit amet. Suspendisse et faucibus dolor. Praesent ante metus, facilisis id bibendum sed, pellentesque eu nisi. Sed eu erat et lacus mattis viverra. Etiam congue hendrerit tempus. Sed scelerisque, felis sed aliquam dictum, odio neque iaculis dui, pretium eleifend tellus turpis vel augue. Sed aliquet mi in mattis lobortis. Duis id turpis orci. Mauris imperdiet euismod condimentum. Integer non tempor felis, non iaculis arcu. Sed sit amet sapien neque.</p>
         <br />
         <NavLink to="/location">Back</NavLink>
     </div>
     </div>
    )
}
export default results;