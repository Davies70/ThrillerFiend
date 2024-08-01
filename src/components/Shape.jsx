import React from 'react';
import '../styles/Shape.css';
import Proptypes from 'prop-types';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
// import Loader from './Loader';

const Shape = ({ name, photo, shape, authors, isAuthorName, id }) => {
  const authorName =
    typeof authors === 'string' ? authors : authors?.join(', ');
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
            <Link className='bg cirlce' to={`/author/`}>
              <button className='right-button'>
                <MoreHorizOutlinedIcon />
              </button>
            </Link>
          </div>
          <div className='tag'>
            <Link
              className='taglink'
              to={`/author/${id}`}
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {name}
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return photo ? (
      <div className='card'>
        <div className='card-content'>
          <div className='imageWrapper square'>
            <img
              src={photo}
              loading='lazy'
              alt={name}
              style={{
                objectFit: 'cover',
                maxWidth: '100%',
                maxHeight: 'auto',
              }}
            />
            <Link className='bg square' to={`/book/}`}>
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
            <Link className='taglink' to={`/book/`} title={name}>
              {name}
            </Link>
            {isAuthorName && (
              <div className='secondary-tag'>
                <span>{authorName}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    ) : null;
  }
};

Shape.propTypes = {
  name: Proptypes.string,
  photo: Proptypes.string,
  shape: Proptypes.string,
  authors: Proptypes.oneOfType([Proptypes.array, Proptypes.string]),
  isAuthorName: Proptypes.bool,
  id: Proptypes.string,
};

export default Shape;
