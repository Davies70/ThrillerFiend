import React from 'react';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShareIcon from '@mui/icons-material/Share';
import proptypes from 'prop-types';
import '../../styles/DetailHeader.css';

const DetailHeader = ({ authorName }) => {
  return (
    <div className='detailHeaderContainer'>
      <div
        style={{
          minHeight: '40px',
          paddingTop: '10px',
        }}
      ></div>
      <div
        style={{
          marginTop: '24px',
          display: 'block',
          marginBottom: '32px',
        }}
      >
        <div>
          <div role='heading' className='detailHeader'>
            <div>
              <small>Author</small>
              <h1>{authorName}</h1>
              <p>20 books published</p>
              <div className='detailHeadericons'>
                <span>
                  <button className='followBtn detailIcons' tabIndex={-1}>
                    <FavoriteBorderOutlinedIcon />
                    <div>follow</div>
                  </button>
                </span>
                <span className='shareBtnSpan' tabIndex={-1}>
                  <button
                    aria-label='Share this autor'
                    className='shareBtn detailIcons'
                  >
                    <ShareIcon />
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

DetailHeader.propTypes = {
  authorName: proptypes.string.isRequired,
};

export default DetailHeader;
