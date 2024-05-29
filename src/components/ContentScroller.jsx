import React from 'react';
import '../styles/ContentScroller.css';
import authors from '../api/authors';
import Author from './Author';
import PropTypes from 'prop-types';

const ContentScroller = ({ contentScrollRef }) => {
  return (
    <div className='wrapper'>
      <div className='content-scroll' ref={contentScrollRef}>
        {authors.map((author, i) => (
          <Author
            authorName={author.authorName}
            coverPhoto={author.coverPhoto}
            key={i}
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
};

export default ContentScroller;
