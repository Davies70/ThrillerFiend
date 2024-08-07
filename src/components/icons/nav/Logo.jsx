import * as React from 'react';

const Logo = (props) => (
  <svg
    viewBox='0 0 400 85' // Adjusted viewBox to fit the content
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
    height={60}
    width={120}
  >
    {/* Background */}

    {/* Text "Thriller" */}
    <text
      x='0' // Adjusted x position
      y='50' // Adjusted y position
      fontFamily='Nosifer, sans-serif'
      fontSize={38}
      fontWeight={800}
      fill='#ffffff'
    >
      {'Thriller'}
    </text>

    {/* Polygon */}
    <polygon
      points='180,20 240,60 220,60 230,80 170,40 200,40' // Adjusted points to make it larger
      fill='#ff0000' // Changed fill color
      opacity='0.3' // Reduced opacity to make it flashy
    />

    {/* Text "Fiend" */}
    <text
      x='270' // Adjusted x position
      y='65' // Adjusted y position
      fontFamily='Creepster, system-ui'
      fontSize={55}
      fontWeight={100}
      fill='#ffffff'
    >
      {'Fiend'}
    </text>
  </svg>
);

export default Logo;
