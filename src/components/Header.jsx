import React from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import '../styles/Header.css';
import PropTypes from 'prop-types';

const Header = ({ handleScrollerX, headerText }) => {
  return (
    <header>
      <div className='header-text'>
        <h2>{headerText}</h2>
      </div>
      <div className='controls'>
        <button className='arrow' onClick={() => handleScrollerX('right')}>
          <KeyboardArrowLeftIcon />
        </button>
        <button className='arrow' onClick={() => handleScrollerX('left')}>
          <KeyboardArrowRightIcon />
        </button>
        <button className='see-all'>
          <span>see all</span>
        </button>
      </div>
    </header>
  );
};

Header.propTypes = {
  handleScrollerX: PropTypes.func,
  headerText: PropTypes.string,
};

export default Header;
