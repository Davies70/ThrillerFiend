import * as React from 'react';

const LogoSmall = (props) => (
  <svg
    viewBox='0 0 600 150' // Adjusted viewBox height to fit the content
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    {/* Background */}

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
      points='90,70 150,110 130,110 140,130 80,90 110,90' // Adjusted points to make it fit the column design
      fill='#ff0000'
      opacity='0.3'
    />

    {/* Text "Fiend" */}
    <text
      x='10' // Adjusted x position
      y='130' // Adjusted y position to be below "Thriller"
      fontFamily='Georgia'
      fontSize={30}
      fontWeight={300}
      fill='#ffffff'
    >
      {'Fiend'}
    </text>
  </svg>
);

export default LogoSmall;
