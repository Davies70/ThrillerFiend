import React from 'react';
import '../styles/ContentScroller.css';

import Shape from './Shape';
import PropTypes from 'prop-types';

const ContentScroller = ({
  contentScrollRef,
  shape,
  data,
  isAuthorName,
  isDataAvailable,
}) => {
  return (
    <div className='wrapper'>
      <div className='content-scroll' ref={contentScrollRef}>
        {shape === 'circle'
          ? data?.map((author, i) => (
              <Shape key={i} shape={shape} author={author} />
            ))
          : data?.map((book, i) => (
              <Shape
                key={i}
                shape={shape}
                isAuthorName={isAuthorName}
                book={book}
                isDataAvailable={isDataAvailable}
              />
            ))}
      </div>
    </div>
  );
};

ContentScroller.propTypes = {
  contentScrollRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
  shape: PropTypes.string,
  data: PropTypes.array,
  isAuthorName: PropTypes.bool,
  isDataAvailable: PropTypes.bool,
};

export default ContentScroller;
