import React from 'react';
import '../styles/Shape.css';
import Proptypes from 'prop-types';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
// import Loader from './Loader';

const Shape = ({ name, photo, shape, authors, isAuthorName, id, volumeId }) => {
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
            <Link className='bg cirlce' to={`/author/${id}`}>
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
    return (
      <div className='card'>
        <div className='card-content'>
          <div className='imageWrapper square'>
            {photo ? (
              <img src={photo} loading='lazy' alt={name} style={{}} />
            ) : (
              <img
                src={`https://lgimages.s3.amazonaws.com/nc-md.gif`}
                loading='lazy'
                alt={name}
                style={{}}
              />
            )}

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
            <Link className='taglink' to={`/book/${volumeId}`} title={name}>
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
    );
  }
};

Shape.propTypes = {
  name: Proptypes.string,
  photo: Proptypes.string,
  shape: Proptypes.string,
  authors: Proptypes.oneOfType([Proptypes.array, Proptypes.string]),
  isAuthorName: Proptypes.bool,
  id: Proptypes.oneOfType([Proptypes.string, Proptypes.number]),
  volumeId: Proptypes.string,
};

export default Shape;
