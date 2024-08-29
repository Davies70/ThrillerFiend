import React from 'react';
import '../styles/GridContentScroller.css';
import PropTypes from 'prop-types';
import GridItem from './GridItem';

const GridContentScroller = ({ contentScrollRef, data }) => {
  return (
    <div className='grid-wrapper'>
      <div className='content-scroll-grid' ref={contentScrollRef}>
        {data.map((book, i) => (
          <GridItem key={i} book={book} />
        ))}
      </div>
    </div>
  );
};

GridContentScroller.propTypes = {
  contentScrollRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
  shape: PropTypes.string,
  data: PropTypes.array || PropTypes.object,
};

export default GridContentScroller;
