import * as React from 'react';

const LogoSmall = (props) => (
  <svg
    viewBox='0 5 120 120' // Adjusted viewBox width to fit the content
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
    height={130}
    width={100}
  >
    {/* Background */}

    {/* Text "Thriller" */}
    <text
      x='-2' // Adjusted x position
      y='50' // Adjusted y position
      fontFamily='Nosifer, sans-serif'
      fontSize={18} // Adjusted font size
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
      x='30' // Adjusted x position to fit within new width
      y='80' // Adjusted y position to be below "Thriller"
      fontFamily='Creepster, system-ui'
      fontSize={22} // Adjusted font size
      fontWeight={200}
      fill='#ffffff'
    >
      {'Fiend'}
    </text>
  </svg>
);

export default LogoSmall;
