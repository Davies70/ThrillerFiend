import React from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import '../styles/Header.css';

const Header = () => {
  return (
    <header>
      <div className='header-text'>
        <h2>Hot Authors</h2>
      </div>
      <div className='controls'>
        <button className='arrow'>
          <KeyboardArrowLeftIcon />
        </button>
        <button className='arrow'>
          <KeyboardArrowRightIcon />
        </button>
        <button className='see-all'>
          <span>see all</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
