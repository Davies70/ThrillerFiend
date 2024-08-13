import React from 'react';
import '../styles/ContentScroller.css';

import Shape from './Shape';
import PropTypes from 'prop-types';

const ContentScroller = ({ contentScrollRef, shape, data, isAuthorName }) => {
  return (
    <div className='wrapper'>
      <div className='content-scroll' ref={contentScrollRef}>
        {shape === 'circle'
          ? data?.map((author, i) => (
              <Shape
                name={author.authorName}
                photo={author.coverPhoto}
                key={i}
                shape={shape}
                id={author.id}
              />
            ))
          : data?.map((book, i) => (
              <Shape
                name={book.title}
                photo={book.book_image}
                key={i}
                shape={shape}
                authors={book.author}
                isAuthorName={isAuthorName}
                volumeId={book.volumeId}
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
};

export default ContentScroller;
