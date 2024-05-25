import React from 'react';
import '../styles/Author.css';
import Proptypes from 'prop-types';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
const Author = ({ authorName, coverPhoto }) => {
  return (
    <div className='card'>
      <div className='card-content'>
        <div className='imageWrapper'>
          <img src={coverPhoto} loading='lazy' alt={authorName} />
        </div>
        <div className='bg'>
          <button className='left-button' tabIndex='-1'>
            <ArrowCircleRightOutlinedIcon />
          </button>
          <button className='right-button'>
            <MoreHorizOutlinedIcon />
          </button>
        </div>

        <div className='tag'>
          <a className='taglink'>{authorName}</a>
        </div>
      </div>
    </div>
  );
};

Author.propTypes = {
  authorName: Proptypes.string,
  coverPhoto: Proptypes.string,
};

export default Author;
