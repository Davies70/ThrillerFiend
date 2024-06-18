import React from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import '../styles/Header.css';
import PropTypes from 'prop-types';

const Header = ({ handleScrollerX, headerText, moreRight }) => {
  let arrowClassRight = moreRight ? 'arrow hidden' : 'arrow';
  let arrowClassLeft = moreRight ? 'arrow' : 'arrow hidden';
  return (
    <header>
      <div className='header-text'>
        <h2>{headerText}</h2>
      </div>
      <div className='controls'>
        <button
          className={arrowClassLeft}
          onClick={() => handleScrollerX('left')}
        >
          <KeyboardArrowLeftIcon />
        </button>
        <button
          className={arrowClassRight}
          onClick={() => handleScrollerX('right')}
        >
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
  moreRight: PropTypes.bool,
};

export default Header;
