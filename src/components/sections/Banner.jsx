import React from 'react';
import '../../styles/Banner.css';

const Banner = () => {
  return (
    <div className='bg-container'>
      <div className='bg-banner'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='800'
          height='200'
          viewBox='0 0 800 200'
        >
          <defs>
            <linearGradient id='bg-gradient' x1='0%' y1='0%' x2='100%' y2='0%'>
              <stop offset='0%' style={{ stopColor: '#a8edf0' }} />
              <stop offset='100%' style={{ stopColor: '#0c6b6f' }} />
            </linearGradient>
          </defs>
          <rect width='100%' height='100%' fill='url(#bg-gradient)' />
          <text
            x='50%'
            y='30%'
            fontFamily='Creepster, sans-serif'
            fontSize='36'
            fill='#000'
            textAnchor='middle'
            dominantBaseline='middle'
          >
            Welcome, Thrill-Seekers.
          </text>
          <text
            x='45%'
            y='70%'
            fontFamily='Space Grotesque, sans-serif'
            fontSize='24'
            fill='#000'
            textAnchor='middle'
            dominantBaseline='middle'
          >
            Explore the dark and enigmatic depths of fiction with
          </text>
          <text
            x='50%'
            y='90%'
            fontFamily='Creepster, sans-serif'
            fontSize='36'
            fill='#000'
            textAnchor='middle'
            dominantBaseline='middle'
          >
            ThrillerFiend.
          </text>
        </svg>
      </div>
    </div>
  );
};

export default Banner;
