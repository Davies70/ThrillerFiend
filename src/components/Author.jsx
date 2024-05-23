import React from 'react';
import '../styles/Author.css';
import Proptypes from 'prop-types';

const Author = ({ authorName, coverPhoto }) => {
  return (
    <div className='author'>
      <div>
        <a>
          <img src={coverPhoto} loading='lazy' alt={authorName} />
        </a>
      </div>
      <div>
        <a>{authorName}</a>
      </div>
    </div>
  );
};

Author.propTypes = {
  authorName: Proptypes.string,
  coverPhoto: Proptypes.string,
};

export default Author;
