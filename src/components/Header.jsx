import React from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import '../styles/Header.css';
import PropTypes from 'prop-types';

const Header = ({
  handleScrollerX,
  headerText,
  moreRight,
  moreLeft,
  contentScrollRef,
}) => {
  let arrowClassRight = moreRight ? 'arrow' : 'disabled arrow';
  let arrowClassLeft = moreLeft ? 'arrow' : 'disabled arrow';
  return (
    <header>
      <div className='header-text'>
        <h2>{headerText}</h2>
      </div>
      <div className='controls'>
        <button
          className={arrowClassLeft}
          onClick={() => handleScrollerX(contentScrollRef, 'left')}
        >
          <KeyboardArrowLeftIcon />
        </button>
        <button
          className={arrowClassRight}
          onClick={() => handleScrollerX(contentScrollRef, 'right')}
        >
          <KeyboardArrowRightIcon />
        </button>
        <button className='see-all' aria-label={headerText} title={headerText}>
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
  moreLeft: PropTypes.bool,
  contentScrollRef: PropTypes.object,
};

export default Header;
