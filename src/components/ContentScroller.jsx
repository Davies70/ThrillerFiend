import React from 'react';
import '../styles/ContentScroller.css';

import Shape from './Shape';
import PropTypes from 'prop-types';

const ContentScroller = ({ contentScrollRef, shape, data }) => {
  return (
    <div className='wrapper'>
      <div className='content-scroll' ref={contentScrollRef}>
        {shape === 'circle'
          ? data.map((author, i) => (
              <Shape
                name={author.authorName}
                photo={author.coverPhoto}
                key={i}
                shape={shape}
              />
            ))
          : data.map(
              (book) =>
                book.volumeInfo?.imageLinks?.thumbnail && (
                  <Shape
                    name={book.volumeInfo.title}
                    photo={book.volumeInfo?.imageLinks?.thumbnail}
                    key={book.id}
                    shape={shape}
                    authors={book.volumeInfo.authors}
                  />
                )
            )}
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
  data: PropTypes.array || PropTypes.object,
};

export default ContentScroller;
