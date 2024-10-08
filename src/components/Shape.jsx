import '../styles/Shape.css';
import Proptypes from 'prop-types';
import { Link } from 'react-router-dom';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import IconButton from '@mui/material/IconButton';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import {
  addBookStatus,
  getBookStatus,
  removeBookStatus,
} from '../services/userServices';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAuth } from '../context/AuthProvider';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Notification from './Notification';

const Shape = ({ shape, isAuthorName, book, author }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isRead, setIsRead] = useState(false);
  const [isReadLater, setIsReadLater] = useState(false);

  const [notification, setNotification] = useState({
    title: '',
    message: '',
    type: '',
  });

  const clearNotification = () => {
    setTimeout(() => {
      setNotification({ title: '', message: '', type: '' });
    }, 1500);
  };

  const closeNotification = (event) => {
    event.preventDefault();
    setNotification({ title: '', message: '', type: '' });
  };

  const navigate = useNavigate();

  const redirectToLogIn = () => {
    if (!user) {
      navigate('/signin');
    }
  };

  const {
    data: state,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['bookStatus', user?.uid, book?.book_id],
    queryFn: () => getBookStatus(user?.uid, book?.book_id),
    enabled: !!user?.uid && !!book,
  });

  useEffect(() => {
    if (state) {
      setIsRead(state.haveRead);
      setIsReadLater(state.readLater);
    }
  }, [state]);

  const updateBookStatusMutation = useMutation({
    mutationFn: ({ userId, bookId, status, action }) => {
      if (action === 'add') {
        return addBookStatus(userId, bookId, status);
      } else if (action === 'remove') {
        return removeBookStatus(userId, bookId, status);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['bookStatus', user?.uid, book?.book_id]);
    },
  });

  const handleAddToReadLater = async () => {
    redirectToLogIn();
    user &&
      updateBookStatusMutation.mutate({
        userId: user?.uid,
        bookId: book?.book_id,
        status: 'readLater',
        action: 'add',
      });
    setNotification({
      title: 'Success',
      message: `${book.title} by ${book.authors.join(
        ', '
      )} added to Read Later`,
      type: 'success',
    });
    clearNotification();
  };

  const handleMarkAsRead = async () => {
    redirectToLogIn();
    user &&
      updateBookStatusMutation.mutate({
        userId: user?.uid,
        bookId: book?.book_id,
        status: 'haveRead',
        action: 'add',
      });
    setNotification({
      title: 'Success',
      message: `${book.title} by ${book.authors.join(', ')} marked as Read`,
      type: 'success',
    });
    clearNotification();
  };

  if (shape === 'circle') {
    // ... (circle shape rendering remains unchanged)
    const { authorName, coverPhoto, id, name, authorId } = author;
    const realId = id || authorId;
    return (
      <div className='card'>
        <div className='card-content'>
          <div className='imageWrapper circle'>
            {
              <img
                src={coverPhoto}
                loading='lazy'
                alt={authorName || name}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://lgimages.s3.amazonaws.com/nc-md.gif`;
                }}
              />
            }
            <Link className='bg cirlce' to={`/author/${realId}`}>
              <button className='right-button'>
                <MoreHorizOutlinedIcon />
              </button>
            </Link>
          </div>
          <div className='tag'>
            <Link
              className='taglink'
              to={`/author/${realId}`}
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
    const { title, book_image, authors, book_id } = book || {};
    const authorName =
      typeof authors === 'string' ? authors : authors?.join(', ');

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching book status</div>;

    return (
      <div className='card'>
        <div className='card-content'>
          <div className='imageWrapper square'>
            {book_image ? (
              <img src={book_image} loading='lazy' alt={title} />
            ) : (
              <img
                src={`https://lgimages.s3.amazonaws.com/nc-md.gif`}
                loading='lazy'
                alt={title}
              />
            )}

            <div className='bg square'>
              {!isRead && (
                <IconButton
                  title={isReadLater ? 'Mark as Read' : 'Add to Read Later'}
                  aria-label={
                    isReadLater ? 'Mark as Read' : 'Add to Read Later'
                  }
                  onClick={
                    isReadLater ? handleMarkAsRead : handleAddToReadLater
                  }
                  className='top-right'
                >
                  {isReadLater ? (
                    <CheckCircleIcon color='white' />
                  ) : (
                    <BookmarkAddOutlinedIcon />
                  )}
                </IconButton>
              )}
              {isRead && (
                <IconButton
                  title='Read'
                  aria-label='Read'
                  disabled
                  className='top-right'
                >
                  <CheckCircleIcon color='blue' />
                </IconButton>
              )}
            </div>
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
        {notification.title && (
          <Notification
            notification={notification}
            closeNotification={closeNotification}
          />
        )}
      </div>
    );
  }
};

Shape.propTypes = {
  shape: Proptypes.string.isRequired,
  isAuthorName: Proptypes.bool,
  book: Proptypes.object,
  author: Proptypes.object,
};

// ... (PropTypes remain unchanged)

export default Shape;
