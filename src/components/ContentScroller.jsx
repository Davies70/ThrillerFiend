import React from 'react';
import '../styles/ContentScroller.css';

import Shape from './Shape';
import PropTypes from 'prop-types';



const ContentScroller = ({ contentScrollRef, shape, data }) => {
  
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
                shapeId={author.id}
              />
            ))
          : data?.map((book, i) => (
              <Shape
                name={book.title}
                photo={book.book_image}
                key={i}
                shape={shape}
                authors={book.author}
                shapeId={book.primary_isbn10}
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
};

export default ContentScroller;
