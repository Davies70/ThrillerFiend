import React from 'react';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShareIcon from '@mui/icons-material/Share';
import Proptypes from 'prop-types';
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
                  <button
                    className='followBtn detailIcons'
                    tabIndex={-1}
                    aria-label='Follow this author'
                    title='Follow this author'
                  >
                    <FavoriteBorderOutlinedIcon />
                    <div>follow</div>
                  </button>
                </span>
                <span className='shareBtnSpan' tabIndex={3}>
                  <button
                    aria-label='Share this author'
                    title='Share this author'
                    className='shareBtn detailIcons'
                    tabIndex={3}
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
  authorName: Proptypes.string.isRequired,
};

export default DetailHeader;
