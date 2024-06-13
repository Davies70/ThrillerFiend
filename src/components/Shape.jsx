import React from 'react';
import '../styles/Shape.css';
import Proptypes from 'prop-types';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import AddIcon from '@mui/icons-material/Add';
const Shape = ({ name, photo, shape, authors }) => {
  return (
    <div className='card'>
      {shape === 'circle' ? (
        <div className='card-content'>
          <div className='imageWrapper circle'>
            <img src={photo} loading='lazy' alt={name} />
            <a className='bg cirlce'>
              <button className='center-button' tabIndex='-1'>
                <ArrowCircleRightOutlinedIcon />
              </button>
              <button className='right-button'>
                <MoreHorizOutlinedIcon />
              </button>
            </a>
          </div>
          <div className='tag'>
            <a className='taglink'>{name}</a>
          </div>
        </div>
      ) : (
        <div className='card-content'>
          <div className='imageWrapper square'>
            <img src={photo} loading='lazy' alt={name} />
            <a className='bg square'>
              <button aria-label='Add to Collections' title='Add to Collections'>
                <AddIcon className='left-button' />
              </button>
              <button className='center-button' tabIndex='-1'>
                <ArrowCircleRightOutlinedIcon />
              </button>
              <button className='right-button'>
                <MoreHorizOutlinedIcon />
              </button>
            </a>
          </div>
          <div className='primary-tag'>
            <a className='taglink'>{name}</a>
            <div className='secondary-tag'>
              <span>{authors.join(', ')}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Shape.propTypes = {
  name: Proptypes.string,
  photo: Proptypes.string,
  shape: Proptypes.string,
  authors: !Proptypes.array,
};

export default Shape;
