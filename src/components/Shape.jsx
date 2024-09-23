import '../styles/Shape.css';
import Proptypes from 'prop-types';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { Link } from 'react-router-dom';
// import Loader from './Loader';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import IconButton from '@mui/material/IconButton';

const Shape = ({ shape, isAuthorName, book, author }) => {
  if (shape === 'circle') {
    const { authorName, coverPhoto, id, name } = author;
    return (
      <div className='card'>
        <div className='card-content'>
          <div className='imageWrapper circle'>
            <img
              src={coverPhoto}
              loading='lazy'
              alt={authorName || name}
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
              {authorName || name}
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    const { title, book_image, authors, book_id } = book;
    const authorName =
      typeof authors === 'string' ? authors : authors?.join(', ');
    // const data = isDataAvailable ? book : null;

    return (
      <div className='card'>
        <div className='card-content'>
          <div className='imageWrapper square'>
            {book_image ? (
              <img src={book_image} loading='lazy' alt={title} style={{}} />
            ) : (
              <img
                src={`https://lgimages.s3.amazonaws.com/nc-md.gif`}
                loading='lazy'
                alt={title}
                style={{}}
              />
            )}

            <Link className='bg square' to={`/book/${book_id}`}>
              <IconButton
                className='top-left'
                title='Add to Read Later'
                aria-label='Add to Read Later'
              >
                <BookmarkAddOutlinedIcon />
              </IconButton>

              <button className='right-button'>
                <MoreHorizOutlinedIcon />
              </button>
            </Link>
          </div>
          <div className='primary-tag'>
            <Link className='taglink' to={`/book/${book_id}`} title={title}>
              {title}
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
  book: Proptypes.object,
  author: Proptypes.object,
  isDataAvailable: Proptypes.bool,
};

export default Shape;
