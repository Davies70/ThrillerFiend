import * as React from 'react';

const Logo = (props) => (
  <svg
    viewBox='0 0 400 100' // Adjusted viewBox to fit the content
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    {/* Background */}
    <rect width='100%' height='100%' fill='#0a0b0b' />

    {/* Text "Thriller" */}
    <text
      x='10' // Adjusted x position
      y='50' // Adjusted y position
      fontFamily='Georgia'
      fontSize={48}
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
      x='230' // Adjusted x position
      y='50' // Adjusted y position
      fontFamily='Georgia'
      fontSize={48}
      fontWeight={800}
      fill='#ffffff'
    >
      {'Fiend'}
    </text>
  </svg>
);

export default Logo;
