import React from 'react';
import '../../styles/Banner.css';

const Banner = () => {
  return (
    <div className='bg-container'>
      <div className='banner'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='800'
          height='200'
          viewBox='0 0 900 200'
          className='svg-banner'
        >
          <defs>
            <linearGradient id='bg-gradient' x1='0%' y1='0%' x2='100%' y2='0%'>
              <stop offset='0%' style={{ stopColor: '#a8edf0' }} />
              <stop offset='100%' style={{ stopColor: '#0c6b6f' }} />
            </linearGradient>
          </defs>
          <rect
            width='100%'
            height='100%'
            fill='url(#bg-gradient)'
            rx='8'
            ry='8'
          />
          <text
            x='36%'
            y='25%'
            fontFamily='Roboto, sans-serif'
            fontSize='20'
            fill='#000'
            textAnchor='middle'
            dominantBaseline='middle'
          >
            Welcome,
          </text>
          <text
            x='54%'
            y='25%'
            fontFamily='Nosifer, sans-serif'
            fontSize='18'
            fill='#000'
            textAnchor='middle'
            dominantBaseline='middle'
          >
            Thrill-Seekers
          </text>
          <text
            x='48%'
            y='45%'
            fontFamily='Roboto, sans-serif'
            fontSize='20'
            fill='#000'
            textAnchor='middle'
            dominantBaseline='middle'
          >
            Sign up to explore the dark and enigmatic depths of fiction
          </text>
          <text
            x='33.5%'
            y='75%'
            fontFamily='Roboto, sans-serif'
            fontSize='20'
            fill='#000'
            textAnchor='middle'
            dominantBaseline='middle'
          >
            Let
          </text>
          <text
            x='43.5%'
            y='74.5%'
            fontFamily='Creepster, sans-serif'
            fontSize='25'
            fill='#000'
            textAnchor='middle'
            dominantBaseline='middle'
          >
            Thriller Fiend
          </text>
          <text
            x='58.5%'
            y='75%'
            fontFamily='Roboto, sans-serif'
            fontSize='20'
            fill='#000'
            textAnchor='middle'
            dominantBaseline='middle'
          >
            be your guide
          </text>
        </svg>
      </div>
    </div>
  );
};

export default Banner;
