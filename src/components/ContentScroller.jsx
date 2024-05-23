import React from 'react';
import '../styles/ContentScroller.css';
import authors from '../api/authors';
import Author from './Author';

const ContentScroller = () => {
  return (
    <div className='wrapper'>
      <div className='content-scroll'>
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

export default ContentScroller;
