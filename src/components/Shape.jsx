import React from 'react';
import '../styles/Shape.css';
import Proptypes from 'prop-types';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
const Shape = ({ name, photo, shape, authors, id }) => {
  if (shape === 'circle') {
    return (
      <div className='card'>
        <div className='card-content'>
          <div className='imageWrapper circle'>
            <img src={photo} loading='lazy' alt={name} />
            <Link className='bg cirlce' to={`/author/${id}`}>
              <button className='center-button' tabIndex='-1'>
                <ArrowCircleRightOutlinedIcon />
              </button>
              <button className='right-button'>
                <MoreHorizOutlinedIcon />
              </button>
            </Link>
          </div>
          <div className='tag'>
            <Link className='taglink' to={`/author/${id}`}>
              {name}
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className='card'>
        <div className='card-content'>
          <div className='imageWrapper square'>
            <img src={photo} loading='lazy' alt={name} />
            <Link className='bg square'>
              <button
                aria-label='Add to Collections'
                title='Add to Collections'
              >
                <AddIcon className='left-button' />
              </button>
              <button className='center-button' tabIndex='-1'>
                <ArrowCircleRightOutlinedIcon />
              </button>
              <button className='right-button'>
                <MoreHorizOutlinedIcon />
              </button>
            </Link>
          </div>
          <div className='primary-tag'>
            <Link className='taglink'>{name}</Link>
            <div className='secondary-tag'>
              <span>{authors.join(', ')}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

Shape.propTypes = {
  name: Proptypes.string,
  photo: Proptypes.string,
  shape: Proptypes.string,
  authors: Proptypes.array,
  id: Proptypes.number,
};

export default Shape;
