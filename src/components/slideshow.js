import React from 'react';
import ReactBackgroundSlideshow from 'react-background-slideshow';
import image1 from './assets/Charlotte.png';
import image2 from './assets/NYC.jpg';
import image3 from './assets/Boston.jpg';
import image4 from './assets/Chicago.jpg';


const images = [
  image1,
  image2,
  image3,
  image4
]

class Background extends React.Component {
      render () {
        return (
          <ReactBackgroundSlideshow images={images} />
        )
      }
    }
export default Background;