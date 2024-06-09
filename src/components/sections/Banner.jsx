import React from 'react';
import '../../styles/Banner.css';

const Banner = () => {
  return (
    <div className='bg-container'>
      <div className='bg-banner'>
        <svg className='banner-img' alt='banner-img' loading='lazy'>
          <text x='250' y='80'>
            Thrill-Seekers Welcome: Explore the Dark and Enigmatic Depths of
            Fiction.
          </text>
          <text x='250' y='100'>
            Embark on a Journey into Darkness: Let ThrillerFiend Be Your Guide
          </text>
        </svg>
      </div>
    </div>
  );
};

export default Banner;
