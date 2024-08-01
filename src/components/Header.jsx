import React, { useEffect, useState, useCallback } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import '../styles/Header.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Header = ({ headerText, contentScrollRef, navLink, isNavLink }) => {
  const [moreRight, setMoreRight] = useState(true);
  const [moreLeft, setMoreLeft] = useState(false);
  let arrowClassRight = moreRight ? 'arrow' : 'disabled arrow';
  let arrowClassLeft = moreLeft ? 'arrow' : 'disabled arrow';
  const currentRef = contentScrollRef.current;
  useEffect(() => {
    const handleScroll = () => {
      if (contentScrollRef.current) {
        const { scrollLeft, clientWidth, scrollWidth } =
          contentScrollRef.current;
        setMoreRight(scrollLeft + clientWidth + 10 < scrollWidth);
        setMoreLeft(scrollLeft > 0);
      }
    };

    contentScrollRef.current?.addEventListener('scroll', handleScroll);
    return () => {
      currentRef?.removeEventListener('scroll', handleScroll);
    };
  }, [contentScrollRef, currentRef]);
  const handleScrollerX = useCallback(
    (direction) => {
      if (contentScrollRef.current) {
        if (direction === 'right') {
          contentScrollRef.current.scrollLeft +=
            contentScrollRef.current.clientWidth;
        } else {
          contentScrollRef.current.scrollLeft -=
            contentScrollRef.current.clientWidth;
        }
      }
    },
    [contentScrollRef]
  );
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
        {isNavLink && (
          <button
            className='see-all'
            aria-label={headerText}
            title={headerText}
          >
            <span>
              <Link to={navLink}>see all</Link>
            </span>
          </button>
        )}
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
  navLink: PropTypes.string,
  isControls: PropTypes.bool,
  isNavLink: PropTypes.bool,
};

export default Header;
