import * as React from 'react';

const LogoSmall = (props) => (
  <svg
    viewBox='10 0 200 135' // Adjusted viewBox width to fit the content
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    {/* Background */}

    {/* Text "Thriller" */}
    <text
      x='10' // Adjusted x position
      y='50' // Adjusted y position
      fontFamily='Nosifer, sans-serif'
      fontSize={25}
      fontWeight={300}
      fill='#ffffff'
    >
      {'Thriller'}
    </text>

    {/* Polygon */}
    <polygon
      points='15,30 75,70 55,70 65,90 5,50 35,50' // Adjusted points to overlap with "Thriller"
      fill='#ff0000'
      opacity='0.3'
    />

    {/* Text "Fiend" */}
    <text
      x='55' // Adjusted x position
      y='100' // Adjusted y position to be below "Thriller"
      fontFamily='Creepster, system-ui'
      fontSize={35}
      fontWeight={400}
      fill='#ffffff'
    >
      {'Fiend'}
    </text>
  </svg>
);

export default LogoSmall;
