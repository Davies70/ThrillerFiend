import React from 'react';
import '../styles/Shape.css';
import Proptypes from 'prop-types';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import Loader from './Loader';

const Shape = ({ name, photo, shape, authors, shapeId }) => {
  if (shape === 'circle') {
    return (
      <div className='card'>
        <div className='card-content'>
          <div className='imageWrapper circle'>
            <img
              src={photo}
              loading='lazy'
              alt={name}
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
            <Link className='bg cirlce' to={`/author/${shapeId}`}>
              <button className='right-button'>
                <MoreHorizOutlinedIcon />
              </button>
            </Link>
          </div>
          <div className='tag'>
            <Link className='taglink' to={`/author/${shapeId}`}>
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
            <Link className='bg square' to={`/book/${shapeId}`}>
              <button
                aria-label='Add to Collections'
                title='Add to Collections'
              >
                <AddIcon className='left-button' />
              </button>
              {/* <button className='center-button' tabIndex='-1'>
                <ArrowCircleRightOutlinedIcon />
              </button> */}
              <button className='right-button'>
                <MoreHorizOutlinedIcon />
              </button>
            </Link>
          </div>
          <div className='primary-tag'>
            <Link className='taglink' to={`/book/${shapeId}`} title={name}>
              {name}
            </Link>
            <div className='secondary-tag'>
              <span>{authors}</span>
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
  authors: Proptypes.oneOfType([Proptypes.array, Proptypes.string]),
  shapeId: Proptypes.oneOfType([Proptypes.string, Proptypes.number]),
};

export default Shape;
